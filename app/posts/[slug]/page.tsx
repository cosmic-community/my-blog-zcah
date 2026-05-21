// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const content = getMetafieldValue(post.metadata?.content)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories
  const tags = getMetafieldValue(post.metadata?.tags)

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-accent/20 transition-colors"
            >
              {getMetafieldValue(cat.metadata?.name) || cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
        {title}
      </h1>

      {/* Author */}
      {author && (
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-200">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <Link href={`/authors/${author.slug}`} className="font-medium hover:text-accent transition-colors">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      )}

      {/* Featured Image */}
      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 mb-10">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-accent"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Tags */}
      {tags && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag, idx) => (
              <span key={idx} className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}