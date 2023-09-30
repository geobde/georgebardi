import { defineCollection, z } from 'astro:content'

export const collections = {
  article: defineCollection({
    schema: z.object({
      title: z.string(),
      link: z.string()
    })
  })
}
