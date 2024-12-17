import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tours',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tripCode',
      title: 'Trip Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'priceType',
          title: 'Price Type',
          type: 'string',
          options: {
            list: ['per person', 'total'],
          },
          validation: (Rule) => Rule.required(),
        }
      ]
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'object',
      fields: [
        {
          name: 'score',
          title: 'Score',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(5),
        },
        {
          name: 'reviewCount',
          title: 'Review Count',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        }
      ]
    }),
    defineField({
      name: 'tripStyle',
      title: 'Trip Style',
      type: 'string',
      options: {
        list: ['Country Explorer', 'Regional Explorer', 'Discovery', 'Family Experience'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'duration',
      title: 'Duration (Days)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'startEndCities',
      title: 'Start/End Cities',
      type: 'object',
      fields: [
        {
          name: 'startCity',
          title: 'Start City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endCity',
          title: 'End City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }
      ]
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
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
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'locations',
              title: 'Locations',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'meals',
              title: 'Meals',
              type: 'object',
              fields: [
                {name: 'breakfast', title: 'Breakfast', type: 'boolean'},
                {name: 'lunch', title: 'Lunch', type: 'boolean'},
                {name: 'dinner', title: 'Dinner', type: 'boolean'},
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
                        list: ['sightseeing', 'dining', 'cultural', 'leisure'],
                      }
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
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
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    },
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'number',
                    }
                  ]
                }
              ]
            }
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
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
              type: 'string',
            },
            {
              name: 'coordinates',
              title: 'Coordinates',
              type: 'object',
              fields: [
                {name: 'lat', title: 'Latitude', type: 'number'},
                {name: 'lng', title: 'Longitude', type: 'number'},
              ]
            },
            {
              name: 'stayType',
              title: 'Stay Type',
              type: 'string',
              options: {
                list: ['overnight', 'sightseeing', 'start', 'end'],
              }
            }
          ]
        }
      ]
    }),
    defineField({
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'travelStyle',
      title: 'Travel Style',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Style Name',
          type: 'string',
          options: {
            list: ['Country Explorer', 'Regional Explorer', 'Discovery', 'Family Experience'],
          },
        },
        {
          name: 'description',
          title: 'Style Description',
          type: 'text',
        },
        {
          name: 'features',
          title: 'Style Features',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'departureDates',
      title: 'Departure Dates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'availability',
              title: 'Availability',
              type: 'string',
              options: {
                list: ['Available', 'Almost Full', 'Guaranteed', 'Sold Out'],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'included',
      title: 'What\'s Included',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: ['Accommodation', 'Transportation', 'Meals', 'Experiences', 'Services'],
              },
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'travelRequirements',
      title: 'Travel Requirements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Guest Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(5),
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'review',
              title: 'Review',
              type: 'text',
            },
            {
              name: 'travelDate',
              title: 'Travel Date',
              type: 'date',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'priceIncludes',
      title: 'Price Includes',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'travelProtection',
      title: 'Travel Protection',
      type: 'object',
      fields: [
        {
          name: 'plans',
          title: 'Protection Plans',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Plan Name',
                  type: 'string',
                },
                {
                  name: 'price',
                  title: 'Price',
                  type: 'number',
                },
                {
                  name: 'coverage',
                  title: 'Coverage Details',
                  type: 'array',
                  of: [{type: 'string'}],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
}) 