# Personal Portfolio Website

Hugo-based personal portfolio site with Nord color scheme and terminal aesthetic.

## Quick Start

```bash
# Development with live reload
make dev

# Build static site
make build

# Production container
make docker-build
make docker-run
```

## Structure

```
content/
├── _index.md          # Home page
├── about.md           # About page
├── projects/          # Projects page (featured + GitHub activity)
├── homelab/           # Homelab showcase
└── blog/              # Blog (draft)

data/
└── featured_projects.yaml   # Curated projects list
```

## Configuration

Edit `hugo.toml` to update:
- `baseURL` - Your domain
- `title` - Site title
- `params.email` - Your email
- `params.github` - GitHub username
- `params.linkedin` - LinkedIn username

## Deployment

### Self-hosted (Docker + Caddy)

1. Update `Caddyfile` with your domain
2. Run `make docker-build && make docker-run`
3. Caddy handles HTTPS automatically via Let's Encrypt

### GitHub Pages

1. Push to GitHub
2. Enable Pages in repo settings (Source: GitHub Actions)
3. Workflow at `.github/workflows/hugo.yaml` handles deployment

## Customization

- Colors: `assets/css/custom.css` (Nord theme)
- Featured projects: `data/featured_projects.yaml`
- GitHub activity: `static/js/github-activity.js` (edit `GITHUB_USERNAME`)
