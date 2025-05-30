import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { setSchoolRecords } from '../api/schoolRecords';

export const usePdfUpload = ({ onSuccess, onError }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedData, setUploadedData] = useState(null);  // ✅ 업로드된 데이터 상태 추가
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
                setIsUploading(true);
                const data = await setSchoolRecords(file);
                setUploadedData(data); 
                if (onSuccess) onSuccess(data);
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
        uploadedData,  // ✅ 외부로 내보내줌
    };
};
