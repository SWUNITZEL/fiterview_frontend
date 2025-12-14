import React from "react";

export default function ReadingReport() {
  return (
    <div className="p-6 space-y-10 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">책 제목 - 진행 했던 파트 이름</h1>
        <div className="space-x-2">
          <button className="px-4 py-1 border rounded-md">공유하기</button>
          <button className="px-4 py-1 border rounded-md">내보내기</button>
        </div>
      </div>

      {/* 최종 보고서 */}
      <section className="space-y-2">
        <h2 className="font-semibold">최종 보고서</h2>
        <table className="w-full border border-collapse">
          <tbody>
            <Row label="제목" value="제목명 작성" label2="저자" value2="저자명 작성" />
            <Row label="날짜" value="0000년 00월 00일" label2="분야" value2="분야명 작성" />
            <FullRow label="주제" value="주제 작성" />
            <FullRow label="줄거리" value="AI가 작성한 줄거리 작성" />

            <tr>
              <td rowSpan={9} className="border p-2 bg-gray-50 font-semibold">분석</td>
              <td className="border p-2 bg-gray-100 font-semibold">총점</td>
              <td colSpan={3} className="border p-2">0점 / 5점</td>
            </tr>

            <Section title="토론" items={["이해도", "표현성", "논리성", "태도"]} />
            <Section title="보고서" items={["이해도", "표현성", "논리성"]} />

            <tr>
              <td className="border p-2 bg-gray-100 font-semibold">감상문</td>
              <td className="border p-2 bg-gray-50 font-semibold">논리성</td>
              <td colSpan={2} className="border p-2">점수에 대한 간단한 설명</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 최종 감상문 */}
      <section className="space-y-2">
        <h2 className="font-semibold">최종 감상문</h2>
        <table className="w-full border border-collapse">
          <tbody>
            <Row label="제목" value="제목명 작성" label2="저자" value2="저자명 작성" />
            <Row label="날짜" value="0000년 00월 00일" label2="분야" value2="분야명 작성" />
            <FullRow label="주제" value="주제 작성" />
            <FullRow label="줄거리" value="사용자가 작성한 줄거리" />

            <tr>
              <td rowSpan={2} className="border p-2 bg-gray-50 font-semibold">느낀점</td>
              <td className="border p-2 bg-gray-100 font-semibold">책</td>
              <td colSpan={3} className="border p-2">사용자가 작성한 책에 대한 감상</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100 font-semibold">토론</td>
              <td colSpan={3} className="border p-2">사용자가 작성한 토론에 대한 감상</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Row({ label, value, label2, value2 }) {
  return (
    <tr>
      <td className="border p-2 bg-gray-50 font-semibold">{label}</td>
      <td className="border p-2">{value}</td>
      <td className="border p-2 bg-gray-50 font-semibold">{label2}</td>
      <td className="border p-2">{value2}</td>
    </tr>
  );
}

function FullRow({ label, value }) {
  return (
    <tr>
      <td className="border p-2 bg-gray-50 font-semibold">{label}</td>
      <td colSpan={3} className="border p-2">{value}</td>
    </tr>
  );
}

function Section({ title, items }) {
  return items.map((item, idx) => (
    <tr key={item}>
      {idx === 0 && (
        <td rowSpan={items.length} className="border p-2 bg-gray-100 font-semibold">
          {title}
        </td>
      )}
      <td className="border p-2 bg-gray-50 font-semibold">{item}</td>
      <td colSpan={2} className="border p-2">점수에 대한 간단한 설명</td>
    </tr>
  ));
}
