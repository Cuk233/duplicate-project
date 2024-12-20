import React from 'react';

interface AboutThisTripProps {
  sightseeingHighlights: Array<{
    title: string;
    description: string;
    locations: string[];
  }>;
  travelHighlights: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export default function AboutThisTrip({ sightseeingHighlights, travelHighlights }: AboutThisTripProps) {
  return (
    <div className="about-trip">
      <h2 className="text-2xl mb-6">About this trip</h2>
      <div className="space-y-8">
        {/* Sightseeing Highlights */}
        <div>
          <h3 className="text-lg text-[#2B5741] mb-4">Sightseeing highlights</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column - Icons */}
            <div className="space-y-4">
              {sightseeingHighlights?.map((_, index) => (
                <div key={`icon-${index}`} className="flex justify-end">
                  <svg 
                    className="w-6 h-6 text-[#2B5741]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              ))}
            </div>
            {/* Right Column - Content */}
            <div className="space-y-4">
              {sightseeingHighlights?.map((highlight, index) => (
                <div key={`content-${index}`}>
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlight.title }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Highlights */}
        <div>
          <h3 className="text-lg text-[#9B1B30] mb-4">Travel highlights</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Specific transfer information can be found here</p>
            <br />
            <button className="px-4 py-2 bg-[#9B1B30] text-white rounded-md text-sm hover:bg-opacity-90 transition-colors">
              Airport transfers
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column - Icons */}
            <div className="space-y-4">
              {travelHighlights?.map((_, index) => (
                <div key={`icon-${index}`} className="flex justify-end">
                  <svg 
                    className="w-5 h-5 text-[#9B1B30]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
            {/* Right Column - Content */}
            <div className="space-y-4">
              {travelHighlights?.map((highlight, index) => (
                <div key={`content-${index}`}>
                  <p className="text-gray-700">{highlight.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 