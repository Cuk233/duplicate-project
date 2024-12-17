'use client'

import React from 'react';

interface Activity {
  type: string;
  description: string;
}

interface OptionalExperience {
  title: string;
  description: string;
  price: number;
}

interface Meals {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
  meals: Meals;
  activities: Activity[];
  optionalExperiences: OptionalExperience[];
}

interface DayByDayItineraryProps {
  itinerary: ItineraryDay[];
}

export default function DayByDayItinerary({ itinerary }: DayByDayItineraryProps) {
  return (
    <div className="day-by-day-itinerary">
      {itinerary.map((day, index) => (
        <div key={day.day} className="itinerary-day">
          <div className="day-header">
            <div className="day-number">
              <span>Day</span>
              <span className="number">{day.day}</span>
            </div>
            <h3 className="day-title">{day.title}</h3>
          </div>
          
          <div className="day-content">
            <div className="description">{day.description}</div>
            
            {day.locations?.length > 0 && (
              <div className="locations">
                <h4>Locations:</h4>
                <div className="location-list">
                  {day.locations.map((location, i) => (
                    <span key={i} className="location-tag">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {day.meals && (
              <div className="meals">
                <h4>Meals:</h4>
                <div className="meal-list">
                  {day.meals.breakfast && <span className="meal-tag">Breakfast</span>}
                  {day.meals.lunch && <span className="meal-tag">Lunch</span>}
                  {day.meals.dinner && <span className="meal-tag">Dinner</span>}
                </div>
              </div>
            )}

            {day.activities?.length > 0 && (
              <div className="activities">
                <h4>Activities:</h4>
                <ul className="activity-list">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="activity-item">
                      <span className="activity-type">{activity.type}:</span>
                      <span className="activity-description">{activity.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {day.optionalExperiences?.length > 0 && (
              <div className="optional-experiences">
                <h4>Optional Experiences:</h4>
                <ul className="experience-list">
                  {day.optionalExperiences.map((exp, i) => (
                    <li key={i} className="experience-item">
                      <div className="experience-header">
                        <span className="experience-title">{exp.title}</span>
                        <span className="experience-price">${exp.price}</span>
                      </div>
                      <p className="experience-description">{exp.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .day-by-day-itinerary {
          position: relative;
        }

        .day-by-day-itinerary::before {
          content: '';
          position: absolute;
          left: 2.5rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #DC2626;
          opacity: 0.2;
        }

        .itinerary-day {
          position: relative;
          padding-left: 5rem;
          padding-bottom: 2rem;
        }

        .day-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .day-number {
          position: absolute;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          padding: 0.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        .day-number span {
          font-size: 0.75rem;
          color: #6B7280;
          text-transform: uppercase;
        }

        .day-number .number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #DC2626;
        }

        .day-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
        }

        .day-content {
          color: #4B5563;
          line-height: 1.6;
        }

        .description {
          margin-bottom: 1.5rem;
        }

        h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .locations,
        .meals,
        .activities,
        .optional-experiences {
          margin-top: 1rem;
        }

        .location-list,
        .meal-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .location-tag,
        .meal-tag {
          background: #F3F4F6;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          color: #4B5563;
        }

        .activity-list,
        .experience-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .activity-item {
          margin-bottom: 0.5rem;
        }

        .activity-type {
          font-weight: 600;
          color: #374151;
          margin-right: 0.5rem;
        }

        .experience-item {
          background: #F9FAFB;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .experience-title {
          font-weight: 600;
          color: #374151;
        }

        .experience-price {
          color: #DC2626;
          font-weight: 600;
        }

        .experience-description {
          font-size: 0.875rem;
          color: #6B7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
} 