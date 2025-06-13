import { useEffect, useState } from 'react'
import { getReportMain } from '../../api/report/reportMain'

export const useReportMain = (interviewId, token) => {
  const [mainData, setMainData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportMain(interviewId, token)
        setMainData(data)
      } catch (error) {
        console.error('메인 리포트 에러:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { mainData, loading }
}