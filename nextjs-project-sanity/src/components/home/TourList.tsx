'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from "@/lib/sanity.image";

interface TourListProps {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tours: any[];
  cardWidth: number;
}

export default function TourList({ title, subtitle, tours, cardWidth }: TourListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{subtitle}</p>
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div ref={scrollRef} className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex gap-8" style={{ minWidth: 'min-content' }}>
              {tours.map((tour) => {
                const imageUrl = urlForImage(tour.mainImage);
                return (
                  <Link
                    key={tour._id}
                    href={`/tours/${tour.slug.current}`}
                    className="group flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
                      {imageUrl ? (
                        <div className="relative h-64 w-full">
                          <Image
                            src={imageUrl}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                                {tour.tripCode}
                              </span>
                              <span className="text-white">
                                {tour.duration} Days
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-64 w-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{tour.summary}</p>
                        <div className="flex items-center justify-between">
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
                            <span className="text-2xl font-bold text-red-600">
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
          </div>
        </div>
      </div>
    </section>
  );
} 