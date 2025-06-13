import { useEffect, useState } from 'react'
import { getReportAnswer } from '../../api/report/reportAnswer'

export const useReportAnswer = (interviewId, token) => {
  const [answerData, setAnswerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportAnswer(interviewId, token)
        setAnswerData(data)
      } catch (error) {
        console.error('답변 리포트 에러:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { answerData, loading }
}