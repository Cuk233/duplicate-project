'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import DayByDayItinerary from './DayByDayItinerary';
import AboutThisTrip from './SightseeingHighlights';
import FAQ from './FAQ';
import { type SanityDocument } from "next-sanity";

interface TourPageClientProps {
  tour: SanityDocument;
  imageUrl: string | null;
}

export default function TourPageClient({ tour, imageUrl }: TourPageClientProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[400px] relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={tour.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tour.title}</h1>
              <p className="text-xl text-white mb-6">{tour.summary}</p>
              <div className="flex items-center gap-4 text-white">
                <span className="text-sm">Trip code: {tour.tripCode}</span>
                {tour.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(tour.rating.score) ? 'text-yellow-400' : 'text-gray-400'}`}>★</span>
                      ))}
                    </div>
                    <span>{tour.rating.score.toFixed(1)}/5</span>
                    <span>({tour.rating.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <nav className="flex gap-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-4 px-2 font-medium relative ${
                selectedTab === 'overview'
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
              {selectedTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
            <button
              onClick={() => setSelectedTab('dates-prices')}
              className={`py-4 px-2 font-medium relative ${
                selectedTab === 'dates-prices'
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dates & Prices
              {selectedTab === 'dates-prices' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
            <button
              onClick={() => setSelectedTab('map')}
              className={`py-4 px-2 font-medium relative ${
                selectedTab === 'map'
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Map
              {selectedTab === 'map' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
            <button
              onClick={() => setSelectedTab('reviews')}
              className={`py-4 px-2 font-medium relative ${
                selectedTab === 'reviews'
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reviews
              {selectedTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {selectedTab === 'overview' && (
              <>
                {/* Trip Map */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Trip Map & Itinerary</h2>
                  <div className="bg-gray-100 rounded-lg p-4 h-[400px] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={`/images/italy-map.png`}
                        alt="Italy Map"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </section>

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

                {/* FAQs */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <FAQ questions={tour.faqs} />
                </section>

                {/* Trip Details */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Trip Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">What's Included</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Professional Travel Director</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Handcrafted Highlights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>VIP Entry to Major Sights</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Travel Highlights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Luxury air-conditioned coach</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Cherry-picked hotels</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Optional Experiences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="text-3xl font-bold">
                        {tour.price.currency} {tour.price.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{tour.price.priceType}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 font-bold">{tour.rating.score.toFixed(1)}</span>
                        <span className="text-gray-600">/5</span>
                      </div>
                      <p className="text-sm text-gray-600">{tour.rating.reviewCount} reviews</p>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200">
                    Book Now
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Trip Details</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{tour.duration} Days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Cities:</span>
                      <span className="font-medium">{tour.locations?.length} Cities</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Starts In:</span>
                      <span className="font-medium">{tour.startEndCities.startCity}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ends In:</span>
                      <span className="font-medium">{tour.startEndCities.endCity}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Style:</span>
                      <span className="font-medium">{tour.tripStyle}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t mt-6 pt-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition duration-200">
                      Request a Quote
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition duration-200">
                      Ask a Question
                    </button>
                  </div>
                </div>
              </div>
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
              <div className="mb-4 relative h-48 w-full">
                <div className="absolute inset-0 bg-emerald-800 rounded-lg">
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Sustainable Travel</h3>
              <p className="text-sm">Supporting initiatives that protect our planet and communities.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 relative h-48 w-full">
                <div className="absolute inset-0 bg-emerald-800 rounded-lg">
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Local Experiences</h3>
              <p className="text-sm">Connecting you with local communities and cultures.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 relative h-48 w-full">
                <div className="absolute inset-0 bg-emerald-800 rounded-lg">
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
} 