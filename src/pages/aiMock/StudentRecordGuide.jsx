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
            description: `나이스 대한민국 서비스 '학부모 서비스'에 접속해 주세요.`,
            image: '/images/nice/step01.png',
            buttons: ['바로가기']
        },
        {
            title: '학교생활기록 선택',
            description: `로그인 후 '학교생활기록'을 클릭합니다.`,
            image: '/images/nice/step02.png',
        },
        {
            title: '대입전형자료 선택',
            description: `'자녀생활 > 학교생활기록'을 선택합니다.`,
            image: '/images/nice/step03.png',
        },
        {
            title: '자료 상세사항 설정자료 상세사항 설정',
            description: `대입 학년도와 모집 구분을 설정한 후, '조회' 버튼을 누릅니다.\n대입 학년도는 대학 입학 예정 년도를,모집 구분은 수시를 선택해 주세요.`,
            image: '/images/nice/step04.png',
        },
        {
            title: '대입전형 제공자료',
            description: `대입전형자료 요청내역 상단의 '대입전형 제공자료'\n버튼을 클릭합니다.`,
            image: '/images/nice/step05.png',
        },
        {
            title: '페이지 저장하기',
            description: '브라우저(크롬, 엣지)의 페이지 저장 기능으로 문서를\n저장합니다.',
            image: '/images/nice/step06.png',
        },
        {
            title: 'html 파일 업로드',
            description: '파일 형식을 웹페이지, 전부로 설정하고 저장합니다.\n저장한 폴더에 _files 폴더와 .html 파일이 저장됩니다.',
            image: '/images/nice/step07.png',
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
            {step.image && <img src={step.image} alt={step.title} className="step-image drop-shadow-medium" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRecordGuide;
