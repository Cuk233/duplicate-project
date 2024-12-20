import { type SanityDocument } from "next-sanity";
import { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import { client } from "@/sanity/client";
import { urlForImage } from "@/lib/sanity.image";
import DayByDayItinerary from "@/components/tours/DayByDayItinerary";
import FAQ from "@/components/tours/FAQ";
import DepartureDates from "@/components/tours/DepartureDates";
import IncludedItems from "@/components/tours/IncludedItems";
import AboutThisTrip from "@/components/tours/AboutThisTrip";

type PageParams = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: PageParams
): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = await client.fetch<SanityDocument>(
    `*[_type == "tour" && slug.current == $slug][0]{ title, summary }`,
    { slug: resolvedParams.slug }
  );

  return {
    title: tour?.title || 'Tour Details',
    description: tour?.summary || 'View tour details and itinerary',
  }
}

const TOUR_QUERY = `*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  tripCode,
  price {
    amount,
    currency,
    priceType
  },
  rating {
    score,
    reviewCount
  },
  tripStyle {
    name,
    description,
    features
  },
  mainImage {
    asset->,
    alt
  },
  duration,
  startEndCities {
    startCity,
    endCity
  },
  locations,
  summary,
  itinerary[] {
    day,
    title,
    description,
    locations,
    thumbnailImage {
      asset->,
      alt
    },
    expandedImage {
      asset->,
      alt
    },
    arrivalTransfer {
      time,
      location
    },
    welcome {
      time,
      description
    },
    accommodation {
      name,
      location
    },
    meals {
      breakfast,
      lunch,
      dinner
    },
    tags,
    specialFeature,
    activities[] {
      type,
      description,
      isIncluded,
      image {
        asset->,
        alt
      }
    },
    optionalExperiences[] {
      title,
      description,
      type,
      price,
      image {
        asset->,
        alt
      }
    }
  },
  mapPoints[] {
    city,
    coordinates {
      lat,
      lng
    },
    stayType
  },
  sightseeingHighlights[] {
    title,
    description,
    locations
  },
  travelHighlights[] {
    title,
    description,
    icon
  },
  faqs[] {
    question,
    answer
  }
}`;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const tours = await client.fetch<SanityDocument[]>(
    `*[_type == "tour"]{ "slug": slug.current }`
  );

  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function Page({ params }: PageParams) {
  const resolvedParams = await params;
  const tour = await client.fetch<SanityDocument>(TOUR_QUERY, { slug: resolvedParams.slug });

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tour not found</h1>
        <p className="mt-2 text-gray-600">The tour you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/" className="mt-4 inline-block text-red-600 hover:text-red-700">
          ← Back to all tours
        </Link>
      </div>
    );
  }

  const imageUrl = tour.mainImage ? urlForImage(tour.mainImage) : null;

  const tripStyle = tour.tripStyle ? {
    name: tour.tripStyle.name || '',
    description: tour.tripStyle.description || '',
    features: tour.tripStyle.features || []
  } : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Hero Image */}
            <div className="relative h-[50vh] lg:h-[85vh] xl:h-[90vh]">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={tour.title || 'Tour image'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
              )}
              {!imageUrl && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Tour Info */}
            <div className="p-6 lg:p-12 xl:p-16">
              {/* Trip Year Selector */}
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">Trip Year</span>
                  <div className="flex gap-2">
                    {['2024', '2025', '2026'].map((year) => (
                      <button
                        key={year}
                        className={`px-4 py-2 rounded text-sm ${
                          year === '2024'
                            ? 'bg-blue-800 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">{tour.title}</h1>
                <p className="text-gray-600 text-base lg:text-lg">{tour.summary}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
                {/* Travel & Accommodation */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Travel & Accommodation
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">{tour.duration} days, {tour.locations?.length} cities</p>
                    <p className="text-gray-600">{tour.duration - 1} nights accommodation</p>
                  </div>
                </div>

                {/* Trip Style */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Trip Style
                  </h3>
                  <p className="text-gray-600">{tripStyle?.name || 'Standard Tour'}</p>
                </div>
              </div>

              {/* Price & Booking */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600">From</p>
                    <p className="text-2xl lg:text-3xl font-bold">
                      {tour.price.currency} {tour.price.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{tour.price.priceType}</p>
                    {tour.rating && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(tour.rating.score) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{tour.rating.score.toFixed(1)}/5 ({tour.rating.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Book Now
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  *Prices may vary based on departure date and room type
                </p>
              </div>

              {/* Trip Code */}
              <div className="text-sm text-gray-500">
                Trip code: {tour.tripCode}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Travel Style */}
            {/* {tripStyle && <TravelStyle travelStyle={tripStyle} />} */}

            

            {/* Map & Itinerary */}
            <section id="itinerary" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Day by day itinerary</h2>
              <DayByDayItinerary itinerary={tour.itinerary} />
            </section>

            {/* What's Included */}
            <IncludedItems included={tour.included} notIncluded={tour.notIncluded} />
            {/* About This Trip */}
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <AboutThisTrip 
                sightseeingHighlights={tour.sightseeingHighlights}
                travelHighlights={tour.travelHighlights}
              />
            </section>
            {/* FAQs */}
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQ questions={tour.faqs} />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-2">
            <div className="sticky top-8">
              <DepartureDates 
                departureDates={tour.departureDates} 
                currency={tour.price.currency} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Matter Section */}
      <div className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">WE MAKE TRAVEL MATTER®</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <Image
                  src="/images/sustainable-travel.webp"
                  alt="Sustainable Travel"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </div>
              <h3 className="font-semibold mb-2">Sustainable Travel</h3>
              <p className="text-sm">Supporting initiatives that protect our planet and communities.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Image
                  src="/images/local-experiences.webp"
                  alt="Local Experiences"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </div>
              <h3 className="font-semibold mb-2">Local Experiences</h3>
              <p className="text-sm">Connecting you with local communities and cultures.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Image
                  src="/images/responsible-tourism.webp"
                  alt="Responsible Tourism"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </div>
              <h3 className="font-semibold mb-2">Responsible Tourism</h3>
              <p className="text-sm">Preserving the places we visit for future generations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-bold mb-12">Guest Reviews</h2>
            {tour.rating ? (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(tour.rating.score) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <h3 className="font-semibold">{tour.rating.score.toFixed(1)} / 5</h3>
                    <p className="text-sm text-gray-600">Based on {tour.rating.reviewCount} reviews</p>
                  </div>
                  <button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200">
                    Write a Review
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
                <p className="text-gray-600">No reviews yet</p>
                <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200">
                  Be the First to Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 