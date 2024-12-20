interface TripStyle {
  name: string;
  description: string;
  features: string[];
}

interface TravelStyleProps {
  travelStyle: TripStyle;
}

export default function TravelStyle({ travelStyle }: TravelStyleProps) {
  if (!travelStyle) return null;

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Travel Style</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{travelStyle.name || 'Travel Style'}</h3>
          <p className="text-gray-600 mt-2">{travelStyle.description || 'No description available'}</p>
        </div>
        
        {travelStyle.features && travelStyle.features.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Style Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {travelStyle.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
} 