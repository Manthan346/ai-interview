"use client"
import { Candidates } from "@/components/candidate-interviews/candidate-data"
import type { Candidate } from "@/app/types/interview"
import { useEffect, useState } from "react"
import { getAllInterviews } from "@/api"




function Page() {

  const [candidateData, setCandidateData] = useState<Candidate[]>([])
  const getInterviews = async() => {
 const res = await getAllInterviews()
 const data = res.data.data.interviews
 setCandidateData(data)

 
 console.log(res)

}
useEffect(()=> {
  getInterviews()
  

}, [])

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 mt-15">
      <Candidates
        candidates={candidateData}
        title="Your Interviews"
        subtitle="Track candidate progress, review status, and open interview reports from one place."
      />
    </div>
  )
}

export default Page