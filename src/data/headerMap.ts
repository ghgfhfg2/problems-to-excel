import { initialColumnWidths } from "../constant";

export const headerMap = {
  book_code: {
    excelHeader: "book_code",
    label: "북 코드",
    width: initialColumnWidths.book_code,
  },
  type: { excelHeader: "type", label: "유형", width: initialColumnWidths.type },
  series: {
    excelHeader: "series",
    label: "원서 시리즈",
    width: initialColumnWidths.series,
  },
  episode: {
    excelHeader: "episode",
    label: "원서 에피소드",
    width: initialColumnWidths.episode,
  },
  episode_order: {
    excelHeader: "episode_order",
    label: "에피소드 순서",
    width: initialColumnWidths.episode_order,
  },
  difficulty: {
    excelHeader: "difficulty",
    label: "난이도",
    width: initialColumnWidths.difficulty,
  },
  step: { excelHeader: "step", label: "스텝", width: initialColumnWidths.step },
  order: {
    excelHeader: "order",
    label: "문제순서",
    width: initialColumnWidths.order,
  },
  question: {
    excelHeader: "question",
    label: "질문",
    width: initialColumnWidths.question,
  },
  image: {
    excelHeader: "image",
    label: "이미지",
    width: initialColumnWidths.image,
  },
  q_sound: {
    excelHeader: "q_sound",
    label: "질문 소리",
    width: initialColumnWidths.q_sound,
  },
  q_options: {
    excelHeader: "q_options",
    label: "질문 문항",
    width: initialColumnWidths.q_options,
  },
  options: {
    excelHeader: "options",
    label: "문항",
    width: initialColumnWidths.options,
  },
  o_sound: {
    excelHeader: "o_sound",
    label: "문항소리",
    width: initialColumnWidths.o_sound,
  },
  mean: { excelHeader: "mean", label: "의미", width: initialColumnWidths.mean },
  hint: { excelHeader: "hint", label: "힌트", width: initialColumnWidths.hint },
  answer: {
    excelHeader: "answer",
    label: "정답",
    width: initialColumnWidths.answer,
  },
  sub_options: {
    excelHeader: "sub_options",
    label: "서브 질문",
    width: initialColumnWidths.sub_options,
  },
  sub_answer: {
    excelHeader: "sub_answer",
    label: "서브 질문 정답",
    width: initialColumnWidths.sub_answer,
  },
};
