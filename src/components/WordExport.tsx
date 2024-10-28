import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { WordExportStyle } from "../style/wordExport";
import { BsSoundwave } from "react-icons/bs";
import { useState } from "react";
import { onSoundPlay } from "../utils";
import { convertTextToSpeech } from "../api/getTts";
import { IoMdRefresh } from "react-icons/io";

const WordExport = () => {
  const [voice, setVoice] = useState("en-US-Wavenet-B");
  const [wordList, setWordList] = useState<string>("");

  const onSetVoice = (e: string) => {
    setVoice(e);
    onSoundPlay(`/sound/${e}.mp3`);
  };
  //목소리 선택

  //tts 속도조절
  const [ttsRate, setTtsRate] = useState<number>(1);
  const onChangeTtsRate = (e) => {
    console.log(e.target.value);
    setTtsRate(e.target.value);
  };
  const onInitRate = () => {
    setTtsRate(1);
  };

  const onExportTTS = () => {
    const wordArr = wordList.split("/").map((el) => {
      const obj = {
        text: el,
        filename: el,
      };
      return obj;
    });
    convertTextToSpeech(wordArr, voice, ttsRate);
  };
  return (
    <WordExportStyle>
      <Button
        onClick={onExportTTS}
        height={50}
        width={300}
        colorScheme={"green"}
        mb={4}
        gap={2}
      >
        <BsSoundwave />
        TTS 추출하기
      </Button>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"sm"}>목소리 선택</Text>
        <RadioGroup
          colorScheme={"green"}
          onChange={(e) => onSetVoice(e)}
          value={voice}
        >
          <Stack direction="row">
            <Radio defaultChecked value="en-US-Wavenet-B">
              남1
            </Radio>
            <Radio value="en-US-Wavenet-D">남2</Radio>
            <Radio value="en-US-Wavenet-A">남3</Radio>
            <Radio value="en-US-Wavenet-F">여1</Radio>
            <Radio value="en-US-Wavenet-C">여2</Radio>
            <Radio value="en-US-Wavenet-E">여3</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex align={"center"} gap={2} mt={3}>
        <span>tts속도 {ttsRate}</span>
        <input
          type="range"
          value={ttsRate}
          onChange={onChangeTtsRate}
          defaultValue={1}
          min={0.25}
          max={4.0}
          step={0.1}
        />
        <IoMdRefresh onClick={onInitRate} style={{ cursor: "pointer" }} />
      </Flex>
      <Textarea
        value={wordList}
        mt={3}
        onChange={(e) => setWordList(e.target.value)}
        placeholder="ex) word1/word2/word3"
      />
    </WordExportStyle>
  );
};

export default WordExport;
