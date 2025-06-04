import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { setSchoolRecords } from '../api/schoolRecords';
import { useUser } from '../contexts/UserContext';

export const usePdfUpload = ({ onSuccess, onError }) => {
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useUser();
    const maxSize = 40 * 1024 * 1024; // 40MB

    const onDrop = useCallback(
        async (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                alert('PDF 파일만 가능하며, 최대 40MB까지 업로드할 수 있습니다.');
                if (onError) onError('File rejected');
                return;
            }

            const file = acceptedFiles[0];

            try {
                if(user){
                    setIsUploading(true);
                    const data = await setSchoolRecords(file);
                    if (onSuccess) onSuccess(data);
                }
                else{
                    alert('로그인 후 이용해주세요.');
                }
            } catch (err) {
                console.error('업로드 실패', err);
                alert('업로드 중 오류 발생');
                if (onError) onError(err);
            } finally {
                setIsUploading(false);
            }
        },
        [onSuccess, onError]
    );

    const dropzone = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        maxSize,
    });

    return {
        ...dropzone,
        isUploading,
    };
};
