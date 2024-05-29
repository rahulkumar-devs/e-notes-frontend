import { z } from "zod";

export const bookValidation = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  descriptions: z.string().min(1, "Descriptions are required"),
  pdf_file: z.string().optional(),
  imageFiles: z.string().optional(),
  coverImage: z.string().optional(),
  // Add other fields as necessary
});
