import { fastapiApi } from "./client";

export async function getCurriculumList() {
  try {
    console.log("getCurriculumList 요청중");
    const response = await fastapiApi.get(`api/list/curriculum`);
    const data = response.data;
    console.log("getCurriculumList 성공:", data);
    return data;

  } catch (error) {
    console.warn("getCurriculumList 실패:", error.response || error);
    return null;
  }
}