import axios from 'axios'

export const getReportDelivery = async (interviewId, token) => {
  const res = await axios.get(`/api/report/delivery/${interviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}