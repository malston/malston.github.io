# Updating Featured Projects

Featured projects are displayed on the Projects page above the dynamic GitHub activity feed.

## File Location

```
data/featured_projects.yaml
```

## Format

```yaml
projects:
  - name: "project-name"
    description: "Brief description of what this project does"
    url: "https://github.com/malston/project-name"
    tech:
      - Go
      - Kubernetes

  - name: "another-project"
    description: "Another project description"
    url: "https://github.com/malston/another-project"
    tech:
      - Python
      - Terraform
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Project name (displayed as heading) |
| `description` | Yes | Brief description (1-2 sentences) |
| `url` | Yes | Link to project (usually GitHub) |
| `tech` | No | List of technologies/languages |

## Adding a Project

1. Open `data/featured_projects.yaml`
2. Add a new entry under `projects:`
3. Save the file
4. If dev server is running, changes appear immediately

## Example

```yaml
projects:
  - name: "bosh-operator"
    description: "Kubernetes operator for managing BOSH deployments"
    url: "https://github.com/malston/bosh-operator"
    tech:
      - Go
      - Kubernetes
      - BOSH

  - name: "cf-mgmt"
    description: "Cloud Foundry management tool for org and space configuration"
    url: "https://github.com/malston/cf-mgmt"
    tech:
      - Go
      - Cloud Foundry
```

## Tips

- Keep descriptions concise (fits on 2 lines in the card)
- Order projects by importance (first = top-left)
- 3-6 featured projects is ideal
- Tech tags should be short (single words)
