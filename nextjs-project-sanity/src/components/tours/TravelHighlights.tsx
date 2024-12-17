interface TravelHighlight {
  title: string;
  description: string;
  icon: string;
}

interface TravelHighlightsProps {
  highlights?: TravelHighlight[];
}

export default function TravelHighlights({ highlights = [] }: TravelHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No travel highlights available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">{highlight.icon}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 