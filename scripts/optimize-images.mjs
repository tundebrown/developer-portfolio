// Re-encodes every image under public/projects to WebP in public/projects-optimized,
// keeping the originals untouched, and writes tiny blur placeholders for next/image.
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "projects");
const OUT = path.join(ROOT, "public", "projects-optimized");
const BLUR_FILE = path.join(ROOT, "utils", "data", "image-blur.json");
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : EXT.has(path.extname(e.name).toLowerCase()) ? [full] : [];
    }),
  );
  return files.flat();
}

const files = await walk(SRC);
const blur = {};
let before = 0;
let after = 0;

for (const file of files) {
  const rel = path.relative(SRC, file).replace(/\.[^.]+$/, ".webp");
  const target = path.join(OUT, rel);
  await mkdir(path.dirname(target), { recursive: true });

  await sharp(file)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(target);

  const tiny = await sharp(file).resize(16).webp({ quality: 40 }).toBuffer();
  const publicPath = "/" + path.relative(path.join(ROOT, "public"), target).split(path.sep).join("/");
  blur[publicPath] = `data:image/webp;base64,${tiny.toString("base64")}`;

  before += (await stat(file)).size;
  after += (await stat(target)).size;
}

await writeFile(BLUR_FILE, JSON.stringify(blur, null, 2) + "\n");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`Optimised ${files.length} images: ${kb(before)} -> ${kb(after)}`);
