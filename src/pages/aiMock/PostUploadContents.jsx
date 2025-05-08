/**
 * @file PostUploadContents.jsx
 * @description AI 모의면접 페이지/문서 업로드 후 콘텐츠
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useState } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import './AIMock.css';

const PostUploadContents = () => {
  const baseData = [
    { name: "1-1", pv: 6 },
    { name: "1-2", pv: 5 },
    { name: "2-1", pv: 3 },
    { name: "2-2", pv: 3 },
    { name: "3-1", pv: 2 },
    { name: "3-2", pv: 1 },
  ];

  const categories = ["국어", "수학", "사회", "과학", "한국사", "기술·가정/제2외국어/한문/교양"];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mergedData, setMergedData] = useState(baseData);
  const [searched, setSearched] = useState(false); // 검색 여부

  const averageDataByCategory = {
    "국어":     [1, 3, 3, 2, 1, 1],
    "수학":     [3, 3, 2, 1, 1, 1],
    "영어":     [1, 3, 3, 2, 1, 1],
    "사회":     [1, 3, 3, 2, 1, 1],
    "과학":     [3, 3, 2, 1, 1, 1],
    "한국사":   [1, 1, 2, 2, 1, 1],
    "기술·가정/제2외국어/한문/교양": [1, 1, 1, 1, 1, 1],
  };

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
        .map(cat => averageDataByCategory[cat]?.[idx])
        .filter(v => v !== undefined);

      if (selectedValues.length > 0) {
        const sum = selectedValues.reduce((acc, cur) => acc + cur, 0);
        updated["선택과목 평균"] = +(sum / selectedValues.length).toFixed(2);
      }

      return updated;
    });

    setMergedData(newMerged);
    setSearched(true);
  };

  return (
    <div className="statics-container">
      <div>
        <h3>OO님의 생활기록부를 분석해보았어요!</h3>
        <h1>OO님의 전체 성적 추이</h1>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategories.includes(category) ? "active" : ""}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button className="search-button" onClick={handleSearch}>
          검색
        </button>

        <LineChart width={730} height={300} data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis reversed />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="pv"
            stroke="var(--primary-color)"
            name="전체 성적"
            dot={{ r: 4 }}
          />
          {searched && (
            <Line
              type="monotone"
              dataKey="선택과목 평균"
              stroke="var(--system-gray)"
              name="선택 과목 평균"
              dot={{ r: 4 }}
            />
          )}
        </LineChart>
      </div>
      <div>
        <h3>OO님의 생활기록부 유형</h3>
        <h1>솔선수범하는 다재다능형</h1>
        <h4>#가나 #다라 #마바 #사아</h4>
        <p>아무거나 칭찬 및 비판</p>
        <div>
          <span>학생부종합전형은 주로 학업역량, 진로역량, 공동체역량의 3대 역량을 학교생활기록부를 통해 평가합니다</span>
        </div>
        <div className='child-row-center'>
          <div>학업역량</div>
          <div>진로역량</div>
          <div>공동체역량</div>
        </div>
      </div>
    </div>
  );
};

export default PostUploadContents;
