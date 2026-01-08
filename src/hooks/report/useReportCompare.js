import { useEffect, useState } from 'react'
import { getReportCompare } from '../../api/report/reportCompare'

export const useReportCompare = (interviewId, token) => {
  const [compareData, setCompareData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportCompare(interviewId, token)
        setCompareData(data)
      } catch (error) {
        console.error('비교 리포트 에러:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { compareData, loading }
}