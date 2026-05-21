"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { User, ChevronDown, ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { PrepType, prepSchema } from "@/lib/zod/prep-validation"
import { createInterviewSession } from "@/api"

const ROLES = [
  "Software Engineer (IT)",
  "Full stack developer",
  "frontend developer",
  "react.js developer",
  "backend developer",
  "java full stack developer",
  "Data Scientist (IT)",
  "web developer",
  "frontend developer",
  "backend developer",
  "react.js developer",
  "full stack developer",
  "Product Manager (IT)",
  "Accountant (Accounts)",
  "Financial Analyst (Accounts)",
  "Sales Representative (Sales)",
  "Marketing Executive (Marketing)",
  "HR Manager (Human Resources)",
  "Frontend Developer",
  
  "Operations Manager (Operations)",
  "Customer Support (Service)",
]

const EXPERIENCES = [
  "Fresher",
  "Less than 1 year",
  "1-2 years",
  "2-3 years",
  "3-4 years",
  "4-5 years",
  "5-6 years",
  "6-7 years",
  "7-8 years",
  "8-9 years",
  "9-10 years",
  "10+ years",
]

export function PrepForm() {
  const router = useRouter()
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PrepType>({
    // @ts-expect-error Zod typing issue with hookform resolvers
    resolver: zodResolver(prepSchema),
    defaultValues: {
      candidateName: "",
      experience: "",
      role: "",
    },
  })

  const onSubmit = async (data: PrepType) => {
   try {
     setIsSubmittingForm(true)
     // Simulate API call
     await createInterviewSession(data)
     console.log("Form Submitted:", data)
     
     reset()
     router.push("/call")
   } catch (error: any) {
    console.log(error.message)

    
   } finally {
    setIsSubmittingForm(false) 
    reset({candidateName: "", experience: "", role: ""})
   }
    // router.push("/dashboard") // Add navigation when ready
  }

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 py-12 md:p-8 md:py-20">
      {/* Explicit theme styling for the card container */}
      <div className="w-full max-w-2xl rounded-[2rem] border bg-card p-8 shadow-2xl md:p-12">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            NEXT GENERATION AI
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Step Into the Future
          </h1>
          <p className="text-base text-muted-foreground">
            Your AI-powered career journey starts here.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Full Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Johnathan Doe"
                  className="h-14 rounded-2xl border-input bg-background/50 pr-12 text-base text-foreground shadow-sm transition-all focus:bg-background focus:ring-2 focus:ring-ring"
                  {...register("candidateName")}
                />
                <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.candidateName && (
                <p className="text-sm text-red-500">{errors.candidateName.message}</p>
              )}
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Years of Experience
              </label>
              <Controller
                control={control}
                name="experience"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-14 p-7 w-full rounded-2xl border border-input bg-background/50 text-base text-foreground shadow-sm transition-all focus:bg-background focus:ring-2 focus:ring-ring">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent  className="w-full rounded-2xl  border-input bg-card">
                      <SelectGroup>
                      <SelectLabel className="ml-5">Experience</SelectLabel>
                      {EXPERIENCES.map((exp) => (
                        <SelectItem key={exp} value={exp} className="cursor-pointer rounded-2xl sm:ml-5 text-foreground focus:bg-accent focus:text-accent-foreground">
                          {exp}
                        </SelectItem>
                      ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Target Role
            </label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-14 w-full rounded-2xl border p-7 border-input bg-background/50 text-base text-foreground shadow-sm transition-all focus:bg-background focus:ring-2 focus:ring-ring">
                    <SelectValue placeholder="e.g. Senior Product Designer" />
                  </SelectTrigger>
                 
                  <SelectContent  className="w-full rounded-2xl border-input  bg-card ">
                     <SelectGroup>
                      <SelectLabel className="ml-5">Roles</SelectLabel>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role} className="cursor-pointer rounded-2xl ml-5 text-foreground focus:bg-accent focus:text-accent-foreground">
                        {role}
                      </SelectItem>
                    ))}
                    
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmittingForm}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              {isSubmittingForm ? "Initializing..." : "Launch AI Interview"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
        
        </form>
      </div>
    </div>
  )
}
