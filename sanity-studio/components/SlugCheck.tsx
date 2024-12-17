'use client'

import {useEffect, useState} from 'react'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '5vwngzfs',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export default function SlugCheck() {
  const [tours, setTours] = useState<any[]>([])

  useEffect(() => {
    const fetchTours = async () => {
      const query = `*[_type == "tour"]{
        title,
        "slug": slug.current,
        tripCode
      }`
      const result = await client.fetch(query)
      setTours(result)
    }

    fetchTours()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Tours</h2>
      <div className="space-y-4">
        {tours.map((tour) => (
          <div key={tour.slug} className="border p-4 rounded">
            <p><strong>Title:</strong> {tour.title}</p>
            <p><strong>Slug:</strong> /tours/{tour.slug}</p>
            <p><strong>Code:</strong> {tour.tripCode}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 