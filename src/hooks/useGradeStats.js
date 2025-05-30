import { useState } from 'react';
import { SEMESTERS } from "../data/schoolRecords";

export const useGradeStats = (grades) => {
  // 학기별 전체 성적 (예시 값: pv)
  const baseData = SEMESTERS.map((name, idx) => ({
    name,
    pv: Object.values(grades).reduce((acc, arr) => {
      if (arr[idx] != null) return acc + arr[idx];
      return acc;
    }, 0),
  })).filter((entry, idx) =>
    Object.values(grades).some(arr => arr[idx] != null)
  );

  const categories = Object.keys(grades);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mergedData, setMergedData] = useState(baseData);
  const [searched, setSearched] = useState(false);

  // 선택 과목 평균, 최저, 최고 상태
  const [selectedStats, setSelectedStats] = useState({
    avg: null,
    min: null,
    max: null,
  });

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = () => {
    const newMerged = baseData.map((entry, idx) => {
      const updated = { ...entry };
      const selectedValues = selectedCategories
        .map(cat => grades[cat]?.[idx])
        .filter(v => v != null);

      if (selectedValues.length > 0) {
        const sum = selectedValues.reduce((acc, cur) => acc + cur, 0);
        const avg = sum / selectedValues.length;
        updated["선택과목 평균"] = +avg.toFixed(2);
      } else {
        updated["선택과목 평균"] = null;
      }
      return updated;
    });

    const allSelectedScores = [];
    SEMESTERS.forEach((sem, idx) => {
      selectedCategories.forEach(cat => {
        const val = grades[cat]?.[idx];
        if (val != null) allSelectedScores.push(val);
      });
    });

    if (allSelectedScores.length > 0) {
      const sumAll = allSelectedScores.reduce((acc, cur) => acc + cur, 0);
      const avgAll = sumAll / allSelectedScores.length;
      const minAll = Math.min(...allSelectedScores);
      const maxAll = Math.max(...allSelectedScores);
      setSelectedStats({
        avg: +avgAll.toFixed(2),
        min: minAll,
        max: maxAll,
      });
    } else {
      setSelectedStats({
        avg: null,
        min: null,
        max: null,
      });
    }

    setMergedData(newMerged);
    setSearched(true);
  };

  // 전체 성적 통계
  const allScores = [];
  Object.values(grades).forEach(arr => {
    arr.forEach(v => { if (v != null) allScores.push(v); });
  });
  const overallAvg = allScores.length ? (allScores.reduce((a,c)=>a+c,0)/allScores.length).toFixed(2) : '-';
  const overallMin = allScores.length ? Math.min(...allScores) : '-';
  const overallMax = allScores.length ? Math.max(...allScores) : '-';

  return {
    categories,
    selectedCategories,
    mergedData,
    searched,
    selectedStats,
    overallAvg,
    overallMin,
    overallMax,
    handleCategoryToggle,
    handleSearch,
  };
};
