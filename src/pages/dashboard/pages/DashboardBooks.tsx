import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { bookValidation } from "../validations/bookValidation";
import { dashboardBooks } from "../components/static-data";

import {
  DashboardBookCoverImage,
  DashboardImageFile,
  DashboardBookDescriptions,
  DashboardPdfFile,
  DashboardTextField,
} from "../components/dashboardBooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setBookData } from "@/features/dashboard/booksReducer";
import { Link } from "react-router-dom";

const DashboardBooks = () => {
  const form = useForm<z.infer<typeof bookValidation>>({
    resolver: zodResolver(bookValidation),
    defaultValues: {
      title: "",
      genre: "",
      descriptions: "",
      pdf_file: "",
      imageFiles: "",
      coverImage: "",
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const { coverImage, imageFiles, pdf_file } = useSelector(
    (state: RootState) => state.books
  );
  function onSubmit(values: z.infer<typeof bookValidation>) {
    dispatch(
      setBookData({
        title: values.title,
        descriptions: values.descriptions,
        genre: values.genre,
        coverImage: coverImage,
        imageFiles: imageFiles,
        pdf_file: pdf_file,
      })
    );
  }

  return (
    <div className="md:px-2.5 w-full">
      <div className=" py-3 flex justify-between items-center ">
        <h2 className=" font-bold ">Dashboard</h2>
        <Link to={"/dashboard"}>dahboard/home</Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 dark:bg-gray-900 dark:text-white "
        >
          {dashboardBooks.map((item) => {
            if (item.name === "pdf_file") {
              return (
                <DashboardPdfFile key={item.name} item={item} form={form} />
              );
            }

            if (item.name === "imageFiles") {
              return (
                <DashboardImageFile key={item.name} item={item} form={form} />
              );
            }
            if (item.name === "coverImage") {
              return (
                <DashboardBookCoverImage
                  key={item.name}
                  item={item}
                  form={form}
                  
                />
              );
            }
            if (item.name === "descriptions") {
              return (
                <DashboardBookDescriptions
                  key={item.name}
                  item={item}
                  form={form}
                />
              );
            }
            return (
              <DashboardTextField key={item.name} item={item} form={form} />
            );
          })}

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardBooks;
