import { initialColumnWidths } from "../constant";

export const headerMap = {
  type: { label: "유형", width: initialColumnWidths.type },
  series: { label: "원서 시리즈", width: initialColumnWidths.series },
  episode: { label: "원서 에피소드", width: initialColumnWidths.episode },
  episode_order: {
    label: "에피소드 번호",
    width: initialColumnWidths.episode_order,
  },
  difficulty: { label: "난이도", width: initialColumnWidths.difficulty },
  step: { label: "스텝", width: initialColumnWidths.step },
  order: { label: "문제순서", width: initialColumnWidths.order },
  qeustion: { label: "질문", width: initialColumnWidths.qeustion },
  image: { label: "이미지", width: initialColumnWidths.image },
  q_sound: { label: "질문 소리", width: initialColumnWidths.q_sound },
  q_options: { label: "질문 문항", width: initialColumnWidths.q_options },
  options: { label: "문항", width: initialColumnWidths.options },
  o_sound: { label: "문항소리", width: initialColumnWidths.o_sound },
  mean: { label: "의미", width: initialColumnWidths.mean },
  hint: { label: "힌트", width: initialColumnWidths.hint },
  answer: { label: "정답", width: initialColumnWidths.answer },
  sub_options: { label: "서브 질문", width: initialColumnWidths.sub_options },
  sub_answer: {
    label: "서브 질문 정답",
    width: initialColumnWidths.sub_answer,
  },
};
