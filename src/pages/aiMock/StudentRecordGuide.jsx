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
            description: '구글 플레이 스토어 또는 앱 스토어를 통해 정부24 앱을 설치해 주세요.',
            image: '/images/goverment24/step01.png',
            buttons: ['안드로이드 앱 다운로드', 'iOS 앱 다운로드']
        },
        {
            title: '정부 24 로그인',
            description: '앱을 실행하고 로그인을 해주세요.',
            image: '/images/goverment24/step02.png',
        },
        {
            title: '전자문서지갑 발급 신청',
            description: '전자문서지갑을 발급합니다. \n기존에 전자지갑문서를 발급한 적이 있다면 다음 단계로 넘어갑니다.',
            image: '/images/goverment24/step03.png',
        },
        {
            title: '전자문서지갑 발급 신청',
            description: '전자문서지갑을 발급합니다.',
            image: '/images/goverment24/step04.png',
        },
        {
            title: '생활기록부 검색',
            description: `메인으로 돌아와서 '생활기록부'를 검색 후, \n학교생활기록부(초중고)항목에서 '발급하기' 버튼을 클릭합니다.`,
            image: '/images/goverment24/step05.png',
        },
        {
            title: '생활기록부 발급하기',
            description: `학교이름을 입력하고 '검색' 버튼을 눌러 학생정보를 입력합니다. \n출력방법은 꼭 전자문서지갑 선택하고 '신청하기' 버튼을 클릭합니다.`,
            image: '/images/goverment24/step06.png',
        },
        {
            title: '생활기록부 확인하기',
            description: `발급이 완료되면 자동으로 화면이 넘어갑니다. \n'전자문서 지갑'에서 학교생활기록부를 열어주세요.`,             
            image: '/images/goverment24/step07.png',
        },
        {
            title: '생활기록부 다운로드',
            description: `학교생활기록부 파일이 열리면 상단에 '다운로드' 버튼을 클릭해주세요. \n이때 문서 비밀번호는 꼭 '미설정'으로 저장합니다.`,
            image: '/images/goverment24/step08.png',
        },
        {
            title: '생활기록부 발급하기',
            description: `파일은 이메일, 파일저장 등 PC로 옮기기 편한 방법으로 저장해주세요. 여기서는 카카오톡을 활용한 공유방법을 예시로 보여드릴게요. \n\n파일 저장 방법 중 카카오톡 아이콘을 클릭합니다. \n대화상대 선택에서 '내 프로필'을 선택하고 메세지를 보냅니다. \n이후 PC 카톡에서 다운로드 받아줍니다.`,
            image: '/images/goverment24/step09.png',
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
            <div className="circle subtitle-18-medium">{String(idx + 1).padStart(2, '0')}</div>
          </div>
          <div className="step-detail" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div style={{width: "400px"}}>
              <h3 className="subtitle-18-semibold">{step.title}</h3>
              <p className="subtitle-18-regular" style={{whiteSpace: 'pre-line'}}>{step.description}</p>
              {step.buttons && (
                <div className="button-group">
                  {step.buttons.map((btn, i) => (
                    <button key={i}>{btn}</button>
                  ))}
                </div>
              )}
            </div>
            {step.image && <img src={step.image} alt={step.title} className="step-image" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRecordGuide;
