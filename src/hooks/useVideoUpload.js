import { useState } from 'react';
import { uploadVideoApi } from '../api/interview';

export function useVideoUpload() {
    const [isUploading, setIsUploading] = useState(false);

    const uploadVideo = async (videoBlob, interviewID, questionID, onUploadComplete) => {
        setIsUploading(true);

        try {
            const result = await uploadVideoApi(videoBlob, interviewID, questionID);
            
            // 응답 구조 확인 및 로깅
            if (result && result.success && result.message === "영상 분석 접수 완료" && result.result) {
                console.log('영상 분석 접수 완료:', result.message);
                console.log('Job ID:', result.result.jobId);
                console.log('상태:', result.result.status);
                
                // 영상 분석 접수 완료 후 콜백 실행
                if (onUploadComplete) {
                    onUploadComplete(result);
                }
                
                return result;
            } else {
                console.error('예상하지 못한 응답 구조:', result);
                return null;
            }
        } catch (err) {
            console.error('비디오 업로드 실패:', err);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {uploadVideo, isUploading};
}
