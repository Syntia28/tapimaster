const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tapimaster.pe";

const routes = [
  "",
  "/#materiales",
  "/#simulador",
  "/#servicios",
  "/#galeria",
  "/#contacto",
];

export function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      const url = `${baseUrl}${route}`;
      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === "" ? "1.0" : "0.8"}</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
