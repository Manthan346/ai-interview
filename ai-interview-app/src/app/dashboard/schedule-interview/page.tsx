import { PrepForm } from "@/components/interview-prep/prep-form"

export default function ScheduleSessionPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        
      </div>
      
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center">
        <PrepForm />
      </div>
    </div>
  )
}
