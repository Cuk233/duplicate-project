import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from 'next/link';
import { client } from "@/sanity/client";
import { urlForImage } from "@/lib/sanity.image";
import TourList from "@/components/home/TourList";

interface Benefit {
  title: string;
  description: string;
  icon: 'expert' | 'safety' | 'value' | 'local' | 'support' | 'booking';
}

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]`;
const TOURS_QUERY = `*[_type == "tour"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  tripCode,
  mainImage {
    asset->,
    alt
  },
  duration,
  locations,
  summary,
  price,
  rating,
  featured
}`;

export default async function HomePage() {
  const [homepage, tours] = await Promise.all([
    client.fetch<SanityDocument>(HOMEPAGE_QUERY),
    client.fetch<SanityDocument[]>(TOURS_QUERY),
  ]);
  
  const featuredTours = tours.filter((tour) => tour.featured);
  const heroImageUrl = homepage?.heroImage ? urlForImage(homepage.heroImage) : '/hero-image.jpg';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
                    <Image
            src={heroImageUrl}
            alt={homepage?.heroImage?.alt || "Beautiful travel destination"}
                      fill
            className="object-cover brightness-50"
            priority
                    />
                  </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {homepage?.heroTitle || "Discover Your Next Adventure"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {homepage?.heroSubtitle || "Explore handcrafted tours to the world's most extraordinary places"}
          </p>
          <Link
            href={homepage?.heroButton?.link || "#featured-tours"}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            {homepage?.heroButton?.text || "Explore Tours"}
          </Link>
                  </div>
      </section>

      {/* Featured Tours Section */}
      <TourList
        title={homepage?.featuredTitle || "Featured Tours"}
        subtitle={homepage?.featuredSubtitle || "Hand-picked tours featuring our most popular and extraordinary destinations"}
        tours={featuredTours}
        cardWidth={400}
      />

      {/* All Tours Section */}
      <TourList
        title="All Tours"
        subtitle="Browse our complete collection of extraordinary travel experiences"
        tours={tours}
        cardWidth={350}
      />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            {homepage?.whyChooseUsTitle || "Why Choose Us"}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {homepage?.whyChooseUsSubtitle || "Experience the difference of traveling with experts"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(homepage?.benefits || [
              {
                title: "Expert Guides",
                description: "Our experienced guides ensure you get the most out of your journey",
                icon: "expert"
              },
              {
                title: "Safe Travel",
                description: "Your safety and comfort are our top priorities",
                icon: "safety"
              },
              {
                title: "Best Value",
                description: "Competitive prices without compromising on quality",
                icon: "value"
              }
            ] as Benefit[]).map((benefit: Benefit, index: number) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {benefit.icon === 'expert' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    )}
                    {benefit.icon === 'safety' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                    {benefit.icon === 'value' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {benefit.icon === 'local' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    )}
                    {benefit.icon === 'support' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {benefit.icon === 'booking' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </main>
  );
}