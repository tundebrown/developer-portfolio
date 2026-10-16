import blur from "./data/image-blur.json";

// Attaches the generated blur placeholders on the server, so the JSON never
// reaches the client bundle.
export const withBlur = (projects) =>
  projects.map((p) => ({
    ...p,
    images: p.images.map((img) => ({ ...img, blurDataURL: blur[img.src] })),
    phone: p.phone && { ...p.phone, blurDataURL: blur[p.phone.src] },
  }));
