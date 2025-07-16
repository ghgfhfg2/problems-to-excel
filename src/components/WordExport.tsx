import {
  Button,
  Flex,
  Input,
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
  //파일명 입력
  const [fileName, setFileName] = useState("");

  //언어 선택
  const [language, setLanguage] = useState("en-US");
  const onSetLanguage = (e: string) => {
    setLanguage(e);
  };

  const voiceList = {
    en: {
      language: "en-US",
      voice: [
        {
          name: "남1",
          value: "en-US-Wavenet-B",
        },
        {
          name: "남2",
          value: "en-US-Wavenet-D",
        },
        {
          name: "남3",
          value: "en-US-Wavenet-A",
        },
        {
          name: "여1",
          value: "en-US-Wavenet-F",
        },
        {
          name: "여2",
          value: "en-US-Wavenet-C",
        },
        {
          name: "여3",
          value: "en-US-Wavenet-E",
        },
      ],
    },
    ko: {
      language: "ko-KR",
      voice: [
        {
          name: "여1",
          value: "ko-KR-Wavenet-A",
        },
        {
          name: "여2",
          value: "ko-KR-Wavenet-B",
        },
        {
          name: "남1",
          value: "ko-KR-Wavenet-C",
        },
        {
          name: "남2",
          value: "ko-KR-Wavenet-D",
        },
      ],
    },
  };

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
    setTtsRate(e.target.value);
  };
  const onInitRate = () => {
    setTtsRate(1);
  };

  const onExportTTS = () => {
    const wordArr = wordList.split("/").map((el) => {
      const obj = {
        text: el,
        filename: fileName ? fileName : el,
      };
      return obj;
    });
    const languageCode = language === "en" ? "en-US" : "ko-KR";
    convertTextToSpeech(wordArr, voice, ttsRate, languageCode, fileName);
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
      <Flex gap={4} alignItems={"center"} mb={3}>
        <Text fontSize={"sm"}>언어 선택</Text>
        <RadioGroup
          colorScheme={"green"}
          onChange={(e) => onSetLanguage(e)}
          value={language}
        >
          <Stack direction="row">
            <Radio defaultChecked value="en">
              영어
            </Radio>
            <Radio value="ko">한국어</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"sm"}>목소리 선택</Text>
        <RadioGroup
          colorScheme={"green"}
          onChange={(e) => onSetVoice(e)}
          value={voice}
        >
          <Stack direction="row">
            {voiceList[language]?.voice.map((el) => (
              <Radio key={el.value} value={el.value}>
                {el.name}
              </Radio>
            ))}
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
      <Input
        mt={3}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="파일명 입력(공백이면 textArea와 동일)"
      />
      <Textarea
        value={wordList}
        mt={3}
        onChange={(e) => setWordList(e.target.value)}
        placeholder="추출할 음성 입력 | 여러개일 경우 : word1/word2/word3"
      />
    </WordExportStyle>
  );
};

export default WordExport;
