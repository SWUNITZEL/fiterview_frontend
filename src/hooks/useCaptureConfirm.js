import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendCaptureAndCombination } from '../api/interview';
import { PATH } from '../data/paths';

export const useCaptureConfirm = ({ capturedImage, onError, combineId }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedMic, selectedCam } = location.state || {};

    const onConfirm = async () => {
        if (!capturedImage) return;

        try {
            setLoading(true);
            const result = await sendCaptureAndCombination(capturedImage, combineId);

            if (!result.result.interviewId) {
                throw new Error('interviewId가 응답에 없습니다.');
            }

            navigate(PATH.INTERVIEW, {
                state: {
                    interviewId: result.interviewId,
                    selectedMic,
                    selectedCam,
                },
            });

        } catch (error) {
            console.error('이미지 전송 실패:', error);
            alert('이미지 전송 중 오류가 발생했습니다.');
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        onConfirm,
    };
};
