import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  Box,
  Select,
} from "@chakra-ui/react";

type FormValues = {
  type: string;
  series: string;
  episode: string;
  episodeOrder: number;
  difficulty: string;
  step: number;
  order: number;
  question: string;
  image: string;
  questionSound: string;
  questionOptions: string;
  options: string;
  optionSound: string;
  meaning: string;
  hint: string;
  answer: string;
  subOptions: string;
  subAnswer: string;
};

export const Main: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <Box width="400px" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>유형 (Type)</FormLabel>
          <Input {...register("type")} />
        </FormControl>

        <FormControl>
          <FormLabel>원서 시리즈 (Series)</FormLabel>
          <Input {...register("series")} />
        </FormControl>

        <FormControl>
          <FormLabel>원서 에피소드 (Episode)</FormLabel>
          <Input {...register("episode")} />
        </FormControl>

        <FormControl>
          <FormLabel>에피소드 번호 (Episode Order)</FormLabel>
          <Input type="number" {...register("episodeOrder")} />
        </FormControl>

        <FormControl>
          <FormLabel>난이도 (Difficulty)</FormLabel>
          <Select {...register("difficulty")}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>스텝 (Step)</FormLabel>
          <Input type="number" {...register("step")} />
        </FormControl>

        <FormControl>
          <FormLabel>문제순서 (Order)</FormLabel>
          <Input type="number" {...register("order")} />
        </FormControl>

        <FormControl>
          <FormLabel>질문 (Question)</FormLabel>
          <Input {...register("question")} />
        </FormControl>

        <FormControl>
          <FormLabel>이미지 (Image)</FormLabel>
          <Input {...register("image")} />
        </FormControl>

        <FormControl>
          <FormLabel>질문 소리 (Question Sound)</FormLabel>
          <Input {...register("questionSound")} />
        </FormControl>

        <FormControl>
          <FormLabel>질문 문항 (Question Options)</FormLabel>
          <Input {...register("questionOptions")} />
        </FormControl>

        <FormControl>
          <FormLabel>문항 (Options)</FormLabel>
          <Input {...register("options")} />
        </FormControl>

        <FormControl>
          <FormLabel>문항소리 (Option Sound)</FormLabel>
          <Input {...register("optionSound")} />
        </FormControl>

        <FormControl>
          <FormLabel>의미 (Meaning)</FormLabel>
          <Input {...register("meaning")} />
        </FormControl>

        <FormControl>
          <FormLabel>힌트 (Hint)</FormLabel>
          <Input {...register("hint")} />
        </FormControl>

        <FormControl>
          <FormLabel>정답 (Answer)</FormLabel>
          <Input {...register("answer")} />
        </FormControl>

        <FormControl>
          <FormLabel>서브 질문 (Sub Options)</FormLabel>
          <Input {...register("subOptions")} />
        </FormControl>

        <FormControl>
          <FormLabel>서브 질문 정답 (Sub Answer)</FormLabel>
          <Input {...register("subAnswer")} />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          제출
        </Button>
      </form>
    </Box>
  );
};
