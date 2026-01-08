import axios from 'axios'

export const getReportAnswer = async (interviewId, token) => {
  const res = await axios.get(`/api/report/answer/${interviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}