import { CardGenerator } from '@/components/card-generator'
import { SiteBackground } from '@/components/site-background'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <SiteBackground />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-5 py-14 sm:px-8 sm:py-20">
        <CardGenerator />
      </div>
    </main>
  )
}
