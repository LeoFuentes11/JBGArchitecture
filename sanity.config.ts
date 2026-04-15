'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { structure, singletonTypes } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'sv48v185'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'jbg-architecture',
  title: 'JBG Architecture',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating multiple singleton documents
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Hide the "Create new" button for singleton types
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !singletonTypes.has(template.templateId))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action !== 'unpublish' && action !== 'delete' && action !== 'duplicate')
      }
      return prev
    },
  },
})
