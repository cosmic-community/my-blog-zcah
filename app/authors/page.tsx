import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'Authors - My Blog',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Authors</h1>
        <p className="text-lg text-gray-600">Meet our {authors.length} talented writers</p>
      </header>

      {authors.length === 0 ? (
        <p className="text-gray-600">No authors found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}