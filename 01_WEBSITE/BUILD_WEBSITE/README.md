# BuildWebsite – source snapshot

This directory contains a partial source snapshot copied from:

- Original source: https://github.com/hangji1997-cpu/ReportWebsiteAnalytics-Team2/tree/main/BuildWebsite
- Original branch: `main`

## Included

- Vite/React project configuration and HTML entry point.
- Main React app entry point and global stylesheet.
- Shop context, product data and shared TypeScript types.
- Main pages: Home, Products, Collections, Culture and About.
- Shopping flow components: cart, search, account, product detail, checkout and order success modals.
- Shared UI components and brand configuration.

## Important

This is not yet a complete, verified runnable copy. The source repository may contain additional components, public assets, and configuration files that have not been transferred. Do not assume `npm install` / `npm run build` will succeed until the remaining source tree is checked and the build is tested.

No `.env` file or credentials are included. The original source repository remains unchanged.

## Known missing assets

The copied product data and page components reference local image files under `/images/` (12 product images plus the hero and intro images). Those binary files have not been transferred in this snapshot. Until the matching images from the original `BuildWebsite/public/images/` directory are added, some image areas will not render correctly. Keep the filenames and paths unchanged when adding them.
