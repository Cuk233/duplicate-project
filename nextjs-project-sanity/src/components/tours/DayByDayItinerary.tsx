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
  arrivalTransfer?: {
    time: string;
    location: string;
  };
  welcome?: {
    time: string;
    description: string;
  };
  accommodation?: {
    name: string;
    location?: string;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  activities?: {
    type: string;
    description: string;
    isIncluded: boolean;
    image?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
  }[];
  optionalExperiences?: {
    title: string;
    description: string;
    type: string;
    price: number;
    image?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
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

  const handleExpand = (dayNumber: number) => {
    const isCurrentlyExpanded = expandedDay === dayNumber;
    setExpandedDay(isCurrentlyExpanded ? null : dayNumber);

    if (!isCurrentlyExpanded) {
      // Get the element to scroll to
      const element = document.getElementById(`day-${dayNumber}`);
      if (element) {
        // Add a small delay to ensure the content is expanded before scrolling
        setTimeout(() => {
          const yOffset = -100; // Offset from the top of the viewport (adjust as needed)
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  };

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
    <div className="max-w-7x1 mx-auto">
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
            <div 
              key={index} 
              id={`day-${day.day}`}
              className="border rounded-lg bg-white overflow-hidden scroll-mt-24"
            >
              {/* Day Header - Always visible */}
              <div 
                className="flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleExpand(day.day)}
              >
                {/* Thumbnail Image */}
                <div className="w-52 h-45 relative flex-shrink-0 bg-gray-100">
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

                    {/* See More/Less Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        handleExpand(day.day);
                      }}
                      className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      {isExpanded ? 'See less' : 'See more'}
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
                    {/* Left Column - Content */}
                    <div className="col-span-7">
                      {/* Activities List */}
                      <div className="space-y-4">
                        {/* Arrival Transfer */}
                        {day.arrivalTransfer && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6">
                              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Arrival Transfer</div>
                              <div className="text-sm text-gray-600">{day.arrivalTransfer.location} at {day.arrivalTransfer.time}</div>
                            </div>
                          </div>
                        )}

                        {/* Welcome */}
                        {day.welcome && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6">
                              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Welcome</div>
                              <div className="text-sm text-gray-600">{day.welcome.description} at {day.welcome.time}</div>
                            </div>
                          </div>
                        )}

                        {/* Accommodation */}
                        {day.accommodation && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6">
                              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Accommodation</div>
                              <div className="text-sm text-gray-600">{day.accommodation.name}</div>
                              {day.accommodation.location && (
                                <div className="text-sm text-gray-500">{day.accommodation.location}</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Included Meals */}
                        {(day.meals.breakfast || day.meals.lunch || day.meals.dinner) && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6">
                              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Included Meals</div>
                              <div className="text-sm text-gray-600">
                                {[
                                  day.meals.breakfast && 'Breakfast',
                                  day.meals.lunch && 'Lunch',
                                  day.meals.dinner && 'Dinner'
                                ].filter(Boolean).join(', ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Included and optional experiences */}
                      {((day.activities && day.activities.length > 0) || (day.optionalExperiences && day.optionalExperiences.length > 0)) && (
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">Included and optional experiences</h3>
                          <div className="space-y-6">
                            {/* Included Activities */}
                            {day.activities?.filter(act => act.isIncluded).map((activity, actIndex) => (
                              <div key={actIndex} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex gap-6">
                                  {/* Activity Image */}
                                  <div className="w-48 h-32 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    {activity.image ? (
                                      <Image
                                        src={getImageUrl(activity.image) || ''}
                                        alt={activity.image.alt || activity.type}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 192px"
                                        onError={() => handleImageError(`activity-${actIndex}`)}
                                      />
                                    ) : (
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">No image</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Activity Content */}
                                  <div className="flex-1">
                                    <div className="flex items-start gap-2 mb-2">
                                      <div className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                        Iconic Experience
                                      </div>
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2">{activity.type}</h4>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Optional Experiences */}
                            {day.optionalExperiences?.map((exp, expIndex) => (
                              <div key={expIndex} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex gap-6">
                                  {/* Experience Image */}
                                  <div className="w-48 h-32 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    {exp.image ? (
                                      <Image
                                        src={getImageUrl(exp.image) || ''}
                                        alt={exp.image.alt || exp.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 192px"
                                        onError={() => handleImageError(`optional-${expIndex}`)}
                                      />
                                    ) : (
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">No image</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Experience Content */}
                                  <div className="flex-1">
                                    <div className="flex items-start gap-2 mb-2">
                                      <div className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                                        {exp.type || 'Optional Experience'}
                                      </div>
                                      <div className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                        Additional Cost Applies
                                      </div>
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2">{exp.title}</h4>
                                    <p className="text-sm text-gray-600">{exp.description}</p>
                                    {exp.price && (
                                      <p className="mt-3 text-sm font-medium text-gray-900">
                                        Adult Price: From ${exp.price.toLocaleString()} per person
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Image */}
                    <div className="col-span-5">
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