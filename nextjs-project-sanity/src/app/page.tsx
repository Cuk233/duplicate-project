import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const TOURS_QUERY = `*[_type == "tour"] {
  _id,
  title,
  slug,
  mainImage,
  duration,
  locations,
  summary
} | order(_createdAt desc)`;

export default async function HomePage() {
  const tours = await client.fetch<SanityDocument[]>(TOURS_QUERY);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Featured Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <Link 
            key={tour._id} 
            href={`/tours/${tour.slug.current}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {tour.mainImage && (
                <div className="relative h-48 w-full">
                  <img
                    src={tour.mainImage}
                    alt={tour.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
                <div className="flex items-center gap-4 text-gray-600 mb-2">
                  <span>{tour.duration} Days</span>
                  <span>•</span>
                  <span>{tour.locations?.length} Locations</span>
                </div>
                <p className="text-gray-600 line-clamp-2">{tour.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}