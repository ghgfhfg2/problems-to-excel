import axios from "axios";
import { b64toBlob } from "../utils";

export const convertTextToSpeech = async (
  data,
  voice,
  rate,
  language,
  fileName
) => {
  try {
    // 서버로 텍스트 데이터 전송
    const response = await axios.post(`https://node.onebook-test.com/api/tts`, {
      data, // 클라이언트에서 서버로 보낼 데이터 배열
      voice, //목소리
      rate, //속도
      language, //언어
      fileName, //파일명
    });

    // 서버에서 받은 파일 데이터 배열을 순회하며 처리
    response.data.files.forEach((file) => {
      const { filename, audioContent } = file;

      // base64로 받은 오디오 데이터를 Blob으로 변환
      const audioBlob = b64toBlob(audioContent, "audio/mp3");

      // Blob을 사용하여 파일 다운로드 트리거
      const link = document.createElement("a");
      link.href = URL.createObjectURL(audioBlob);
      link.download = filename; // 서버에서 받은 파일명을 사용하여 저장
      link.click(); // 다운로드 트리거
    });
  } catch (error) {
    console.error("Error during TTS conversion", error);
  }
};
