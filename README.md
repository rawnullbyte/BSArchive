# BSArchive

Brawl Stars Frida Scripts Archive — browse scripts across versions, authors, and tags.

## Usage

```bash
npm install
npm run build   # generates dist/
npm run serve   # serves on port 3000
npm run dev     # build + serve
```

## Structure

- `scripts/` — version folders containing individual script folders
- `generate.js` — builds `dist/index.json` from scripts
- `website/` — React + Tailwind CSS + shadcn/ui static site
- `dist/` — production output

## Adding Scripts

Each script lives in `scripts/<version>/<script-folder>/` and needs:

- `settings.json` — name, description, authors, tags
- Source files — any `.js` files to include

Then run `npm run build` to regenerate the index.
