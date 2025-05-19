
/**
 * @module useExitPrompt
 * @description 사용자에게 페이지를 벗어나려고 할 때 확인 메시지를 표시하는 React 커스텀 훅
 * `shouldBlock`이 true일 경우, 사용자가 페이지를 닫거나 새로고침하려 할 때 브라우저에서 경고 메시지를 표시
 * @author 이찬우
 *
 * @param {boolean} shouldBlock - 페이지 이탈을 방지할 조건. true일 경우 beforeunload 이벤트가 활성화
 * @returns {Function} allowExit - 페이지 이탈을 허용하도록 설정하는 함수. 이 함수가 호출되면 사용자는 경고 없이 페이지를 벗어날 수 있음.
 *
 * @example
 * const allowExit = useExitPrompt(isBlocking);
 * 
 * const handleSubmit = () => {
 *   // 데이터 저장 등 안전한 종료 조건 만족 시
 *   allowExit();
 *   navigate('/complete');
 * };
 */

import { useEffect, useRef } from 'react';

const useExitPrompt = (shouldBlock) => {
  const unblockRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (shouldBlock && !unblockRef.current) {
        e.preventDefault();
        e.returnValue = ''; // Chrome용
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [shouldBlock]);

  const allowExit = () => {
    unblockRef.current = true;
  };

  return allowExit;
};

export default useExitPrompt;
