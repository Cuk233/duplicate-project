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

interface FAQ {
  question: string;
  answer: string;
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
  includedItems[],
  excludedItems[],
  departureDates[] {
    date,
    price,
    availability,
    discounts[] {
      type,
      amount,
      description
    }
  },
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
  console.log(tour);

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
                  <div className="space-y-2">
                    <p className="text-gray-600">{tour.tripStyle?.name}</p>
                    {tour.tripStyle?.features?.map((feature: string, index: number) => (
                      <p key={index} className="text-gray-600">{feature}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Day by Day Itinerary */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Day by Day Itinerary</h2>
              <DayByDayItinerary itinerary={tour.itinerary} />
            </section>

            {/* About this Trip */}
            <section className="mb-12">
              <AboutThisTrip 
                sightseeingHighlights={tour.sightseeingHighlights}
                travelHighlights={tour.travelHighlights}
              />
            </section>

            {/* Included Items Section */}
            <section className="mb-12">
              <IncludedItems 
                includedItems={tour.includedItems}
                excludedItems={tour.excludedItems}
              />
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <FAQ questions={tour.faqs as FAQ[]} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Price Overview */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <span className="text-sm text-gray-600">From</span>
                  <div className="text-3xl font-bold text-gray-900">
                    {tour.price?.currency} {tour.price?.amount?.toLocaleString()}
                  </div>
                  <span className="text-sm text-gray-600">per person</span>
                </div>
                <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Check Available Dates
                </button>
              </div>

              {/* Departure Dates */}
              <DepartureDates 
                departureDates={tour.departureDates} 
                currency={tour.price?.currency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 