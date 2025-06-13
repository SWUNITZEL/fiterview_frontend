import axios from 'axios'

export const getReportCompare = async (interviewId, token) => {
  const res = await axios.get(`/api/report/compare/${interviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}