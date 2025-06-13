import { useEffect, useState } from 'react'
import { getReportDelivery } from '../../api/report/reportDelivery'

export const useReportDelivery = (interviewId, token) => {
  const [deliveryData, setDeliveryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReportDelivery(interviewId, token)
        setDeliveryData(data)
      } catch (error) {
        console.error('전달 리포트 에러:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId, token])

  return { deliveryData, loading }
}