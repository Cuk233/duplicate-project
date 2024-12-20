
interface IncludedItemsProps {
  included?: string[];
  notIncluded?: string[];
}

export default function IncludedItems({ included, notIncluded }: IncludedItemsProps) {
  if (!included && !notIncluded) return null;

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included Items */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Trip Inclusions</h3>
          <div className="space-y-6">
            {included?.map((category: string, index: number) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {category.split(',').map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Not Included Items */}
        {notIncluded && notIncluded.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Not Included</h3>
            <ul className="space-y-2">
              {notIncluded.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
} 