# nickitache.com

Personal homepage for [nickitache.com](https://nickitache.com).

Minimal Vite + TypeScript site with RU/ENG content switching.

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

## Deployment

The repository is connected to Cloudflare Workers & Pages and deploys from `main`.

- Build command: `npm run build`
- Build output directory: `dist`

## Structure

- `index.html` — page structure and links
- `src/main.ts` — language switching
- `src/style.css` — visual styling
- `public/` — favicon, robots, sitemap and headers
