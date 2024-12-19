'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { type SanityDocument } from "next-sanity";
import { urlForImage } from "@/lib/sanity.image";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
  thumbnailImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  expandedImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  activities?: {
    type: string;
    description: string;
  }[];
  optionalExperiences?: {
    title: string;
    description: string;
    price: number;
  }[];
  tags?: string[];
  specialFeature?: string;
}

interface DayByDayItineraryProps {
  itinerary: ItineraryDay[];
}

export default function DayByDayItinerary({ itinerary }: DayByDayItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Log the entire itinerary data when component mounts
    console.log('Full itinerary data:', itinerary);
  }, [itinerary]);

  if (!itinerary || itinerary.length === 0) return null;

  const getImageUrl = (image: any) => {
    // Log the raw image data
    console.log('Raw image data:', image);

    if (!image?.asset?._ref && !image?.asset?.url) {
      console.log('No asset reference or URL found');
      return null;
    }

    try {
      const imageUrl = urlForImage(image);
      console.log('Generated image URL:', imageUrl);

      // Verify the URL structure
      if (imageUrl && !imageUrl.includes('cdn.sanity.io')) {
        console.warn('Invalid Sanity URL generated:', imageUrl);
        return null;
      }

      return imageUrl;
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  const handleImageError = (imageId: string) => {
    console.error(`Image load error for ${imageId}`);
    setImageLoadError(prev => ({ ...prev, [imageId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Map Section */}
      <div className="mb-8">
        <div className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-500">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Itinerary List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-6">Day by day itinerary</h2>
        
        {itinerary.map((day, index) => {
          console.log(`Processing day ${day.day}:`, {
            thumbnailImage: day.thumbnailImage,
            expandedImage: day.expandedImage
          });

          const isExpanded = expandedDay === day.day;
          const thumbnailUrl = getImageUrl(day.thumbnailImage);
          const expandedUrl = getImageUrl(day.expandedImage);
          const thumbnailId = `thumbnail-${day.day}`;
          const expandedId = `expanded-${day.day}`;

          console.log(`URLs for day ${day.day}:`, {
            thumbnailUrl,
            expandedUrl
          });
          
          return (
            <div key={index} className="border rounded-lg bg-white overflow-hidden">
              {/* Day Header - Always visible */}
              <div className="flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                {/* Thumbnail Image */}
                <div className="w-48 h-32 relative flex-shrink-0 bg-gray-100">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={day.thumbnailImage?.alt || `Day ${day.day} - ${day.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                      onError={() => {
                        console.error(`Error loading thumbnail for day ${day.day}`);
                        handleImageError(thumbnailId);
                      }}
                      priority={index < 3}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow py-4 pr-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {/* Day Number and Title */}
                      <div className="mb-2">
                        <div className="text-sm text-gray-600 mb-1">Day {day.day}</div>
                        <h3 className="text-lg font-medium text-gray-900">{day.title}</h3>
                      </div>

                      {/* Locations */}
                      <div className="flex items-center text-sm text-gray-600">
                        {day.locations.map((location, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && (
                              <svg className="w-3 h-3 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                            <span>{location}</span>
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Tags */}
                      {day.tags && day.tags.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {day.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Special Feature Badge */}
                    {day.specialFeature && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {day.specialFeature}
                      </span>
                    )}

                    {/* See More Button */}
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      See more
                      <svg 
                        className={`ml-1 h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 py-6 border-t">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Image */}
                    <div className="col-span-4">
                      <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                        {(expandedUrl && !imageLoadError[expandedId]) ? (
                          <Image
                            src={expandedUrl}
                            alt={day.expandedImage?.alt || `Day ${day.day} - ${day.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                            onError={() => handleImageError(expandedId)}
                          />
                        ) : (thumbnailUrl && !imageLoadError[thumbnailId]) ? (
                          <Image
                            src={thumbnailUrl}
                            alt={day.thumbnailImage?.alt || `Day ${day.day} - ${day.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                            onError={() => handleImageError(thumbnailId)}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image available</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="col-span-8">
                      {/* Description */}
                      <div className="prose max-w-none mb-6">
                        <p className="text-gray-600 leading-relaxed">{day.description}</p>
                      </div>

                      {/* Activities */}
                      {day.activities && day.activities.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">TODAY'S HIGHLIGHTS</h4>
                          <ul className="space-y-3">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                  <span className="text-gray-900 font-medium">{activity.type}: </span>
                                  <span className="text-gray-600">{activity.description}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Optional Experiences */}
                      {day.optionalExperiences && day.optionalExperiences.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">OPTIONAL EXPERIENCES</h4>
                          <div className="space-y-4">
                            {day.optionalExperiences.map((exp, expIndex) => (
                              <div key={expIndex} className="bg-gray-50 rounded-lg p-4">
                                <h5 className="font-medium text-gray-900 mb-2">{exp.title}</h5>
                                <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
                                <p className="text-sm font-medium text-gray-900">Adult Price: From ${exp.price.toLocaleString()} per person</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 