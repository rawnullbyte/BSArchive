const routes: Record<string, string> = {
  "": "home",
  "scripts": "scripts",
}

export function getRoute(): string {
  const hash = window.location.hash.replace(/^#\/?/, "").split("?")[0]
  return routes[hash] ?? "404"
}

export function navigate(page: string) {
  const hash = page === "home" ? "" : page
  window.location.hash = hash ? `/${hash}` : ""
}
