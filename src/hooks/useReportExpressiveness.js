import { useEffect, useRef, useState } from 'react';
import { getReportExpressiveness } from '../api/report';


export const showReportExpressiveness = async (interviewID) => {
    try {
        const result = await getReportExpressiveness(interviewID);
        return result;
    }catch (err) {
        console.error('전달력 분석 정보 받아오기 실패:', err);
        return null;
    } 
};


