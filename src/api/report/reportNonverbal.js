import axios from 'axios'

export const getReportNonverbal = async (interviewId, token) => {
  const res = await axios.get(`/api/report/nonverbal/${interviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}