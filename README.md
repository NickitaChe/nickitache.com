# nickitache.com

Personal website for [nickitache.com](https://nickitache.com).

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Cloudflare Pages

Use these settings when connecting the repository to Cloudflare Pages:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Recommended Node.js version: **20+**

After the first successful deployment, add `nickitache.com` as a custom domain in the Pages project.

## Structure

- `index.html` — page markup and metadata
- `src/main.ts` — small client-side behavior
- `src/style.css` — all visual styling
- `public/` — favicon, robots, sitemap and Pages headers
