import { fastapiApi } from "./client";

export async function creatReflection(chatId, reflectionData) {
 try {
    console.log("creatReflection 요청중")
    const response = await fastapiApi.post(`api/report/book/${chatId}`, reflectionData);    
    const data = response.data;
    console.log("creatReflection 성공:", data);
    return data;
  } catch (error) {
    console.warn('creatReflection 실패:', error.response || error);
    return null;
  }
}

export async function getReflection(chatId) {
 try {
    console.log("getReflection 요청중")
    const response = await fastapiApi.get(`api/report/book/${chatId}`);    
    const data = response.data;
    console.log("getReflection 성공:", data);
    return data;
  } catch (error) {
    console.warn('getReflection 실패:', error.response || error);
    return null;
  }
}

export async function getReflectionList() {
 try {
    console.log("getReflectionList 요청중")
    const response = await fastapiApi.get(`api/list/report/book`);    
    const data = response.data;
    console.log("getReflectionList 성공:", data);
    return data;
  } catch (error) {
    console.warn('getReflectionList 실패:', error.response || error);
    return null;
  }
}