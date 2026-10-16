import Link from "next/link";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-fg">Page not found</h1>
      <p className="mt-4 max-w-md text-fg-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
