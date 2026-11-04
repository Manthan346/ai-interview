"use client"
import { Candidates } from "@/components/candidate-interviews/candidate-data"
import type { Candidate } from "@/app/types/interview"
import { useEffect, useState } from "react"
import { getAllInterviews } from "@/api"
import { Pagination } from "@/components/ui/pagination"

interface InterviewResponse {
  data: {
    totalInterview: number
    totalPages: number
    interviews: Candidate[]
  }
  message: string
  statusCode: number
  success: boolean
}

function Page() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalInterview, setTotalInterview] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const itemsPerPage = 10

  const getInterviews = async (page: number = 1) => {
    console.log(`Fetching interviews for page: ${page}`) // Debug log
    setLoading(true)
    try {
      const res = await getAllInterviews(page, itemsPerPage)
      console.log('API Response:', res) // Debug log
      const data = res.data as InterviewResponse

      console.log(`Received data for page ${page}:`, {
        interviewsCount: data.data.interviews.length,
        totalInterview: data.data.totalInterview,
        totalPages: data.data.totalPages
      }) // Debug log

      setCandidateData(data.data.interviews)
      setTotalInterview(data.data.totalInterview)
      setTotalPages(data.data.totalPages)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(`useEffect triggered with currentPage: ${currentPage}`) // Debug log
    getInterviews(currentPage)
  }, [currentPage])

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 mt-10 sm:mt-15">
      <div className="mb-6">
        <Candidates
          candidates={candidateData}
          title="Your Interviews"
          subtitle="Track candidate progress, review status, and open interview reports from one place."
        />
      </div>

      {/* Pagination Controls */}
      {!loading && (
        <div className="flex justify-center">
          <Pagination
            totalItems={totalInterview}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-primary"></div>
            <span className="text-sm text-muted-foreground">Loading interviews...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page