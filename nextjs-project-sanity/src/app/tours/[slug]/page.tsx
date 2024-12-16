import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import { client } from "@/sanity/client";
import TourSummary from "@/components/tours/TourSummary";
import DayByDayItinerary from "@/components/tours/DayByDayItinerary";
import SightseeingHighlights from "@/components/tours/SightseeingHighlights";
import TravelHighlights from "@/components/tours/TravelHighlights";
import FAQ from "@/components/tours/FAQ";

interface TourPageProps {
  params: {
    slug: string;
  };
}

const TOUR_QUERY = `*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  duration,
  locations,
  summary,
  mainImage,
  itinerary[]{
    day,
    title,
    description,
    locations
  },
  sightseeingHighlights,
  travelHighlights,
  faqs
}`;

export default async function TourPage({ params }: TourPageProps) {
  const tour = await client.fetch<SanityDocument>(TOUR_QUERY, { slug: params.slug });

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src={tour.mainImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex items-end pb-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
              <div className="flex items-center gap-4">
                <span>{tour.duration} Days</span>
                <span>•</span>
                <span>{tour.locations?.length} Locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Map Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Trip Map & Itinerary</h2>
              <div className="bg-gray-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
                {/* Map will be implemented later */}
                <p className="text-gray-500">Map of Italy showing tour route</p>
              </div>
            </section>

            {/* Day by Day Itinerary */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Day by Day Itinerary</h2>
              <DayByDayItinerary itinerary={tour.itinerary} />
            </section>

            {/* Sightseeing Highlights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Sightseeing Highlights</h2>
              <SightseeingHighlights highlights={tour.sightseeingHighlights} />
            </section>

            {/* Travel Highlights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Travel Highlights</h2>
              <TravelHighlights highlights={tour.travelHighlights} />
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQ questions={tour.faqs} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Tour Summary</h3>
                <p className="text-gray-600">{tour.summary}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Trip Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{tour.duration} Days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-600">Locations:</span>
                    <span className="font-semibold">{tour.locations?.length} Cities</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Book This Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 