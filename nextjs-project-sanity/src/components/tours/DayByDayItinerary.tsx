interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
}

interface DayByDayItineraryProps {
  itinerary: ItineraryDay[];
}

export default function DayByDayItinerary({ itinerary }: DayByDayItineraryProps) {
  return (
    <div className="space-y-6">
      {itinerary.map((day) => (
        <div key={day.day} className="border-l-4 border-red-600 pl-6 py-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                <span className="text-lg font-bold">{day.day}</span>
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2">{day.title}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{day.locations.join(" • ")}</span>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600">{day.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 