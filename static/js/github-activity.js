// ABOUTME: Fetches recent GitHub activity for display on projects page
// ABOUTME: Uses unauthenticated GitHub API (60 requests/hour limit)

(function () {
  const GITHUB_USERNAME = "malston";
  const ACTIVITY_CONTAINER_ID = "github-activity";
  const MAX_REPOS = 6;

  async function fetchRecentRepos() {
    const container = document.getElementById(ACTIVITY_CONTAINER_ID);
    if (!container) return;

    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${MAX_REPOS}&type=owner`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();
      renderRepos(container, repos);
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
      container.innerHTML = `
        <p class="error">Unable to load GitHub activity.
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">
          View on GitHub
        </a></p>
      `;
    }
  }

  function renderRepos(container, repos) {
    if (repos.length === 0) {
      container.innerHTML = "<p>No recent public repositories.</p>";
      return;
    }

    const html = repos
      .map(
        (repo) => `
      <article class="repo-card">
        <h4>
          <a href="${repo.html_url}" target="_blank" rel="noopener">
            ${repo.name}
          </a>
        </h4>
        ${repo.description ? `<p>${escapeHtml(repo.description)}</p>` : ""}
        <div class="repo-meta">
          ${repo.language ? `<span class="language">${repo.language}</span>` : ""}
          <span class="stars">${repo.stargazers_count}</span>
          <span class="updated">Updated ${formatDate(repo.pushed_at)}</span>
        </div>
      </article>
    `
      )
      .join("");

    container.innerHTML = `
      <div class="repos-grid">${html}</div>
      <p class="view-all">
        <a href="https://github.com/${GITHUB_USERNAME}?tab=repositories" target="_blank">
          View all repositories
        </a>
      </p>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchRecentRepos);
  } else {
    fetchRecentRepos();
  }
})();
