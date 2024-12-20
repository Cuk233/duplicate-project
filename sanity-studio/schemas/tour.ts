import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tours',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'details',
      title: 'Tour Details',
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
    },
    {
      name: 'pricing',
      title: 'Pricing & Dates',
    },
    {
      name: 'media',
      title: 'Media & Gallery',
    },
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
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
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    // Media
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
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
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ]
    }),
    // Tour Details
    defineField({
      name: 'duration',
      title: 'Duration (Days)',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'startEndCities',
      title: 'Start/End Cities',
      type: 'object',
      group: 'details',
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
      group: 'details',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tripStyle',
      title: 'Trip Style',
      type: 'object',
      group: 'details',
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
      name: 'activityLevel',
      title: 'Activity Level',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'level',
          title: 'Level',
          type: 'string',
          options: {
            list: ['Leisurely', 'Moderate', 'Dynamic', 'Active'],
          },
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        }
      ]
    }),
    // Pricing & Dates
    defineField({
      name: 'price',
      title: 'Base Price',
      type: 'object',
      group: 'pricing',
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
      name: 'departureDates',
      title: 'Departure Dates',
      type: 'array',
      group: 'pricing',
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
            {
              name: 'discounts',
              title: 'Discounts',
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
                        list: ['Early Bird', 'Last Minute', 'Group', 'Special'],
                      },
                    },
                    {
                      name: 'amount',
                      title: 'Amount',
                      type: 'number',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                    }
                  ]
                }
              ]
            }
          ],
        },
      ],
    }),
    // Itinerary
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      group: 'itinerary',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'locations',
              title: 'Locations',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'thumbnailImage',
              title: 'Thumbnail Image',
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
              name: 'expandedImage',
              title: 'Expanded Image',
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
              name: 'arrivalTransfer',
              title: 'Arrival Transfer',
              type: 'object',
              fields: [
                {
                  name: 'time',
                  title: 'Time',
                  type: 'string',
                },
                {
                  name: 'location',
                  title: 'Location',
                  type: 'string',
                }
              ]
            }),
            defineField({
              name: 'welcome',
              title: 'Welcome',
              type: 'object',
              fields: [
                {
                  name: 'time',
                  title: 'Time',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }
              ]
            }),
            defineField({
              name: 'accommodation',
              title: 'Accommodation',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                },
                {
                  name: 'location',
                  title: 'Location',
                  type: 'string',
                }
              ]
            }),
            defineField({
              name: 'meals',
              title: 'Meals',
              type: 'object',
              fields: [
                {
                  name: 'breakfast',
                  title: 'Breakfast',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'lunch',
                  title: 'Lunch',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'dinner',
                  title: 'Dinner',
                  type: 'boolean',
                  initialValue: false,
                }
              ]
            }),
            defineField({
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
                          { title: 'Sightseeing', value: 'Sightseeing' },
                          { title: 'Dining', value: 'Dining' },
                          { title: 'Cultural', value: 'Cultural' },
                          { title: 'Leisure', value: 'Leisure' }
                        ]
                      },
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text'
                    },
                    {
                      name: 'isIncluded',
                      title: 'Is Included',
                      type: 'boolean',
                      initialValue: true
                    },
                    {
                      name: 'image',
                      title: 'Activity Image',
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
                    }
                  ]
                }
              ]
            }),
            defineField({
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
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text'
                    },
                    {
                      name: 'type',
                      title: 'Experience Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Optional Experience', value: 'Optional Experience' },
                          { title: 'Iconic Experience', value: 'Iconic Experience' },
                          { title: 'Cultural Experience', value: 'Cultural Experience' },
                          { title: 'Adventure Experience', value: 'Adventure Experience' }
                        ]
                      }
                    },
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'number'
                    },
                    {
                      name: 'image',
                      title: 'Experience Image',
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
                    }
                  ]
                }
              ]
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'specialFeature',
              title: 'Special Feature',
              type: 'string',
            })
          ]
        }
      ]
    }),
    // Additional Information
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
      name: 'sightseeingHighlights',
      title: 'Sightseeing Highlights',
      type: 'array',
      group: 'details',
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
              name: 'locations',
              title: 'Locations',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required(),
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'travelHighlights',
      title: 'Travel Highlights',
      type: 'array',
      group: 'details',
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
              options: {
                list: [
                  { title: 'Expert Guide', value: 'guide' },
                  { title: 'Accommodation', value: 'hotel' },
                  { title: 'Transportation', value: 'transport' },
                  { title: 'Meals', value: 'meals' },
                  { title: 'Experiences', value: 'experiences' }
                ]
              }
            }
          ]
        }
      ]
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
              title: 'Review Date',
              type: 'date',
            },
            {
              name: 'review',
              title: 'Review Text',
              type: 'text',
            },
            {
              name: 'travelDate',
              title: 'Travel Date',
              type: 'date',
            },
            {
              name: 'location',
              title: 'Reviewer Location',
              type: 'string',
            },
            {
              name: 'images',
              title: 'Review Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    }
                  ]
                }
              ]
            }
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'details',
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
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Departure Information', value: 'departure' },
                  { title: 'Booking & Flights', value: 'booking' },
                  { title: 'Pricing & Payments', value: 'pricing' },
                  { title: 'Experiences', value: 'experiences' },
                  { title: 'Solo Travelers', value: 'solo' },
                  { title: 'Additional Information', value: 'additional' }
                ]
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }
          ]
        }
      ]
    }),
  ],
}) 