
interface DepartureDate {
  date: string;
  price: number;
  availability: string;
}

interface DepartureDatesProps {
  departureDates?: {
    date: string;
    price: number;
    availability: string;
  }[];
  currency: string;
}

export default function DepartureDates({ departureDates, currency }: DepartureDatesProps) {
  if (!departureDates || departureDates.length === 0) return null;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Almost Full':
        return 'bg-yellow-100 text-yellow-800';
      case 'Guaranteed':
        return 'bg-blue-100 text-blue-800';
      case 'Sold Out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Available Departure Dates</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departure Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departureDates.map((date: DepartureDate, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {new Date(date.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {currency} {date.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAvailabilityColor(date.availability)}`}>
                    {date.availability}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className={`font-medium ${
                      date.availability === 'Sold Out'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-900'
                    }`}
                    disabled={date.availability === 'Sold Out'}
                  >
                    {date.availability === 'Sold Out' ? 'Sold Out' : 'Book Now'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 