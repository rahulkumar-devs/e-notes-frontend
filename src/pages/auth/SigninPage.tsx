import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinFormSchema } from "./validation";
import { SigninData } from "./Static-Data";


import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchSigninData, setUser } from "@/features/auth/authReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const SigninPage = () => {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch: AppDispatch = useDispatch();
const navigate = useNavigate()
  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
   try {
    const resultAction = await dispatch(fetchSigninData(values));
    const user = unwrapResult(resultAction);
      dispatch(setUser(user));
     
      if(user){
        navigate("/")
      }

   } catch (error) {
    console.error(error)
   }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 m-3 bg-gray-900 p-8 rounded-lg max-w-md w-full text-white"
        >
          {SigninData.map((item, i) => (
            <FormField
              key={i}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={item.placeholder}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="border">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninPage;
