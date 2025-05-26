import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        console.warn('⚠️ 유저 정보 fetch 실패, 더미데이터 상태로 처리합니다.');
        setUser({id:"cksdn", name:"찬우", profile: '/images/default/profile.png'}); // 실패 시 null (비로그인)
      });
  }, []);

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
