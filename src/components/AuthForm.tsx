"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/action/auth.action";


// zod schema for form validation
const authFormSchema = (isTypeLogin: boolean) => {
  return z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name:  !isTypeLogin ? z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters") : z.string().optional(),
  })
}


function AuthForm({ type }: { type: FormType }) {
  const isTypeLogin = type === "login";
  const formSchema = authFormSchema(isTypeLogin);

  const router = useRouter();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!isTypeLogin) {
        // user registration part
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password
        })

        if (!result?.success) {
          toast.error(result?.message || "Error creating user");
          return;
        }
        
        toast.success("Account created successfully. Please log in");
        router.push("/login");
      } else {
        // user login part
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        if (!idToken){
          toast.error("Login failed. Please try again");
          return;
        }

        await signIn({
          email,
          idToken
        })
        
        toast.success("Account log in successfully");
        router.push("/");
      }
    } catch (err: any) {
      console.log(`Error in ${type} form submission: `, err);      
      toast.error(`There was an error ${isTypeLogin ? "logging in" : "registering"} the user: ${err.message}`);
    }
  }

  
  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center ">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="logo"
            width={38}
            height={32}
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        {/* Tag line */}
        <h3>Practice interview skills with AI</h3>

        {/* Form */}
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isTypeLogin && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="your@example.com"
            />
            
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Button className="btn" type="submit">{isTypeLogin ? "Log In" : "Register"}</Button>
          </form>
        </Form>
        
        <p className="text-center">
          {isTypeLogin ? "Don't have an account? " : "Already have an account? "}
          <Link href={isTypeLogin ? "/register" : "/login"} className="font-bold text-user-primary ml-1">{isTypeLogin ? "Register" : "Log In"}</Link>
        </p>
      </div>
    </div>
      
  )
}

export default AuthForm