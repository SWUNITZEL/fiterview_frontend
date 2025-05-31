import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken } from '../utils/token';
import { fetchUserInfo } from '../api/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const accessToken = getAccessToken();
        if (accessToken) {
          const userInfo = await fetchUserInfo();
          setUser(userInfo);
          sessionStorage.setItem('user', JSON.stringify(userInfo));  // 선택사항
        } else {
          setUser(null);
        }
      } catch (error) {
        console.warn('⚠️ 유저 정보 불러오기 실패:', error.response || error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
