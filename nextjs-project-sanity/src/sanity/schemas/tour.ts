import { Rule } from '@sanity/types'

export default {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'tripCode',
      title: 'Trip Code',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'duration',
      title: 'Duration (Days)',
      type: 'number',
      validation: (rule: Rule) => rule.required().min(1)
    },
    {
      name: 'accommodationNights',
      title: 'Accommodation Nights',
      type: 'number',
      description: 'Number of nights accommodation included',
      validation: (rule: Rule) => rule.min(0)
    },
    {
      name: 'startEndCities',
      title: 'Start & End Cities',
      type: 'object',
      fields: [
        {
          name: 'startCity',
          title: 'Start City',
          type: 'string'
        },
        {
          name: 'endCity',
          title: 'End City',
          type: 'string'
        }
      ]
    },
    {
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'USD'
        },
        {
          name: 'priceType',
          title: 'Price Type',
          type: 'string',
          options: {
            list: [
              { title: 'per person', value: 'per person' },
              { title: 'per group', value: 'per group' }
            ]
          },
          initialValue: 'per person'
        }
      ]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'object',
      fields: [
        {
          name: 'score',
          title: 'Score',
          type: 'number',
          validation: (rule: Rule) => rule.min(0).max(5)
        },
        {
          name: 'reviewCount',
          title: 'Review Count',
          type: 'number',
          validation: (rule: Rule) => rule.min(0)
        }
      ]
    },
    {
      name: 'tripStyle',
      title: 'Trip Style',
      type: 'string',
      options: {
        list: [
          { title: 'Discovery', value: 'Discovery' },
          { title: 'Explorer', value: 'Explorer' },
          { title: 'Luxury', value: 'Luxury' },
          { title: 'Family', value: 'Family' }
        ]
      }
    },
    {
      name: 'activityLevel',
      title: 'Activity Level',
      type: 'string',
      options: {
        list: [
          { title: 'Leisurely', value: 'Leisurely' },
          { title: 'Dynamic', value: 'Dynamic' },
          { title: 'Active', value: 'Active' },
          { title: 'Challenging', value: 'Challenging' }
        ]
      },
      initialValue: 'Dynamic'
    },
    {
      name: 'meals',
      title: 'Meals',
      type: 'object',
      fields: [
        {
          name: 'breakfasts',
          title: 'Number of Breakfasts',
          type: 'number',
          validation: (rule: Rule) => rule.min(0)
        },
        {
          name: 'lunches',
          title: 'Number of Lunches',
          type: 'number',
          validation: (rule: Rule) => rule.min(0)
        },
        {
          name: 'dinners',
          title: 'Number of Dinners',
          type: 'number',
          validation: (rule: Rule) => rule.min(0)
        }
      ]
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'number',
              validation: (rule: Rule) => rule.required().min(1)
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule: Rule) => rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'locations',
              title: 'Locations',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'meals',
              title: 'Meals',
              type: 'object',
              fields: [
                {
                  name: 'breakfast',
                  title: 'Breakfast',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'lunch',
                  title: 'Lunch',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'dinner',
                  title: 'Dinner',
                  type: 'boolean',
                  initialValue: false
                }
              ]
            },
            {
              name: 'activities',
              title: 'Activities',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
                      title: 'Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Sightseeing', value: 'sightseeing' },
                          { title: 'Dining', value: 'dining' },
                          { title: 'Cultural', value: 'cultural' },
                          { title: 'Leisure', value: 'leisure' }
                        ]
                      }
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text'
                    }
                  ]
                }
              ]
            },
            {
              name: 'optionalExperiences',
              title: 'Optional Experiences',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string'
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text'
                    },
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'number'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'mapPoints',
      title: 'Map Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'city',
              title: 'City',
              type: 'string'
            },
            {
              name: 'coordinates',
              title: 'Coordinates',
              type: 'object',
              fields: [
                {
                  name: 'lat',
                  title: 'Latitude',
                  type: 'number'
                },
                {
                  name: 'lng',
                  title: 'Longitude',
                  type: 'number'
                }
              ]
            },
            {
              name: 'stayType',
              title: 'Stay Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Overnight', value: 'overnight' },
                  { title: 'Visit', value: 'visit' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'sightseeingHighlights',
      title: 'Sightseeing Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'travelHighlights',
      title: 'Travel Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string'
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text'
            }
          ]
        }
      ]
    }
  ]
} 