import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          📝 My Blog
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/posts" className="hover:text-accent transition-colors">Posts</Link>
          <Link href="/authors" className="hover:text-accent transition-colors">Authors</Link>
          <Link href="/categories" className="hover:text-accent transition-colors">Categories</Link>
        </nav>
      </div>
    </header>
  )
}