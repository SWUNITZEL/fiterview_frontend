/**
 * @file PostUploadContents.jsx
 * @description AI 모의면접 페이지/문서 업로드 후 콘텐츠
 * @author 이찬우
 * @created 2025-05-07
**/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { PostUploadContentsPropTypes } from "../../types/props";

const PostUploadContents = ({ userName, averageDataByCategory }) => {
  const baseData = [
    { name: "1-1", pv: 6 },
    { name: "1-2", pv: 5 },
    { name: "2-1", pv: 3 },
    { name: "2-2", pv: 3 },
    { name: "3-1", pv: 2 },
    { name: "3-2", pv: 1 },
  ].filter((_, idx) => {
    return Object.values(averageDataByCategory).some(arr => arr[idx] != null);
  });;

  const categories = Object.keys(averageDataByCategory);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mergedData, setMergedData] = useState(baseData);
  const [searched, setSearched] = useState(false);

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
      .filter(v => v != null); 

      if (selectedValues.length > 0) {
      const sum = selectedValues.reduce((acc, cur) => acc + cur, 0);
      updated["선택과목 평균"] = +(sum / selectedValues.length).toFixed(2);
    } else {
      updated["선택과목 평균"] = null; // 명시적으로 null 할당
    }

    return updated;
  });

    setMergedData(newMerged);
    setSearched(true);
  };

  return (
    <div className="full-screen child-row">
      <div className="side-margin"></div>
      <div className="statics-container">
        <div className="child-column-center">
            <h3>{userName}님의 생활기록부를 분석해보았어요!</h3>
            <h1>{userName}님의 전체 성적 추이</h1>

            <div className="category-buttons child-row-center">
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
            <LineChart width={750} height={300} data={mergedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis reversed domain={[1, 9]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="var(--primary-60)"
                name="전체 성적"
                dot={{ r: 4 }}
                activeDot={{
                  r: 4,
                  stroke: "var(--primary-60)",
                  strokeWidth: 3,
                  fill: "var(--nuetral-10)",
                }}
              />
              {searched && (
                <Line
                  type="monotone"
                  dataKey="선택과목 평균"
                  stroke="var(--primary-20)"
                  name="선택 과목 평균"
                  dot={{ r: 4 }}
                  activeDot={{
                    r: 4,
                    stroke: "var(--primary-20)",
                    strokeWidth: 3,
                    fill: "var(--nuetral-10)",
                  }}
                />
              )}
            </LineChart>
    
            <h3>{userName}님의 생활기록부 유형</h3>
            <h1>솔선수범하는 다재다능형</h1>
            <h4>#가나 #다라 #마바 #사아</h4>
            <p>아무거나 칭찬 및 비판</p>
            <div>
              학생부종합전형은 주로 학업역량, 진로역량, 공동체역량의 3대 역량을 학교생활기록부를 통해 평가합니다
            </div>
            <div className='child-row-center' style={{justifyContent:"center", gap:"10px"}}>
              <div className='criterion-card'>
                <span>학업역량</span>
              </div>
              <div className='criterion-card'>
                <span>진로역량</span>
                </div>
              <div className='criterion-card'>
                <span>공동체역량</span>
              </div>
            </div>
          </div>
      </div>
      <div className="side-margin"></div>
    </div>
  );
};

PostUploadContents.propTypes = PostUploadContentsPropTypes;

export default PostUploadContents;
