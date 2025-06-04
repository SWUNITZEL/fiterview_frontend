import { useState } from 'react';
import { SEMESTERS } from "../data/schoolRecords";
export const useGradeStats = (grades) => {
  const baseData = SEMESTERS.map((name, idx) => {
    let sum = 0;
    let count = 0;

    Object.values(grades).forEach(arr => {
      const val = arr[idx];
      if (val != null && val !== 0) {
        sum += val;
        count += 1;
      }
    });

    return {
      name,
      pv: count > 0 ? +(sum / count).toFixed(2) : null,  // 학기별 평균
    };
  }).filter((entry, idx) =>
    Object.values(grades).some(arr => arr[idx] != null)
  );

  const categories = Object.keys(grades);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mergedData, setMergedData] = useState(baseData);
  const [searched, setSearched] = useState(false);

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
    const newMerged = SEMESTERS.map((name, idx) => {
      const selectedValues = selectedCategories
        .map(cat => grades[cat]?.[idx])
        .filter(v => v != null && v !== 0);

      const sum = selectedValues.reduce((acc, cur) => acc + cur, 0);
      const avg = selectedValues.length > 0 ? sum / selectedValues.length : null;

      return {
        name,
        pv: baseData[idx]?.pv || 0,
        "선택과목 평균": avg !== null ? +avg.toFixed(2) : null,
      };
    }).filter((entry, idx) =>
      Object.values(grades).some(arr => arr[idx] != null)
    );

    const allSelectedScores = [];
    SEMESTERS.forEach((sem, idx) => {
      selectedCategories.forEach(cat => {
        const val = grades[cat]?.[idx];
        if (val != null && val !== 0) allSelectedScores.push(val);
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

  const allScores = [];
  Object.values(grades).forEach(arr => {
    arr.forEach(v => { if (v != null && v !== 0) allScores.push(v); });
  });

  const overallAvg = allScores.length ? (allScores.reduce((a, c) => a + c, 0) / allScores.length).toFixed(2) : '-';
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
