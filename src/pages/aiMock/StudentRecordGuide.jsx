/**
 * @file StudentRecordGuide.jsx
 * @description AI 모의면접 페이지/문서 업로드 후 콘텐츠 / 생기부 다운로드 가이드
 * @author 이찬우
 * @created 2025-05-07
**/

import React from 'react';
import './AIMock.css'; // 아래 CSS 참고

const steps = [
    [
        {
            title: '정부24 앱 다운로드',
            description: '앱 스토어를 통해 정부24 앱을 설치해 주세요.',
            image: '/images/step01.png',
            buttons: ['안드로이드 앱 다운로드', 'iOS 앱 다운로드']
        },
        {
            title: '학교생활기록부(초중고) 검색',
            description: '검색창에 학교생활기록부(초중고)를 검색한 후, 발급하기 버튼을 선택해 주세요.',
            image: '/images/step02.png',
        },
        {
            title: '신청내용 입력',
            description: '학교명, 주민번호(비공개), 수령방법(전자문서지갑)을 선택한 후 신청하기 버튼을 눌러주세요.',
            image: '/images/step03.png',
        },
        {
            title: '파일 다운로드',
            description: '서비스 신청내역에서 신규 발급된 학교생활기록부를 선택한 후, 저장 아이콘을 눌러주세요.',
            image: '/images/step04.png',
        },
        {
            title: '파일 설정',
            description: '비밀번호(본인 생년월일 6자리) 입력 후 미설정 버튼을 선택하여 파일을 저장해 주세요.',
            image: '/images/step05.png',
        },
        {
            title: '생기부 등록',
            description: '생기부 페이지에 파일을 등록해 주세요.',
            image: '/images/step06.png',
        }
    ],
    [
        {
            title: '나이스 대국민 학부모서비스 접속',
            description: '나이스 대국민 학부모서비스에 접속하세요.',
            image: '/images/step01.png',
            buttons: ['안드로이드 앱 다운로드', 'iOS 앱 다운로드']
        },
        {
            title: '학교생활기록 선택',
            description: '로그인 후 학교생활기록을 클릭해 주세요.',
            image: '/images/step02.png',
        },
        {
            title: '학교생활기록 확인',
            description: '학교생활기록의 항목을 모두 선택해 주세요.',
            image: '/images/step03.png',
        },
        {
            title: 'HTML 파일 저장',
            description: '브라우저(크롬, 엣지)의 페이지 저장 기능을 활용해 문서를 저장합니다.파일 형식은 웹페이지, 전부또는 웹페이지, 완료로 설정하세요.',
            image: '/images/step04.png',
        },
        {
            title: '생기부 등록',
            description: '생기부 페이지에 파일을 등록해 주세요.',
            image: '/images/step05.png',
        }
    ]
];

const StudentRecordGuide = ({stepsIdx}) => {
  return (
    <div className="timeline">
      {steps[Number(stepsIdx)].map((step, idx) => (
        <div className="timeline-step" key={idx}>
          <div className="circle-line-wrapper">
            <div className="circle">STEP<br/>{String(idx + 1).padStart(2, '0')}</div>
          </div>
          <div className="step-detail">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {step.buttons && (
              <div className="button-group">
                {step.buttons.map((btn, i) => (
                  <button key={i}>{btn}</button>
                ))}
              </div>
            )}
            {step.image && <img src={step.image} alt={step.title} className="step-image" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRecordGuide;
