
interface Highlight {
  title: string;
  description: string;
  locations?: string[];
  icon?: string;
}

interface AboutThisTripProps {
  sightseeingHighlights?: Highlight[];
  travelHighlights?: Highlight[];
}

const TravelIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'guide':
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'hotel':
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'transport':
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h2M10 5v4h4m4 0h-4" />
        </svg>
      );
    case 'meals':
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'experiences':
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
};

export default function AboutThisTrip({ sightseeingHighlights = [], travelHighlights = [] }: AboutThisTripProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">About this trip</h2>
      
      {/* Sightseeing Highlights */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Sightseeing highlights</h3>
        <div className="space-y-4">
          {sightseeingHighlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{highlight.title}</div>
                <p className="text-sm text-gray-600 mt-1">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-red-800 mb-4">Travel highlights</h3>
        <div className="space-y-4">
          {travelHighlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <TravelIcon type={highlight.icon || ''} />
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{highlight.title}</div>
                <p className="text-sm text-gray-600 mt-1">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 