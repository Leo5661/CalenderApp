import { z } from 'zod'

export const eventFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title must not be empty'),
  meetLink: z.string().url('Invalid Url').optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  dateTime: z.string(),
  tagId: z.string().optional(),
})
