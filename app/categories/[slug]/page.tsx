// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12">
        <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
          Category
        </span>
        <h1 className="text-5xl font-extrabold mb-4">{name}</h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
        )}
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-8">Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts in this category yet.</p>
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