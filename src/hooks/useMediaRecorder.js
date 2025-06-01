import { useRef } from 'react';

export const useMediaRecorder = (stream, onStop) => {
    const mediaRecorder = useRef(null);
    const recordedChunks = useRef([]);

    const start = () => {
        if (!stream) {
            console.warn("Stream이 아직 초기화되지 않았습니다.");
            return;
        }

        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data);
            }
        };

        console.log("stream tracks:", stream.getTracks());
        console.log("audio tracks:", stream.getAudioTracks());
        console.log("video tracks:", stream.getVideoTracks());

        mediaRecorder.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            recordedChunks.current = [];
            onStop(blob);
        };

        mediaRecorder.current.start();
        console.log('녹화 시작');
    };

    const stop = (shouldStopTracks = false) => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            if (shouldStopTracks) {
                mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
            }
            console.log('녹화 종료');
        }
    };

    return { start, stop };
};
