import { z } from "zod";

export const bookFormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "genre must be at least 2 characters.",
  }),
  descriptions: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  coverImage: z.instanceof(File).optional(),
  imageFiles: z.array(z.instanceof(File)).nonempty("At least one file is required."),
  pdf_file: z.instanceof(File).optional(),

})
export interface IncomingBookSchema {
  title: string;
  genre: string;
  descriptions: string;
  coverImage: { public_id: string; url: string };
  imageFiles: { public_id: string; url: string }[];
  pdf_file: { public_id: string; url: string };
}
