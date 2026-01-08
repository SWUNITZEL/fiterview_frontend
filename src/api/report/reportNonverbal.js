import axios from 'axios'

export const getReportNonverbal = async (interviewId, token) => {
  try {
    const response = await axios.get(`/api/report/nonverbal/${interviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const data = response.data

    if (!data.isSuccess) {
      throw new Error(data.message || '비언어 리포트 요청 실패')
    }

    return data.result
  } catch (error) {
    console.error('API 요청 실패:', error)
    throw error
  }
}
