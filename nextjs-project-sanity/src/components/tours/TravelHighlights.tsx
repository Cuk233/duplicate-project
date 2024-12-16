interface TravelHighlight {
  title: string;
  description: string;
  icon: string;
}

interface TravelHighlightsProps {
  highlights: TravelHighlight[];
}

export default function TravelHighlights({ highlights }: TravelHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlights.map((highlight, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-red-600">{highlight.icon}</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
          <p className="text-gray-600 text-sm">{highlight.description}</p>
        </div>
      ))}
    </div>
  );
} 