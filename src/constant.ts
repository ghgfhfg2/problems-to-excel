// 컬럼 크기 상태를 초기화
export const initialColumnWidths = {
  book_code: 100,
  type: 70,
  series: 250,
  episode: 250,
  episode_order: 80,
  difficulty: 70,
  step: 70,
  order: 70,
  question: 300,
  image: 200,
  q_sound: 250,
  q_options: 0,
  options: 0,
  o_sound: 150,
  mean: 300,
  hint: 200,
  answer: 200,
  sub_options: 300,
  sub_answer: 200,
};

export const typeGroups = {
  A: [1, 3, 4, 6, 7, 9],
  B: [1, 10, 11, 12, 13, 9],
  C: [2, 5, 12, 13, 15],
  D: [1, 3, 4, 6, 8, 9],
  E: [1, 10, 11, 12, 13, 9, 14],
  F: [2, 5, 12, 13, 15, 14],
};

export const activeTabDifficulty = ["a", "b", "c", "a", "b", "c"];
