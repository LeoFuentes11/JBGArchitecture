import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg pt-20">
      <div className="container-content text-center max-w-xl">
        <FadeUp>
          <span className="font-display text-8xl font-light text-border block mb-6">404</span>
          <h1 className="font-display text-display-md text-primary mb-4">Page Not Found</h1>
          <p className="font-body text-base text-text-muted mb-10">
            The page you&apos;re looking for doesn&apos;t exist, or may have moved. Please use the navigation above, or start from our homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
