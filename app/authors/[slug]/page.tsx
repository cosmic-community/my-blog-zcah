// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-gray-100"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent-dark mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
            {name.charAt(0)}
          </div>
        )}
        <h1 className="text-5xl font-extrabold mb-4">{name}</h1>
        {bio && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{bio}</p>
        )}
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-8">Posts by {name} ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}