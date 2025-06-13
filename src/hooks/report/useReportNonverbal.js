import { useEffect, useState } from 'react'
import { getReportNonverbal } from '../../api/report/reportNonverbal'

export const useReportNonverbal = (interviewId, token) => {
  const [nonverbalData, setNonverbalData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportNonverbal(interviewId, token)
        setNonverbalData(data)
      } catch (error) {
        console.error('비언어 리포트 에러:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { nonverbalData, loading }
}