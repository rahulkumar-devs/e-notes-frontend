import { FC } from "react";
import SpinnerLoader from "@/components/Spiner";
import { Button } from "@/components/ui/button";
import DashboardTextField from "../DashboardTextField";
import DashboardBookDescriptions from "../DashboardBookDescriptions";
import DashboardBookCoverImage from "../DashboardBookCoverImage";
import DashboardImageFile from "../DashboardImageFile";
import DashboardPdfFile from "../DashboardPdfFile";
import { Form } from "@/components/ui/form";
import {
  IncomingBookSchema,
  bookFormSchema,
} from "@/pages/dashboard/validations/bookValidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateBookApiMutation } from "@/pages/dashboard/dashboardApiInjector";

interface ViewUploadBookCardProps {
  book: IncomingBookSchema;
  goBack: (k: boolean) => void;
}

const UpdateBook: FC<ViewUploadBookCardProps> = ({ book, goBack }) => {
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: book?.title || "",
      genre: book?.genre || "",
      descriptions: book?.descriptions || "",
    },
  });

  const [updateBookApi, { isLoading }] = useUpdateBookApiMutation();

  const onSubmit = async (values: z.infer<typeof bookFormSchema>) => {
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
      const res = await updateBookApi(formData);
      console.log(res);
      goBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" py-5">
      <div className=" flex justify-center ">
        <div className=" text-center inline border dark:bg-gray-200 dark:text-black bg-slate-200 p-2.5 rounded-md">
          Update your Book Details
        </div>
      </div>
      <Button
        className=" my-2.5"
        onClick={() => {
          goBack(false);
        }}
      >
        GO BACK
      </Button>
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
            showCoverImages={book.coverImage}
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
            showImageFiles={book.imageFiles}
          />
          {/* PDF File */}
          <DashboardPdfFile
            form={form}
            name="pdf_file"
            label="PDF File"
            fileAccept="application/pdf"
            placeholder="Choose a PDF file"
            showPdfFile={book.pdf_file}
          />
          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "uploading..."
            ) : (
              <div>
                <SpinnerLoader
                  isLoading={isLoading}
                  size="h-8 w-8"
                  color="border-gray-900"
                  borderWidth="border-2"
                />
                Update
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBook;
