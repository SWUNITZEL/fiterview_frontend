import axios from 'axios';

export const setSchoolRecords = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}school-records/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};

export const getSchoolRecords = async () => {
    const url = `${process.env.REACT_APP_API_URL}school-records/analyze`
    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};