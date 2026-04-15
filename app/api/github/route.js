export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "Username required" }, { status: 400 });
  }

  if (!process.env.GITHUB_TOKEN) {
    return Response.json({ error: "No token configured" }, { status: 500 });
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  try {
    /* ── User profile ── */
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const userData = await userRes.json();

    /* ── All repos including private — use /user/repos instead of /users/:username/repos ── */
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const reposRes = await fetch(
        `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated&affiliation=owner,collaborator,organization_member`,
        { headers, next: { revalidate: 3600 } },
      );
      const batch = await reposRes.json();

      if (!Array.isArray(batch) || batch.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...batch];
        hasMore = batch.length === 100;
        page++;
      }
    }

    /* ── Language aggregation across ALL repos ── */
    const langMap = {};
    await Promise.all(
      allRepos
        .filter((r) => !r.fork && r.language)
        .slice(0, 50) // cap at 50 to avoid rate limit
        .map((r) =>
          fetch(r.languages_url, { headers, next: { revalidate: 3600 } })
            .then((res) => res.json())
            .then((langs) => {
              if (typeof langs !== "object" || langs.message) return;
              Object.entries(langs).forEach(([l, b]) => {
                langMap[l] = (langMap[l] ?? 0) + b;
              });
            })
            .catch(() => {}),
        ),
    );

    /* ── Stars + forks across all owned repos ── */
    const ownedRepos = allRepos.filter((r) => r.owner?.login === username);
    const totalStars = ownedRepos.reduce(
      (a, r) => a + (r.stargazers_count ?? 0),
      0,
    );
    const totalForks = ownedRepos.reduce((a, r) => a + (r.forks_count ?? 0), 0);

    /* ── Contribution graph via GraphQL ── */
    let contributions = null;

    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      weekday
                    }
                  }
                }
              }
              repositoriesContributedTo(
                first: 100
                contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
                includeUserRepositories: true
              ) {
                totalCount
              }
            }
          }
        `,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    const gqlData = await gqlRes.json();
    contributions =
      gqlData?.data?.user?.contributionsCollection?.contributionCalendar ??
      null;

    const reposContributedTo =
      gqlData?.data?.user?.repositoriesContributedTo?.totalCount ?? null;

    return Response.json({
      user: {
        public_repos: userData.public_repos ?? 0,
        total_repos: allRepos.filter((r) => r.owner?.login === username).length,
        followers: userData.followers ?? 0,
        following: userData.following ?? 0,
        name: userData.name ?? username,
        bio: userData.bio ?? "",
        avatar_url: userData.avatar_url ?? "",
      },
      stars: totalStars,
      forks: totalForks,
      reposContributedTo,
      languages: langMap,
      contributions,
      totalPrivateRepos: allRepos.filter((r) => r.private).length,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
