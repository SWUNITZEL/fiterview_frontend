/**
 * @file PreUploadBanner.jsx
 * @description AI 모의면접 페이지/문서 업로드 전 배너
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { CloudArrowUpIcon    } from "@heroicons/react/24/solid";

const PreUploadBanner = () => {

    const maxSize = 40 * 1024 * 1024; // 3MB

    const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
        alert('PDF 파일만 가능하며, 최대 40MB까지 업로드할 수 있습니다.');
        return;
        }

        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('pdf', file);

        try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload-pdf`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        alert('업로드 성공: ' + JSON.stringify(res.data));
        } catch (err) {
        console.error('업로드 실패', err);
        alert('업로드 중 오류 발생');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        maxSize,
    });

    return (
        <div className="full-screen center-both child-row" >
        <div className="child-column">
            <h1>생기부 문서업로드
            <br />드래그앤드롭가능</h1>
        </div>
        <div className="child-column">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <CloudArrowUpIcon  className='icon' />
                <p className="main-text">클릭 혹은 파일을 이곳에 드롭하세요.</p>
                <p className="sub-text">파일당 최대 40MB</p>
            </div>
        </div>
        </div>
    );
};

export default PreUploadBanner;