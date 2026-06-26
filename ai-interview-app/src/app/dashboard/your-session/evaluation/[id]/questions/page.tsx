"use client"

import { getIntrviewQuestionEvaluation } from '@/api'
import { InterviewQuestion } from '@/app/types/interview'
import { QuestionCard } from '@/components/question-evaluation/question-card'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

function page() {
  const { id } = useParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await getIntrviewQuestionEvaluation(id)
        const fetchedQuestions = Array.isArray(res?.data?.data?.questions)
          ? res.data.data.questions
          : []

        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error('Failed to fetch interview questions:', error)
        setQuestions([])
      }
    }

    if (id) {
      getQuestions()
    }
  }, [id])

  if (!questions.length) {
    return <div>no questions found</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => router.push(`/dashboard/your-session/evaluation/${id}`)}
        className="flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to evaluation
      </button>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Evaluation Questions</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review each question, its score, and the expected answer.
        </p>
      </div>

      <Suspense fallback={<div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">Loading questions, please wait...</div>}>
        <div className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <QuestionCard key={question.id ?? index} question={question} index={index} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

export default page