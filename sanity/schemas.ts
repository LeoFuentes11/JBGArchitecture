export const schemaTypes = {
  post: {
    name: 'post',
    title: 'Blog Posts',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'publishedAt', title: 'Published At', type: 'datetime' },
      { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
      { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ],
  },
  page: {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'mainImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    ],
  },
  category: {
    name: 'category',
    title: 'Categories',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'parent', title: 'Parent Category', type: 'reference', to: [{ type: 'category' }] },
    ],
  },
  heroSettings: {
    name: 'heroSettings',
    title: 'Hero Slides',
    type: 'document',
    fields: [
      {
        name: 'slides',
        title: 'Slides',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
          ],
        }],
      },
      {
        name: 'primaryCta',
        title: 'Primary CTA',
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'URL', type: 'string' },
        ],
      },
      {
        name: 'secondaryCta',
        title: 'Secondary CTA',
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'URL', type: 'string' },
        ],
      },
      { name: 'establishedBadge', title: 'Established Badge', type: 'string' },
    ],
  },
  servicesSettings: {
    name: 'servicesSettings',
    title: 'Services',
    type: 'document',
    fields: [
      { name: 'sectionTitle', title: 'Section Title', type: 'string' },
      { name: 'sectionSubtitle', title: 'Section Subtitle', type: 'string' },
      {
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'tagline', title: 'Tagline', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'suitable', title: 'Suitable For', type: 'text' },
            {
              name: 'includes',
              title: 'Includes',
              type: 'array',
              of: [{ type: 'object', fields: [{ name: 'item', title: 'Item', type: 'string' }] }],
            },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        }],
      },
    ],
  },
  testimonialsSettings: {
    name: 'testimonialsSettings',
    title: 'Testimonials',
    type: 'document',
    fields: [
      { name: 'sectionTitle', title: 'Section Title', type: 'string' },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
          ],
        }],
      },
    ],
  },
  aboutSettings: {
    name: 'aboutSettings',
    title: 'About Page',
    type: 'document',
    fields: [
      {
        name: 'stats',
        title: 'Stats',
        type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ]}],
      },
      {
        name: 'storyParagraphs',
        title: 'Story Paragraphs',
        type: 'array',
        of: [{ type: 'object', fields: [{ name: 'text', title: 'Text', type: 'text' }] }],
      },
      {
        name: 'values',
        title: 'Values',
        type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ]}],
      },
      {
        name: 'wineIndustryParagraphs',
        title: 'Wine Industry Paragraphs',
        type: 'array',
        of: [{ type: 'object', fields: [{ name: 'text', title: 'Text', type: 'text' }] }],
      },
      { name: 'officeImage', title: 'Office Image', type: 'image' },
    ],
  },
  siteSettings: {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
      { name: 'phone', title: 'Phone', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' },
      {
        name: 'address',
        title: 'Address',
        type: 'object',
        fields: [
          { name: 'street', title: 'Street', type: 'string' },
          { name: 'suburb', title: 'Suburb', type: 'string' },
          { name: 'state', title: 'State', type: 'string' },
          { name: 'postcode', title: 'Postcode', type: 'string' },
        ],
      },
      {
        name: 'officeHours',
        title: 'Office Hours',
        type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'days', title: 'Days', type: 'string' },
          { name: 'hours', title: 'Hours', type: 'string' },
        ]}],
      },
      { name: 'footerTagline', title: 'Footer Tagline', type: 'string' },
      { name: 'googleMapsUrl', title: 'Google Maps URL', type: 'string' },
      {
        name: 'socialLinks',
        title: 'Social Links',
        type: 'object',
        fields: [
          { name: 'instagram', title: 'Instagram', type: 'string' },
          { name: 'facebook', title: 'Facebook', type: 'string' },
          { name: 'linkedin', title: 'LinkedIn', type: 'string' },
        ],
      },
    ],
  },
  headerSettings: {
    name: 'headerSettings',
    title: 'Header',
    type: 'document',
    fields: [{
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ]}],
    }],
  },
  footerSettings: {
    name: 'footerSettings',
    title: 'Footer',
    type: 'document',
    fields: [
      {
        name: 'navItems',
        title: 'Footer Links',
        type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'string' },
        ]}],
      },
      { name: 'copyright', title: 'Copyright', type: 'string' },
    ],
  },
}