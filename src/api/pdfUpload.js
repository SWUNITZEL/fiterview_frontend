import axios from 'axios';

export const uploadPdfFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/school-records/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};
