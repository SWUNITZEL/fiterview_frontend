import { useEffect, useRef, useState } from 'react';

export function useInterviewWebSocket({ interviewId, onReceiveQuestion, onComplete }) {
    const websocket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        websocket.current = new WebSocket(`${process.env.REACT_APP_WS_URL}interview/1`);

        websocket.current.onopen = () => {
            console.log('WebSocket 연결 열림');
            setIsConnected(true);
            websocket.current.send(JSON.stringify({
                type: "init",
                interviewId,
                source: "interview"
            }));
        };

        websocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'question') {
                onReceiveQuestion(data.text);
            } else if (data.type === 'complete') {
                onComplete();
            }
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.current.onclose = () => {
            console.log('WebSocket 연결 종료됨');
        };

        return () => {
            websocket.current?.close();
        };
    }, [interviewId, onReceiveQuestion, onComplete]);

    const sendVideo = (blob) => {
        if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
            websocket.current.send(blob);
        }
    };

    return { sendVideo, isConnected };
}
