import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import DashboardBookCoverImage from "./DashboardBookCoverImage";
import DashboardTextField from "./DashboardTextField";
import DashboardBookDescriptions from "./DashboardBookDescriptions";
import DashboardImageFile from "./DashboardImageFile";
import DashboardPdfFile from "./DashboardPdfFile";
import { bookFormSchema } from "../../validations/bookValidation";
import { useCreateBookApiMutation } from "../../dashboardApiInjector";

const DashboardBookForm = () => {
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
  });

  const [createBookApi, { isLoading }] = useCreateBookApiMutation();

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof bookFormSchema>) {
    console.log(values);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("descriptions", values.descriptions);
    if (values.coverImage) formData.append("coverImage", values.coverImage);

    if (values.imageFiles) {
      values.imageFiles.forEach((file: File) => {
        formData.append("imageFiles", file);
      });
    }
    if (values.pdf_file) formData.append("pdf_file", values.pdf_file);

    try {
      const res = await createBookApi(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <DashboardTextField
            name="title"
            label="Title"
            placeholder="Enter a valid and sensible Title"
            form={form}
          />
          {/* Genre */}
          <DashboardTextField
            name="genre"
            label="Genre"
            placeholder="Enter a valid and sensible Genre"
            form={form}
          />
          {/* Cover Image */}
          <DashboardBookCoverImage
            form={form}
            name="coverImage"
            label="Cover Image"
            fileAccept="image/*"
            placeholder="Choose a cover image"
          />
          {/* Descriptions */}
          <DashboardBookDescriptions
            form={form}
            name="descriptions"
            label="Description"
            placeholder="Enter a valid description"
          />
          {/* Image File */}
          <DashboardImageFile
            form={form}
            name="imageFiles"
            label="Image File"
            fileAccept="image/*"
            placeholder="Choose image file(s)"
          />
          {/* PDF File */}
          <DashboardPdfFile
            form={form}
            name="pdf_file"
            label="PDF File"
            fileAccept="application/pdf"
            placeholder="Choose a PDF file"
          />
          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "uploading..." : "Upload"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DashboardBookForm;
