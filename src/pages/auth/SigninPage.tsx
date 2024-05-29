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

import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "@/features/api/authApi";
import { setCredentials } from "@/features/auth/authReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const SigninPage = () => {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch: AppDispatch = useDispatch();

  const [signIn, { isLoading, isError }] = useSignInMutation();
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    try {
      const payload = await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();
      // console.log(payload)

      if (payload) {
        dispatch(setCredentials(payload));
        navigate("/");
      }
      console.log(isError);
      // console.log(data);
    } catch (error) {
      if (error && typeof error === "object" && "status" in error) {
        const err = error as { status: number; data: any };
        if (err.status === 400) {
          console.error(
            "Bad request: ",
            err.data?.message || "Invalid email or password"
          );
        } else {
          console.error(
            "An error occurred: ",
            err.data?.message || "Please try again."
          );
        }
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 m-3 bg-gray-900 p-8 rounded-lg max-w-md w-full text-white dark:bg-gray-900 dark:text-white"
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
                      className="dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="border" disabled={isLoading}>
            {isLoading ? "loading..." : "Signin"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninPage;
