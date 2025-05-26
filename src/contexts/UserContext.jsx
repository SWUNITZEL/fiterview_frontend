import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // ⭐ 로딩 상태 추가

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        console.warn('⚠️ 유저 정보 fetch 실패, 더미데이터 상태로 처리합니다.');
        setUser(null);
      })
      .finally(() => {
        setLoading(false);  // ⭐ 로딩 끝
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
