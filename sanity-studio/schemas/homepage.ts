import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'featured', title: 'Featured Section' },
    { name: 'whyChooseUs', title: 'Why Choose Us Section' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required(),
      initialValue: 'Discover Your Next Adventure'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      rows: 2,
      validation: Rule => Rule.required(),
      initialValue: 'Explore handcrafted tours to the world\'s most extraordinary places'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroButton',
      title: 'Hero Button',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Explore Tours'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '#featured-tours'
        }
      ]
    }),

    // Featured Section
    defineField({
      name: 'featuredTitle',
      title: 'Featured Section Title',
      type: 'string',
      group: 'featured',
      validation: Rule => Rule.required(),
      initialValue: 'Featured Tours'
    }),
    defineField({
      name: 'featuredSubtitle',
      title: 'Featured Section Subtitle',
      type: 'text',
      group: 'featured',
      rows: 2,
      validation: Rule => Rule.required(),
      initialValue: 'Hand-picked tours featuring our most popular and extraordinary destinations'
    }),

    // Why Choose Us Section
    defineField({
      name: 'whyChooseUsTitle',
      title: 'Why Choose Us Title',
      type: 'string',
      group: 'whyChooseUs',
      validation: Rule => Rule.required(),
      initialValue: 'Why Choose Us'
    }),
    defineField({
      name: 'whyChooseUsSubtitle',
      title: 'Why Choose Us Subtitle',
      type: 'text',
      group: 'whyChooseUs',
      rows: 2,
      validation: Rule => Rule.required(),
      initialValue: 'Experience the difference of traveling with experts'
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'whyChooseUs',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Expert Guides', value: 'expert' },
                  { title: 'Safe Travel', value: 'safety' },
                  { title: 'Best Value', value: 'value' },
                  { title: 'Local Experience', value: 'local' },
                  { title: 'Customer Support', value: 'support' },
                  { title: 'Flexible Booking', value: 'booking' },
                ]
              },
              validation: Rule => Rule.required(),
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(3).max(6),
      initialValue: [
        {
          title: 'Expert Guides',
          description: 'Our experienced guides ensure you get the most out of your journey',
          icon: 'expert'
        },
        {
          title: 'Safe Travel',
          description: 'Your safety and comfort are our top priorities',
          icon: 'safety'
        },
        {
          title: 'Best Value',
          description: 'Competitive prices without compromising on quality',
          icon: 'value'
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content'
      }
    }
  }
}) 