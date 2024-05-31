import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setBookData } from "@/features/dashboard/booksReducer";
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
  bookValidation,
} from "@/pages/dashboard/validations/bookValidation";
import { dashboardBooks } from "../../static-data";

interface ViewUploadBookCardProps {
  book: IncomingBookSchema;
}

const UpdateBook: FC<ViewUploadBookCardProps> = ({ book }) => {
  const isLoading = false;

  const form = useForm<z.infer<typeof bookValidation>>({
    resolver: zodResolver(bookValidation),
    defaultValues: {
      title: book?.title ||"",
      genre: book?.genre||"",
      descriptions: book?.descriptions||"",
      pdf_file: book?.pdf_file?.url || "",
      imageFiles: book?.imageFiles?.map((item) => item.url as string) || [],
      coverImage: book?.coverImage?.url || "",
    },
  });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (values: z.infer<typeof bookValidation>) => {
    dispatch(
      setBookData({
        title: values.title,
        descriptions: values.descriptions,
        genre: values.genre,
        coverImage: values.coverImage,
        imageFiles: values.imageFiles,
        pdf_file: values.pdf_file,
      })
    );
  };

  return (
    <div className="md:p-2.5 w-full" id="dashboardBookForm">
      <div>Back</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 dark:bg-gray-900 dark:text-white"
        >
          {dashboardBooks.map((item) => {
            switch (item.name) {
              case "pdf_file":
                return (
                  <DashboardPdfFile key={item.name} item={item} form={form} />
                );
              case "imageFiles":
                return (
                  <DashboardImageFile key={item.name} item={item} form={form} />
                );
              case "coverImage":
                return (
                  <DashboardBookCoverImage
                    key={item.name}
                    item={item}
                    form={form}
                  />
                );
              case "descriptions":
                return (
                  <DashboardBookDescriptions
                    key={item.name}
                    item={item}
                    form={form}
                  />
                );
              default:
                return (
                  <DashboardTextField key={item.name} item={item} form={form} />
                );
            }
          })}

          <div className="flex justify-around">
            <Button
              type="submit"
              className="flex justify-between items-center"
              disabled={isLoading}
            >
              <SpinnerLoader
                isLoading={isLoading}
                size="h-4 w-4"
                color="border-blue-500"
              />
              <span className={`${isLoading ? "hidden" : "block"}`}>
                Update
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBook;
