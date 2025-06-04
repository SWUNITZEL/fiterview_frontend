import { useState, useEffect } from 'react';
import { getSchoolRecords } from '../api/schoolRecords';

export function useGetSchoolRecord() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSchoolRecords();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  return { data, error };
}
