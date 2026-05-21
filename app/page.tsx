import Link from 'next/link'
import { getAllPosts, getAllAuthors, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [posts, authors, categories] = await Promise.all([
    getAllPosts(),
    getAllAuthors(),
    getAllCategories(),
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
              ✨ Welcome to My Blog
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Stories, ideas & <span className="text-accent">creativity</span>.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore {posts.length} thought-provoking articles from {authors.length} talented authors across {categories.length} categories.
            </p>
            <div className="flex gap-4">
              <Link href="/posts" className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Read latest posts
              </Link>
              <Link href="/categories" className="border border-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                Browse categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Story</h2>
          </div>
          <Link href={`/posts/${featuredPost.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {featuredPost.metadata?.featured_image && (
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div>
                {featuredPost.metadata?.categories && featuredPost.metadata.categories.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {featuredPost.metadata.categories.slice(0, 2).map((cat) => (
                      <span key={cat.id} className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {cat.metadata?.name || cat.title}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h3>
                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.avatar && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
            <Link href="/posts" className="text-sm font-medium text-accent hover:underline">View all →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <Link href="/categories" className="text-sm font-medium text-accent hover:underline">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}