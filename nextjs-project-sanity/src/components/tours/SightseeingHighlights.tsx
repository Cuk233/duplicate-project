interface Highlight {
  title: string;
  description: string;
}

interface SightseeingHighlightsProps {
  highlights?: Highlight[];
}

export default function SightseeingHighlights({ highlights = [] }: SightseeingHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No sightseeing highlights available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
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