// base64 데이터를 Blob으로 변환하는 유틸리티 함수
export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data); // base64 디코딩
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

//음성 텍스트 데이터 추출
export const convertAudioData = (data) => {
  const arr = [];
  const optionSound = [1, 2];
  const qSound = [6, 8, 9, 13];
  const AnswerSound = [10, 11];
  //질문배열: 14
  //조합 : 7
  //질문추가 : 8,9
  data.forEach((el) => {
    if (optionSound.includes(el.type)) {
      arr.push({
        text: el.options,
        filename: `${el.type}_${el.order}.mp3`,
      });
    }
    if (qSound.includes(el.type)) {
      arr.push({
        text: el.question,
        filename: `${el.type}_${el.order}.mp3`,
      });
    }
    if (AnswerSound.includes(el.type)) {
      arr.push({
        text: el.answer,
        filename: `${el.type}_${el.order}.mp3`,
      });
    }
    if (el.type === 7) {
      const filterBlank = el.question.replace("@_", "");
      const optionArr = el.options.split("/");
      const text = filterBlank + optionArr[el.answer];
      arr.push({
        text,
        filename: `${el.type}_${el.order}.mp3`,
      });
    }
    if (el.type === 14) {
      const opArr = el.q_options.split("/");
      opArr.forEach((op, idx) => {
        arr.push({
          text: op,
          filename: `${el.type}_${idx}.mp3`,
        });
      });
    }
  });
  return arr;
};
