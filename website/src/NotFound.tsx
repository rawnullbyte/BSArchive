import { Button } from "@/components/ui/button"
import { navigate } from "./router"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-semibold tracking-tight">404</p>
      <p className="mt-3 text-muted-foreground">Page not found.</p>
      <Button variant="outline" className="mt-6" onClick={() => navigate("home")}>
        Go Home
      </Button>
    </div>
  )
}
