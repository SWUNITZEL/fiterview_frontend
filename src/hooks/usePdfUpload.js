import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export const usePdfUpload = ({ onSuccess, onError }) => {
    const maxSize = 40 * 1024 * 1024; // 40MB

    const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            alert('PDF 파일만 가능하며, 최대 40MB까지 업로드할 수 있습니다.');
            if (onError) onError('File rejected');
            return;
        }

        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/school-records/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('업로드 성공: ' + JSON.stringify(res.data));
            if (onSuccess) onSuccess(res.data);
        } catch (err) {
            console.error('업로드 실패', err);
            alert('업로드 중 오류 발생');
            if (onError) onError(err);
        }
    }, [onSuccess, onError]);

    const dropzone = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        maxSize,
    });

    return dropzone;
};
