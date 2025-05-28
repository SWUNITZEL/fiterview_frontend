import { useNavigate } from 'react-router-dom';

export function useNavigateWithScrollTop() {
  const navigate = useNavigate();

  const navigateAndScrollTop = (path, options) => {
    navigate(path, options);
    window.scrollTo(0, 0);
  };

  return navigateAndScrollTop;
}
