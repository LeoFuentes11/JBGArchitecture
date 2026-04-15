import type { StructureResolver } from 'sanity/structure'

// Singleton document types — only one document per type allowed
const singletonTypes = new Set([
  'heroSettings',
  'servicesSettings',
  'testimonialsSettings',
  'aboutSettings',
  'siteSettings',
  'headerSettings',
  'footerSettings',
])

const singletonDocumentIds: Record<string, string> = {
  heroSettings: 'heroSettings',
  servicesSettings: 'servicesSettings',
  testimonialsSettings: 'testimonialsSettings',
  aboutSettings: 'aboutSettings',
  siteSettings: 'siteSettings',
  headerSettings: 'headerSettings',
  footerSettings: 'footerSettings',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Content collections
      S.listItem()
        .title('Blog Posts')
        .id('post')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog Posts')),

      S.listItem()
        .title('Portfolio Projects')
        .id('page')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Portfolio Projects')),

      S.listItem()
        .title('Categories')
        .id('category')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // Singletons
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .schemaType('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(singletonDocumentIds['siteSettings'])
        ),

      S.listItem()
        .title('Header Navigation')
        .id('headerSettings')
        .schemaType('headerSettings')
        .child(
          S.document()
            .schemaType('headerSettings')
            .documentId(singletonDocumentIds['headerSettings'])
        ),

      S.listItem()
        .title('Footer')
        .id('footerSettings')
        .schemaType('footerSettings')
        .child(
          S.document()
            .schemaType('footerSettings')
            .documentId(singletonDocumentIds['footerSettings'])
        ),

      S.divider(),

      S.listItem()
        .title('Hero Slides')
        .id('heroSettings')
        .schemaType('heroSettings')
        .child(
          S.document()
            .schemaType('heroSettings')
            .documentId(singletonDocumentIds['heroSettings'])
        ),

      S.listItem()
        .title('Services')
        .id('servicesSettings')
        .schemaType('servicesSettings')
        .child(
          S.document()
            .schemaType('servicesSettings')
            .documentId(singletonDocumentIds['servicesSettings'])
        ),

      S.listItem()
        .title('Testimonials')
        .id('testimonialsSettings')
        .schemaType('testimonialsSettings')
        .child(
          S.document()
            .schemaType('testimonialsSettings')
            .documentId(singletonDocumentIds['testimonialsSettings'])
        ),

      S.listItem()
        .title('About Page')
        .id('aboutSettings')
        .schemaType('aboutSettings')
        .child(
          S.document()
            .schemaType('aboutSettings')
            .documentId(singletonDocumentIds['aboutSettings'])
        ),
    ])

export { singletonTypes }
