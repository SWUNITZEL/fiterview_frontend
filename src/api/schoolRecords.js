import { fastapiApi, springApi } from './client';

export const setSchoolRecords = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fastapiApi.post(`school-records/upload`,formData);

    console.log(response.data)

    return response.data;
};

export const getSchoolRecords = async () => {
  try {
    const response = await springApi.get('school-records/analyze');
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
  }
};