"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { User, ChevronDown, ArrowRight, Sparkles } from "lucide-react"
import {TriangleAlertIcon} from "lucide-react"

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
import { createInterviewSession, getInterviewOptions } from "@/api"





export function PrepForm() {
  type rolesType = {
    id: string,
    role: string
  }
  type experienceType = {
    id: string,
    experience: string,

  }
  type numberOfQuestionsType = {
    id?: string,
    numberOfQuestion?: string,
    NumberOfQuestion?: string,
  } 

  const [experience, setExperience] = useState<  experienceType[]>([])
const [roles, setRoles] = useState<  rolesType[] >([])
const [numberOfQuestions, setNumberOfQuestions] = useState<numberOfQuestionsType[]>([])

const fetchInterviewOptions = async () => {
   const res = await getInterviewOptions()
   const responseData = res?.data?.data ?? {}

   setExperience(responseData.experiences ?? [])
   setRoles(responseData.roles ?? [])
   setNumberOfQuestions(responseData.questions ?? [])
}

useEffect(() => {
  fetchInterviewOptions()
}, [])


  const router = useRouter()
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PrepType>({
    
    // cast to any to avoid zod version incompatibility between packages
    resolver: zodResolver(prepSchema as any),
    defaultValues: {
      candidateName: "",
      experienceId: "",
      roleId: "",
      numberOfQuestionId: "",
    },
  })

  const onSubmit = async (data: PrepType) => {
    setIsSubmittingForm(true)
    // Simulate API call
   await createInterviewSession(data)
    console.log("Form Submitted:", data)
    setIsSubmittingForm(false)
    reset()
    router.push("/call") // Add navigation when ready
  }

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 py-12 md:p-8 md:py-20">
      {/* Explicit theme styling for the card container */}
      <div className="w-full max-w-2xl rounded-[2rem] border bg-card p-8 shadow-2xl md:p-12">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center space-y-4 text-center">
        
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Enter your details
          </h1>
          
          <div
            role="note"
            className="flex w-full items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-left text-sm text-foreground"
          >
            <TriangleAlertIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-primary"
            />
            <p className="leading-relaxed">
              <span className="font-semibold text-primary">
                Important:
              </span>{" "}
              Say <span className="font-semibold">&quot;hello&quot; to AI</span>{" "}
              to start the interview.
            </p>
          </div>
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
                  className="h-14 rounded-2xl border border-input bg-background/10 text-base text-foreground shadow-sm transition-all focus:border-transparent focus:bg-background/20  dark:bg-background/20 pr-12"
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
                name="experienceId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-14 p-7 w-full rounded-2xl border border-input bg-background/10 text-base text-foreground shadow-sm transition-all focus:border-transparent focus:bg-background/20  dark:bg-background/20">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent  className="w-full rounded-2xl  border-input bg-card">
                      <SelectGroup>
                      <SelectLabel className="ml-5">Experience</SelectLabel>
                      {experience?.map((exp) => (
                        <SelectItem key={exp.id} value={exp.id} className="cursor-pointer rounded-2xl sm:ml-5 text-foreground focus:bg-accent focus:text-accent-foreground">
                          {exp.experience}
                        </SelectItem>
                      ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.experienceId && (
                <p className="text-sm text-red-500">{errors.experienceId.message}</p>
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
              name="roleId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-14 w-full rounded-2xl border p-7 border-input bg-background/10 text-base text-foreground shadow-sm transition-all focus:border-transparent focus:bg-background/20  dark:bg-background/20">
                    <SelectValue placeholder="e.g. Senior Product Designer" />
                  </SelectTrigger>
                 
                  <SelectContent  className="w-full rounded-2xl border-input  bg-card ">
                     <SelectGroup>
                      <SelectLabel className="ml-5">Roles</SelectLabel>
                    {roles?.map((role) => (
                      <SelectItem key={role.id} value={role.id} className="cursor-pointer rounded-2xl ml-5 text-foreground focus:bg-accent focus:text-accent-foreground">
                        {(role.role)}
                        
                      </SelectItem>
                    ))}
                    
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.roleId && (
              <p className="text-sm text-red-500">{errors.roleId.message}</p>
            )}
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Number of Questions
            </label>
            <Controller
              control={control}
              name="numberOfQuestionId"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange((value))}
                  defaultValue={(field.value)}
                >
                  <SelectTrigger className="h-14 w-full rounded-2xl border p-7 border-input bg-background/10 text-base text-foreground shadow-sm transition-all focus:border-transparent focus:bg-background/20 dark:bg-background/20">
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent className="w-full rounded-2xl border-input bg-card">
                    <SelectGroup>
                      <SelectLabel className="ml-5">Question Count</SelectLabel>
                      {numberOfQuestions?.map((count, index) => {
                      

                        return (
                          <SelectItem
                            key={count.id}
                            value={count.id!}
                            className="cursor-pointer rounded-2xl ml-5 text-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {count.NumberOfQuestion ?? "—"}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.numberOfQuestionId && (
              <p className="text-sm text-red-500">{errors.numberOfQuestionId.message}</p>
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
