/**
 * @file PreUploadBanner.jsx
 * @description AI 모의면접 페이지/문서 업로드 전 배너
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FolderPlusIcon } from "@heroicons/react/24/solid";

const PreUploadBanner = () => {

    const maxSize = 40 * 1024 * 1024;
    const uploadPdfURL = `${process.env.REACT_APP_API_URL}school-records/upload`

    const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
        alert('PDF 파일만 가능하며, 최대 40MB까지 업로드할 수 있습니다.');
        return;
        }

        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('pdf', file);

        try {
        const res = await axios.post(uploadPdfURL, formData, {
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
        <div className="center-both child-row preupload-banner" >
                <div className='preupload-banner-container'>
                    <h1 className='title-32-bold' style={{textAlign:"center",color:"var(--nuetral-10)"}}>생기부 문서업로드</h1>
                    <div {...getRootProps()} className="dropzone drop-shadow-small">
                        <input {...getInputProps()} />
                        <FolderPlusIcon  width="102px" color="var(--primary-60)" marginBottom="10px" style={{ transform: 'scaleY(0.8)' }}/>
                        <p className="subtitle-20-medium" style={{marginTop: "0px", marginBottom:"0px"}}>파일을 업로드 하세요</p>
                        <p className="body-14-medium" style={{marginTop:"8px", marginBottom:"0px", color: "var(--nuetral-80)"}}>클릭 혹은 파일을 이곳에 올려주세요.</p>
                        <p className="body-14-medium" style={{marginTop:"2px", marginBottom:"0px", color: "var(--primary-60)"}}>*파일당 최대 40MB</p>
                    </div>
                </div>
        </div>
    );
};

export default PreUploadBanner;