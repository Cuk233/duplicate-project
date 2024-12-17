import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlForImage } from "@/lib/sanity.image";

const TOURS_QUERY = `*[_type == "tour"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  tripCode,
  mainImage,
  duration,
  locations,
  summary,
  price,
  rating
}`;

export default async function HomePage() {
  const tours = await client.fetch<SanityDocument[]>(TOURS_QUERY);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => {
          const imageUrl = tour.mainImage ? urlForImage(tour.mainImage)?.url() : null;
          
          return (
            <Link 
              key={tour._id} 
              href={`/tours/${tour.slug.current}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {imageUrl ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                      {tour.tripCode}
                    </span>
                    <span className="text-sm text-gray-600">
                      {tour.duration} Days
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{tour.locations?.length} Cities</span>
                    </div>
                    {tour.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold">{tour.rating.score}</span>
                        <span className="text-gray-600 text-sm">
                          ({tour.rating.reviewCount})
                        </span>
                      </div>
                    )}
                  </div>
                  {tour.price && (
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-sm text-gray-600">From</span>
                      <span className="text-xl font-bold">
                        {tour.price.currency} {tour.price.amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Debug section to show slugs */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Available URLs (Debug)</h2>
        <div className="space-y-2">
          {tours.map((tour) => (
            <div key={tour._id} className="flex items-center gap-4">
              <span className="font-mono text-sm">
                /tours/{tour.slug.current}
              </span>
              <span className="text-gray-600">→</span>
              <span>{tour.title}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}