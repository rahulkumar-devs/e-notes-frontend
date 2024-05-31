import { z } from "zod";

export const bookValidation = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  descriptions: z.string().min(1, "Descriptions are required"),
  pdf_file: z.string(),
  imageFiles: z.array(z.string()),
  coverImage:z.string()
  // Add other fields as necessary
});

export interface IncomingBookSchema {
  title: string;
  genre: string;
  descriptions: string;
  coverImage: { public_id: string; url: string };
  imageFiles: { public_id: string; url: string }[];
  pdf_file: { public_id: string; url: string };
}


