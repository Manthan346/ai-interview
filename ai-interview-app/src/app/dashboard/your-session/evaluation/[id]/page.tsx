"use client"

import { ArrowRight, BookOpenCheck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import InterviewReport from '@/components/interview-evaluation/interview-report'
import { Suspense, useEffect, useState } from 'react'
import { interviewEvaluationById } from '@/api'
import { InterviewData } from '@/app/types/interview'

function page() {
  const { id } = useParams()
  const router = useRouter()
  const [data,setData] = useState<InterviewData | null>(null)

  //fetcing data by  id

  const getEvaluation = async () => {
       try {
        const res = await interviewEvaluationById(id)
          // console.log(res.data.data)
          const finalData = res.data.data.interview
          setData(finalData)
        
       } catch (error) {
        
       }
        

    }
  useEffect( () => {
    getEvaluation()
    
    
  



  }, [])


  
  

  console.log(id)
  if (!data) {
      return (
        <div>loading....</div>
      )
    }

    if (data.overallScore === 0) {
    return (
      <div>you didnt  completed the interview</div>
    )   
    }

  return (
    <Suspense fallback={<div>loaing </div>}>
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
      <InterviewReport data={data} />

      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Expected Answers</h2>
              <p className="text-sm text-muted-foreground">
                Review the model answer for each question and compare it with the candidate’s response.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push(`/dashboard/your-session/evaluation/${id}/questions`)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
          >
            View expected answers
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

export default page