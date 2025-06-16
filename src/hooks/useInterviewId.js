import { useLocation } from 'react-router-dom';

const useInterviewId = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get('interviewId');
};

export default useInterviewId;
