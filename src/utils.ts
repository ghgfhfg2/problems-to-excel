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
  const optionSound = [2];
  const qSound = [9, 12, 13];
  //질문배열: 14
  //질문추가 : 9
  //영영의미 : 5
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
    if (el.type === 5) {
      const mean = el.mean.split("/"); //영영뜻
      arr.push({
        text: mean[1],
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

let currentAudio: HTMLAudioElement | null = null;

export const onSoundPlay = (url: string) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = ""; // 브라우저 자원을 해제하기 위함
    currentAudio = null;
  }

  const audio = new Audio(url);
  audio.play();

  currentAudio = audio;
};
