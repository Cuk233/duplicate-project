import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlForImage } from "@/lib/sanity.image";
import TourSummary from "@/components/tours/TourSummary";
import DayByDayItinerary from "@/components/tours/DayByDayItinerary";
import SightseeingHighlights from "@/components/tours/SightseeingHighlights";
import TravelHighlights from "@/components/tours/TravelHighlights";
import FAQ from "@/components/tours/FAQ";
import TravelStyle from "@/components/tours/TravelStyle";
import DepartureDates from "@/components/tours/DepartureDates";
import IncludedItems from "@/components/tours/IncludedItems";

interface TourPageProps {
  params: {
    slug: string;
  };
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
  tripStyle,
  mainImage,
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
    meals {
      breakfast,
      lunch,
      dinner
    },
    activities[] {
      type,
      description
    },
    optionalExperiences[] {
      title,
      description,
      price
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
    description
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

export async function generateStaticParams() {
  const tours = await client.fetch<SanityDocument[]>(
    `*[_type == "tour"]{ "slug": slug.current }`
  );

  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({ params }: TourPageProps) {
  // Wait for params to be resolved
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  const tour = await client.fetch<SanityDocument>(TOUR_QUERY, { slug });

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tour not found</h1>
        <p className="mt-2 text-gray-600">The tour you're looking for doesn't exist or has been removed.</p>
        <a href="/" className="mt-4 inline-block text-red-600 hover:text-red-700">
          ← Back to all tours
        </a>
      </div>
    );
  }

  const imageUrl = tour.mainImage ? urlForImage(tour.mainImage)?.url() : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Hero Image */}
            <div className="relative h-[50vh] lg:h-[85vh] xl:h-[90vh]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
              ) : (
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
                  <p className="text-gray-600">{tour.tripStyle}</p>
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
            <TravelStyle travelStyle={tour.travelStyle} />

            {/* Map & Itinerary */}
            <section id="itinerary" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Trip Map & Itinerary</h2>
              <div className="bg-gray-100 rounded-lg p-4 h-[400px] flex items-center justify-center mb-8">
                <p className="text-gray-500">Map of {tour.startEndCities.startCity} to {tour.startEndCities.endCity}</p>
              </div>
              <DayByDayItinerary itinerary={tour.itinerary} />
            </section>

            {/* What's Included */}
            <IncludedItems included={tour.included} notIncluded={tour.notIncluded} />

            {/* Sightseeing Highlights */}
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Sightseeing Highlights</h2>
              <SightseeingHighlights highlights={tour.sightseeingHighlights} />
            </section>

            {/* Travel Highlights */}
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Travel Highlights</h2>
              <TravelHighlights highlights={tour.travelHighlights} />
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQ questions={tour.faqs} />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-8">
              <DepartureDates 
                departureDates={tour.departureDates} 
                currency={tour.price.currency} 
              />

              {/* Quick Links */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  <a href="#itinerary" className="block text-red-600 hover:text-red-700">View Itinerary</a>
                  <a href="#included" className="block text-red-600 hover:text-red-700">What's Included</a>
                  <a href="#highlights" className="block text-red-600 hover:text-red-700">Trip Highlights</a>
                  <a href="#faq" className="block text-red-600 hover:text-red-700">FAQs</a>
                </nav>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our travel experts are here to assist you with planning your trip.
                </p>
                <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 