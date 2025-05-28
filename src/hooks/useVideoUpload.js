import { useState } from 'react';
import { uploadVideoApi } from '../api/interview';

export function useVideoUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadVideo = async (videoBlob, interviewID) => {
        setIsUploading(true);
        setError(null);

        try {
            const result = await uploadVideoApi(videoBlob, interviewID);
            console.log('비디오 업로드 성공:', result);
            return result;
        } catch (err) {
            console.error('비디오 업로드 실패:', err);
            setError(err);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return uploadVideo;
}
