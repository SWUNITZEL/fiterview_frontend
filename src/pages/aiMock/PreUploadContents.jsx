/**
 * @file PreUploadContents.jsx
 * @description AI 모의면접 페이지/문서 업로드 전 콘텐츠
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useState } from 'react';
import './AIMock.css';
import StudentRecordGuide from './StudentRecordGuide';

const tabList = [
  { key: 'student', label: '재학생' },
  { key: 'graduate', label: '졸업생' },
  { key: 'parent', label: '학부모' },
];

const PreUploadContents = () => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'student' && 
        <StudentRecordGuide stepsIdx="0" />
        }
        {activeTab === 'graduate' && 
        <StudentRecordGuide stepsIdx="0" />}
        {activeTab === 'parent' && <div>
        <StudentRecordGuide stepsIdx="1"/>
        </div>}
      </div>
    </div>
  );
};

export default PreUploadContents;
