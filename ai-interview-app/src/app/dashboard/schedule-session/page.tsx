import { PrepForm } from "@/components/interview-prep/prep-form"

export default function ScheduleSessionPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center">
        <PrepForm />
      </div>
    </div>
  )
}
