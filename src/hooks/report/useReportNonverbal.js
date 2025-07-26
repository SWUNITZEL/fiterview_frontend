import { useEffect, useState } from 'react'
import { getReportNonverbal } from '../../api/report/reportNonverbal'

export const useReportNonverbal = (interviewId, token) => {
  const [nonverbalData, setNonverbalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!interviewId || !token) return

    const fetchData = async () => {
      try {
        const result = await getReportNonverbal(interviewId, token)
        setNonverbalData(result)
      } catch (err) {
        setError(err.message || '데이터 로드 실패')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { nonverbalData, loading, error }
}
