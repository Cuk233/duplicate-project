import { type SanityDocument } from "next-sanity";
import Image from "next/image";

interface TourSummaryProps {
  tour: SanityDocument;
}

export default function TourSummary({ tour }: TourSummaryProps) {
  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-[400px] w-full">
        <Image
          src={tour.mainImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{tour.duration} Days</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{tour.locations?.join(", ")}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600">{tour.summary}</p>
        </div>
      </div>
    </section>
  );
} 