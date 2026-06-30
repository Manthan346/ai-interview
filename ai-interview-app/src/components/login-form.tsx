"use client"

import { useEffect, useState } from "react"
import { Mail, Play } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  SignupType,
  signupSchema,
} from "@/lib/zod/user-validation"
import { signUps } from "@/api"

export function LoginForm() {
  const [mode, setMode] = useState<"signup" | "signin">("signup")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema as any),
    defaultValues: {
      email: "",
    },
  })

  const isSignIn = mode === "signin"

  const onSubmit = async (data: SignupType) => {
    //calling bakend for user creation
    const res = await signUps(data)
    if (res.status === 200) {
      router.push("/verify")

    }





    reset()
  }

  return (
    <section className="min-h-screen bg-background p-4 md:p-6">
      <div className="grid min-h-[95vh] overflow-hidden rounded-4xl border bg-card md:grid-cols-[1fr_420px]">
        {/* Left */}
        <div className="relative flex flex-col bg-background px-6 py-8 md:px-10">
          <div className="text-2xl font-semibold tracking-tight">
            AI-Interview
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                  <Play className="h-6 w-6 fill-current" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                  {isSignIn
                    ? "Welcome Back"
                    : "Welcome to AI-Interview"}
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  {isSignIn
                    ? "Sign in and continue your training."
                    : "Create your account"}
                </p>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                or
              </div>

              {/* Form */}
              <form method="post"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="email"
                      placeholder="Enter email address"
                      className="h-12 rounded-xl bg-background pl-11"
                      {...register("email")}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full text-base font-medium"
                >
                  {isSubmitting
                    ? "Please wait..."
                    : isSignIn
                      ? "Sign In"
                      : "Continue"}
                </Button>
              </form>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                By continuing, you agree to our Terms and Privacy
                Policy.
              </p>

              <p className="text-center text-sm text-muted-foreground">
                {isSignIn
                  ? "New here?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() =>
                    setMode(
                      isSignIn ? "signup" : "signin"
                    )
                  }
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {isSignIn ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative hidden h-full md:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster="/poster.jpg"
          >
            <source
              src="/auth-showcase.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-6 right-6 rounded-2xl bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md">
            Inspiring creativity
          </div>
        </div>
      </div>
    </section>
  )
}