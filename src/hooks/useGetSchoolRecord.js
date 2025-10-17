import { useState, useEffect } from 'react';
import { getSchoolRecords } from '../api/schoolRecords';

export function useGetSchoolRecord() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const result = await getSchoolRecords();
        setData(result);
        console.log("학교 기록 불러오기 성공:", result);
      } catch (err) {
        setError(err);
      }
    };
    fetchRecord();
  }, []);

  return { data, error };
}
