import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AuthorCard({ author }: { author: Author }) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <Link href={`/authors/${author.slug}`} className="group block">
      <div className="text-center p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-gray-100 group-hover:ring-accent/20 transition-all"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-dark mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            {name.charAt(0)}
          </div>
        )}
        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{name}</h3>
        {bio && (
          <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
        )}
      </div>
    </Link>
  )
}