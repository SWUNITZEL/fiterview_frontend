import axios from 'axios';

export const fetchNonverbalReport = async (interviewId) => {
  const response = await axios.get(`/api/report/nonverbal/${interviewId}`);
  return response.data;
};