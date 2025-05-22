/**
 * @file PreUploadContents.jsx
 * @description AI 모의면접 페이지/문서 업로드 전 콘텐츠
 * @author 이찬우
 * @created 2025-05-07
**/

import { useState } from 'react';
import './AIMock.css';
import StudentRecordGuide from './StudentRecordGuide';

import { AcademicCapIcon, BuildingLibraryIcon , UsersIcon  } from '@heroicons/react/24/solid';

const tabList = [
  { key: 'student', label: '재학생' },
  { key: 'graduate', label: '졸업생' },
  { key: 'parent', label: '학부모' },
];

const PreUploadContents = () => {
  const [activeTab, setActiveTab] = useState('student');


  return (
    <div className="full-screen child-row">
      <div className="side-margin"></div>
      <div className="tabs-container">
        <h2 className="title-32-bold" style={{margin:"116px auto 0px auto",textAlign: "center"}}>생활기록부 다운로드 방법 안내</h2>
        <h1 className="subtitle-18-medium" style={{margin:"24px auto 86px auto", textAlign: "center"}}>재학생, 졸업생, 학부모 별 다운로드 방법이 다르니 나에게 맞는 방법으로 진행해주세요.</h1>
        <div className="tab-buttons">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label==="재학생"?<BuildingLibraryIcon style={{width:"70px", margin:"10px auto -10px", transform: 'scaleY(0.8)'}}/>:tab.label==="졸업생"? <AcademicCapIcon style={{width:"70px", margin:"10px auto -10px", transform: 'scaleY(0.8)'}}/>:<UsersIcon style={{width:"70px", margin:"10px auto -10px", transform: 'scaleY(0.8)'}}/>}
              <p style={{
                fontSize: "18px",
                fontWeight: "600",
                padding:"0px", marginTop:"0px"}}>{tab.label}</p>
            </button>
          ))} 
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <hr style={{width: "100%", height:"1px", margin: "70px 5px 112px 5px"}}></hr>
          <span style={{whiteSpace: "nowrap", margin: "70px 5px 112px 5px", color:"var(--nuetral-80)"}} className='subtitle-18-bold'>{activeTab === 'parent' ? "나이스 대국민 서비스":"정부 24"}</span>
          <hr style={{width: "100%", margin: "70px 5px 112px 5px"}}></hr>
        </div>
        <div className="tab-content">
          {activeTab === 'student' && 
          <StudentRecordGuide stepsIdx="0" />
          }
          {activeTab === 'graduate' && 
          <StudentRecordGuide stepsIdx="0" />}
          {activeTab === 'parent' && <div>
          <StudentRecordGuide stepsIdx="1" />
          </div>}
        </div>

      </div>
      <div className='side-margin'></div>
    </div>
  );
};

export default PreUploadContents;
