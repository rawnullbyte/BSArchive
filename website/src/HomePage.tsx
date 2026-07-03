import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage({ onBrowseScripts }: { onBrowseScripts: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px] animate-fog-1" />
        <div className="absolute top-1/3 right-1/4 h-[24rem] w-[24rem] translate-x-1/3 rounded-full bg-muted/50 blur-[100px] animate-fog-2" />
        <div className="absolute bottom-1/4 left-1/3 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-secondary/40 blur-[110px] animate-fog-3" />
        <div className="absolute top-1/2 right-1/3 h-[20rem] w-[20rem] translate-x-1/4 rounded-full bg-primary/10 blur-[90px] animate-fog-4" />
        <div className="absolute bottom-1/3 right-1/4 h-[18rem] w-[18rem] rounded-full bg-accent/30 blur-[80px] animate-fog-5" />
      </div>

      <div className="relative text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          BSArchive
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Browse scripts across versions, authors, and tags. Open any entry to inspect its file tree and source instantly.
        </p>
        <div className="mt-8">
          <Button size="lg" onClick={onBrowseScripts} className="h-11 px-6">
            Browse Scripts
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
