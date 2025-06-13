import axios from 'axios'

export const getReportMain = async (interviewId, token) => {
  const res = await axios.get(`/api/report/main/${interviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}