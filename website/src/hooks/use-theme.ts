import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem("bsa-theme")
    if (v === "light" || v === "dark") return v
  } catch {}
  return null
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const t = getStoredTheme() ?? getSystemTheme()
    applyTheme(t)
    return t
  })

  useEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem("bsa-theme", theme) } catch {}
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (!getStoredTheme()) {
        setTheme(mq.matches ? "dark" : "light")
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return { theme, toggle }
}
