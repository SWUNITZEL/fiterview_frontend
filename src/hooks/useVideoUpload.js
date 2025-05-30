import { useState } from 'react';
import { uploadVideoApi } from '../api/interview';

export function useVideoUpload() {
    const [isUploading, setIsUploading] = useState(false);

    const uploadVideo = async (videoBlob, interviewID) => {
        setIsUploading(true);

        try {
            const result = await uploadVideoApi(videoBlob, interviewID);
            console.log('비디오 업로드 성공:', result);
            return result;
        } catch (err) {
            console.error('비디오 업로드 실패:', err);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {uploadVideo, isUploading};
}
