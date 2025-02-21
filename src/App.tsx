import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  Box,
  Checkbox,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Text,
  Switch,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  RadioGroup,
  Stack,
  Radio,
  Slider,
} from "@chakra-ui/react";
import * as XLSX from "xlsx";
import {
  defaultValuesType1,
  defaultValuesType2,
  defaultValuesType3,
  defaultValuesType4,
  defaultValuesType5,
  defaultValuesType6,
  defaultValuesType7,
  defaultValuesType8,
  defaultValuesType9,
  defaultValuesType10,
  defaultValuesType11,
  defaultValuesType12,
  defaultValuesType13,
  defaultValuesType14,
  defaultValuesType15,
} from "./data/type_1";
import { headerMap } from "./data/headerMap";
import {
  BookCodeSearchListStyle,
  Cell,
  Header,
  Row,
  Table,
  TabMenuStyle,
  WrapperStyle,
} from "./style";
import {
  activeTabDifficulty,
  initialColumnWidths,
  typeGroups,
} from "./constant";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdCopyright, MdOutlineDelete } from "react-icons/md";
import { convertType3Options } from "./validation";
import { LuCopyPlus } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { GoMoveToTop } from "react-icons/go";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { convertTextToSpeech } from "./api/getTts";
import { convertAudioData, onSoundPlay } from "./utils";
import WordExport from "./components/WordExport";
import { IoMdRefresh } from "react-icons/io";

type FormItem = {
  [key: string]: string | number;
};

type FormValues = {
  [key: string]: FormItem[];
};

const defaultValues = {
  type1: defaultValuesType1,
  type2: defaultValuesType2,
  type3: defaultValuesType3,
  type4: defaultValuesType4,
  type5: defaultValuesType5,
  type6: defaultValuesType6,
  type7: defaultValuesType7,
  type8: defaultValuesType8,
  type9: defaultValuesType9,
  type10: defaultValuesType10,
  type11: defaultValuesType11,
  type12: defaultValuesType12,
  type13: defaultValuesType13,
  type14: defaultValuesType14,
  type15: defaultValuesType15,
};

const useFieldArrays = (control: any) => {
  return Array.from({ length: 15 }, (_, i) =>
    useFieldArray({ control, name: `type${i + 1}` })
  );
};

const DataList: React.FC<{
  activeTab: number;
  fields: any[];
  register: any;
  seriesValue: string;
  onBookcodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeriesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEpiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEpiNumChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetValue: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  typeKey: string;
  hiddenFields: string[];
  columnWidths: { [key: string]: number };
  onAutoFill: (typeKey: string, header: string) => void;
}> = ({
  activeTab,
  fields,
  register,
  onBookcodeChange,
  onSeriesChange,
  onEpiChange,
  onEpiNumChange,
  onSetValue,
  typeKey,
  hiddenFields,
  columnWidths,
  onAutoFill,
}) => {
  const activeHeaders = Object.keys(headerMap).filter(
    (header) =>
      !hiddenFields.includes(header) &&
      defaultValues[typeKey].some((item) => item[header] !== "")
  );

  const readOnlyList = [
    "book_code",
    "series",
    "episode",
    "episode_order",
    "type",
    "difficulty",
    "step",
    "order",
  ];

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    header: string,
    typeKey: string
  ) => {
    if (!e.ctrlKey) return;
    const direction = {
      ArrowUp: -1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowRight: 1,
      Enter: 1,
    }[e.key];

    if (direction === undefined) return;
    const inputs = Array.from(
      document.querySelectorAll(`input[name^="${typeKey}"]`)
    );
    const currentIndex = inputs.findIndex((input) => input === e.target);
    let targetIndex = 0;
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
      targetIndex = currentIndex + direction * activeHeaders.length;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      targetIndex = currentIndex + direction;
    }
    if (inputs[targetIndex]) {
      (inputs[targetIndex] as HTMLInputElement).focus();
      e.preventDefault();
    }
  };

  return (
    <>
      <Table>
        <Header>
          {activeHeaders.map((header) => (
            <Cell
              key={header}
              className="table-header"
              style={{
                flexShrink: "0",
                flexBasis: columnWidths[header] ? columnWidths[header] : "auto",
                flexGrow: columnWidths[header] ? "0" : "1",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {headerMap[header].label}
            </Cell>
          ))}
        </Header>
        {fields.map((field, index) => {
          const isShort =
            (field.type === 1 && activeTab === 0 && field.order > 4) ||
            (field.type === 1 && activeTab === 3 && field.order > 4)
              ? true
              : (field.type === 9 && activeTab === 0 && field.order > 4) ||
                (field.type === 9 && activeTab === 3 && field.order > 4)
              ? true
              : (field.type === 12 && activeTab === 1 && field.order > 5) ||
                (field.type === 12 && activeTab === 4 && field.order > 5)
              ? true
              : false;
          if (isShort) return;
          return (
            <Row key={field.id}>
              {activeHeaders.map((header) => (
                <Cell
                  key={header}
                  style={{
                    flexShrink: "0",
                    flexBasis: columnWidths[header]
                      ? columnWidths[header]
                      : "auto",
                    flexGrow: columnWidths[header] ? "0" : "1",
                  }}
                >
                  <Input
                    {...register(`${typeKey}.${index}.${header}`)}
                    readOnly={readOnlyList.indexOf(header) > -1 ? true : false}
                    placeholder={
                      defaultValues[typeKey][index][header] as string
                    }
                    onChange={
                      header === "book_code"
                        ? onBookcodeChange
                        : header === "series"
                        ? onSeriesChange
                        : header === "episode"
                        ? onEpiChange
                        : header === "episode_order"
                        ? onEpiNumChange
                        : (e) => onSetValue(e, `${typeKey}.${index}.${header}`)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index, header, typeKey)}
                  />
                </Cell>
              ))}
            </Row>
          );
        })}
        <Row>
          {activeHeaders.map((header) => {
            const autoableHeader = ["q_sound", "image", "o_sound"];
            return (
              <Cell
                key={header}
                style={{
                  flexShrink: "0",
                  flexBasis: columnWidths[header]
                    ? columnWidths[header]
                    : "auto",
                  flexGrow: columnWidths[header] ? "0" : "1",
                }}
              >
                {autoableHeader.includes(header) &&
                  !["type8", "type14"].includes(typeKey) && (
                    <Button
                      onClick={() => onAutoFill(typeKey, header)}
                      size={"sm"}
                      width={"100%"}
                      fontSize={"11px"}
                    >
                      <LuCopyPlus
                        fontSize={"14px"}
                        style={{ marginRight: "5px" }}
                      />
                      Auto Fill
                    </Button>
                  )}
              </Cell>
            );
          })}
        </Row>
      </Table>
    </>
  );
};

export const App: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const [voice, setVoice] = useState("en-US-Wavenet-B");
  const fieldArrays = useFieldArrays(control);
  const [bookcodeValue, setBookcodeValue] = useState("");
  const [seriesValue, setSeriesValue] = useState("");
  const [epsodeValue, setEpsodeValue] = useState("");
  const [episodeNumValue, setEpisodeNumValue] = useState("");
  const [hiddenFields, setHiddenFields] = useState<string[]>([
    "book_code",
    "series",
    "episode",
    "episode_order",
    "type",
    "difficulty",
    "order",
  ]);
  const [activeTab, setActiveTab] = useState(0); // 활성화된 탭을 추적하는 상태
  const [columnWidths] = useState(initialColumnWidths);
  const [onResetState, setOnResetState] = useState(false);
  const [emptyCheckState, setEmptyCheckState] = useState(true);

  const onSetVoice = (e: string) => {
    setVoice(e);
    onSoundPlay(`/sound/${e}.mp3`);
  };
  //목소리 선택

  const onChangeEmptyCheck = () => {
    setEmptyCheckState(!emptyCheckState);
  };

  useEffect(() => {
    const currentValues = getValues();

    // 특정 필드를 제외한 나머지 필드를 초기화
    const fieldsToPreserve = ["type", "difficulty", "step", "order"];

    const resetData = Object.keys(currentValues).reduce((acc, typeKey) => {
      acc[typeKey] = currentValues[typeKey].map((item) => {
        const newItem: { [key: string]: string | number } = {};
        Object.keys(item).forEach((key) => {
          if (fieldsToPreserve.includes(key)) {
            newItem[key] = item[key]; // 유지할 필드는 그대로
          } else {
            newItem[key] = ""; // 나머지는 빈 값으로 초기화
          }
        });
        return newItem;
      });
      return acc;
    }, {} as FormValues);

    reset(resetData); // reset 함수 호출
  }, [reset, getValues, activeTab, onResetState]);

  const onResetInput = () => {
    setOnResetState(!onResetState);
    toast({
      description: "입력값이 모두 삭제 되었습니다.",
      status: "info",
      isClosable: false,
      duration: 1500,
      position: "top",
    });
  };

  const onBookcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBookcodeValue(value);
    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) => setValue(`${typeKey}.${i}.book_code`, value));
    });
  };

  const onSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSeriesValue(value);

    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) => setValue(`${typeKey}.${i}.series`, value));
    });
  };

  const onEpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEpsodeValue(value);

    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) => setValue(`${typeKey}.${i}.episode`, value));
    });
  };

  const onEpiNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEpisodeNumValue(value);

    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) =>
        setValue(`${typeKey}.${i}.episode_order`, value)
      );
    });
  };

  const onSetValue = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value;
    setValue(name, value as any);
  };

  const toggleHiddenField = (field: string) => {
    setHiddenFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const toast = useToast();

  const onChangeTab = (idx: number) => {
    if (idx === activeTab) return;
    const tab = document.querySelector(`.tab-${idx}`) as HTMLElement;
    const allInputs = document
      .querySelectorAll(`.tab-table-box`)
      [activeTab].querySelectorAll("input");
    let isValue = false;
    for (let i = 0; i < allInputs.length; i++) {
      if (!allInputs[i].hasAttribute("readOnly") && allInputs[i].value !== "") {
        isValue = true;
        break;
      }
    }
    if (isValue) {
      const moveConfirm = confirm(
        "입력중인 항목이 있습니다.\n난이도를 변경하면 입력한 값이 모두 초기화 됩니다.\n이동 하시겠습니까?"
      );
      if (moveConfirm) {
        tab.click();
      }
    } else {
      tab.click();
    }
  };

  const onEmptyCheck = () => {
    const allInputs = document
      .querySelectorAll(`.tab-table-box`)
      [activeTab].querySelectorAll("input");
    let empty;
    for (let i = 0; i < allInputs.length; i++) {
      if (allInputs[i].value === "") {
        empty = allInputs[i];
        break;
      }
    }
    if (empty) {
      toast({
        description: "빈 항목이 있습니다.",
        status: "error",
        duration: 1500,
        isClosable: false,
        position: "top",
      });
      empty.focus();
    }
    return empty;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // 빈값 체크
    if (emptyCheckState) {
      const emptyCheck = onEmptyCheck();
      if (emptyCheck) return;
    }

    const groupKeys = Object.keys(typeGroups);
    const activeGroup = groupKeys[activeTab]; // 현재 활성화된 그룹의 키를 가져옴
    const activeTypes = typeGroups[activeGroup];

    let stopState = "";
    const toastList = {
      b14: "B안-유형14의 문항수는 5개여야 합니다.",
      c14: "C안-유형14의 문항수는 8개여야 입니다.",
    };

    for (const key in data) {
      const objArr = data[key];
      const activeArr = objArr.filter((el) => activeTypes.includes(el.type));
      if (activeArr.length > 0) {
        activeArr.forEach((el) => {
          if (el.type === 3 && el.options !== "") {
            el.options = convertType3Options(el.options as string);
          }
          if (el.type === 14) {
            const optionLength = (el.options as string).split("/").length;
            if (activeTab === 1 && optionLength !== 5) {
              stopState = "b14";
              return;
            }
            if (activeTab === 2 && optionLength !== 8) {
              stopState = "c14";
              return;
            }
          }
        });
      }
    }

    if (stopState) {
      toast({
        description: `${toastList[stopState]}`,
        status: "info",
        isClosable: false,
        duration: 1500,
        position: "top",
      });
      return;
    }

    for (const key in data) {
      const objArr = data[key];
      const activeArr = objArr.filter((el) => activeTypes.includes(el.type));
      if (activeArr.length > 0) {
        activeArr.forEach((el) => {
          //문제 개별 행
          for (const key in el) {
            if (typeof el[key] === "string") {
              el[key] =
                el[key].indexOf("/") > -1 && el[key].indexOf("[") === -1
                  ? `[${el[key]}]`
                  : el[key];
            }
            if (key === "difficulty") {
              el[key] = activeTabDifficulty[activeTab];
            }
          }
        });
      }
    }

    const combinedData = typeGroups[
      activeGroup as keyof typeof typeGroups
    ].flatMap((typeIndex) => {
      const filterData = data[`type${typeIndex}`].filter(
        (el) => el.options || el.answer
      );
      return filterData.map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          newItem[headerMap[key].excelHeader] = item[key];
        });
        return newItem;
      });
    });

    const ttsArr = convertAudioData(combinedData);

    convertTextToSpeech(ttsArr, voice, ttsRate).then((res) => console.log(res));
    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ActiveTabData");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const onAutoFill = (typeKey: string, header: string) => {
    const typeIndex = typeKey.replace("type", "");
    const firstValue = getValues(`${typeKey}.0.${header}`) as string;

    if (firstValue === "") {
      toast({
        description: "첫번째 항목이 비어있습니다",
        status: "info",
        duration: 1500,
        isClosable: false,
        position: "top",
      });
      return;
    }

    const matches = firstValue.match(/(.*?)(\d+)(\.\w+)$/); // 숫자로 끝나는 경우 찾기

    if (!matches) {
      toast({
        description:
          "이름 끝에 숫자와 올바른 확장자가 필요 합니다.(ex: sample_1.png)",
        status: "info",
        duration: 2500,
        isClosable: false,
        position: "top",
      });
      return;
    }
    fieldArrays.forEach(({ fields }, index) => {
      const [_, prefix, num, ext] = matches;
      const startNum = parseInt(num, 10);

      fields.forEach((el: any, index) => {
        if (el.type === Number(typeIndex) && index > 0) {
          const newValue = `${prefix}${startNum + index}${ext}`;
          setValue(`${typeKey}.${index}.${header}`, newValue);
          const input = document.querySelector(
            `input[name='${typeKey}.${index}.${header}']`
          ) as HTMLInputElement;
          if (!input) return;
          input.value = newValue;
        }
      });
    });
  };

  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 0) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    });
  }, []);

  const onMoveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookCodeSearch, setBookCodeSearch] = useState<string>("");
  const [searchBookCodeList, setSearchBookCodeList] = useState<any[]>();

  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      axios
        .post(`https://admin.onebook-test.com/v1/book/episode/search`, {
          title: bookCodeSearch,
        })
        .then((res) => {
          if (res && res.data) {
            setSearchBookCodeList(res.data.items);
          }
        });
    }, 400);
    return () => clearTimeout(delayDebounceTimer);
  }, [bookCodeSearch]);
  const handleInputChange = (event) => {
    setBookCodeSearch(event.target.value);
  };
  const onBookCodeModal = () => {
    setBookCodeSearch("");
    setSearchBookCodeList([]);
    onOpen();
  };

  const closeBookCodeModal = () => {
    setBookCodeSearch("");
    setSearchBookCodeList([]);
    onClose();
  };
  const onSearchBookCodeChange = (value: any) => {
    setBookcodeValue(value);
    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) => setValue(`${typeKey}.${i}.book_code`, value));
    });
    closeBookCodeModal();
  };

  //추출페이지 타입
  const [pageType, setPageType] = useState(1);
  const onTypeChange = (num: number) => {
    setPageType(num);
  };

  //tts 속도조절
  const [ttsRate, setTtsRate] = useState<number>(1);
  const onChangeTtsRate = (e) => {
    setTtsRate(e.target.value);
  };
  const onInitRate = () => {
    setTtsRate(1);
  };

  return (
    <WrapperStyle>
      <Flex justifyContent={"center"} gap={2} padding={3}>
        <Button
          colorScheme={pageType === 1 ? "green" : "gray"}
          onClick={() => onTypeChange(1)}
        >
          문제 추출
        </Button>
        <Button
          colorScheme={pageType === 2 ? "green" : "gray"}
          onClick={() => onTypeChange(2)}
        >
          단어 추출
        </Button>
      </Flex>
      {pageType === 1 ? (
        <Box className="container" width="100%" margin="0 auto">
          <Flex className="view-header" gap={"1rem"}>
            <Flex alignItems={"center"}>
              <Text fontSize={"md"} fontWeight={"600"}>
                보이는 항목
              </Text>
            </Flex>
            {Object.keys(headerMap).map((header) => (
              <Checkbox
                colorScheme="green"
                key={header}
                isChecked={!hiddenFields.includes(header)}
                onChange={() => toggleHiddenField(header)}
              >
                {headerMap[header].label}
              </Checkbox>
            ))}
          </Flex>
          <div className="content-box">
            <TabMenuStyle>
              <li>
                <button
                  onClick={() => onChangeTab(0)}
                  className={activeTab === 0 ? "on" : ""}
                >
                  <CgFileDocument />
                  A난이도(non-fiction)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab(1)}
                  className={activeTab === 1 ? "on" : ""}
                >
                  <CgFileDocument />
                  B난이도
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab(2)}
                  className={activeTab === 2 ? "on" : ""}
                >
                  <CgFileDocument />
                  C난이도
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab(3)}
                  className={activeTab === 3 ? "on" : ""}
                >
                  <CgFileDocument />
                  A난이도(fiction)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab(4)}
                  className={activeTab === 4 ? "on" : ""}
                >
                  <CgFileDocument />
                  B난이도(fiction)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab(5)}
                  className={activeTab === 5 ? "on" : ""}
                >
                  <CgFileDocument />
                  C난이도(fiction)
                </button>
              </li>
            </TabMenuStyle>
            <Tabs
              variant="solid-rounded"
              size={"lg"}
              colorScheme="green"
              onChange={(index) => {
                setActiveTab(index);
              }}
            >
              {/* 활성화된 탭 추적 */}
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <TabList className="tab-menu-list">
                  <Tab className="tab-0" px={"2rem"}>
                    <CgFileDocument />
                    A난이도(non-fiction)
                  </Tab>
                  <Tab className="tab-1" px={"2rem"}>
                    <CgFileDocument />
                    B난이도
                  </Tab>
                  <Tab className="tab-2" px={"2rem"}>
                    <CgFileDocument />
                    C난이도(non-fiction)
                  </Tab>
                  <Tab className="tab-3" px={"1.5rem"}>
                    <CgFileDocument />
                    A난이도(fiction)
                  </Tab>
                  <Tab className="tab-4" px={"1.5rem"}>
                    <CgFileDocument />
                    B난이도(fiction)
                  </Tab>
                  <Tab className="tab-5" px={"1.5rem"}>
                    <CgFileDocument />
                    C난이도(fiction)
                  </Tab>
                </TabList>
              </Flex>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit)(e);
                }}
              >
                <Flex flexDirection={"column"} alignItems={"center"}>
                  <div className="excel-btn-box">
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Switch
                        onChange={onChangeEmptyCheck}
                        checked={emptyCheckState}
                        defaultChecked
                        colorScheme="green"
                        size="lg"
                      />
                      <Text fontSize={"12px"}>빈값체크</Text>
                    </Flex>
                    <Button
                      className="btn-exit"
                      colorScheme="green"
                      type="submit"
                    >
                      <SiMicrosoftexcel /> Export to Excel
                    </Button>
                    <Button
                      className="btn-delete"
                      colorScheme="red"
                      onClick={onResetInput}
                    >
                      <MdOutlineDelete />
                    </Button>
                  </div>
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
                    <IoMdRefresh
                      onClick={onInitRate}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Flex>
              </form>
              <ul className="top-info">
                <li>- 여러문항은 / 로 구분하여 작성</li>
                <li>- 빈칸으로 표시될 부분은 @_ 로 작성 (유형 7,14)</li>
                <li>
                  - ctrl + 방향키로 인풋커서 이동 / ctrl + enter키로 다음행 이동
                </li>
              </ul>
              <Modal isCentered isOpen={isOpen} onClose={closeBookCodeModal}>
                <ModalOverlay onClick={closeBookCodeModal} />
                <ModalContent>
                  <ModalBody padding={"2rem 2rem 1rem 2rem"}>
                    <Input
                      placeholder="책 이름을 입력해 주세요"
                      value={bookCodeSearch}
                      onChange={handleInputChange}
                    />
                    <BookCodeSearchListStyle>
                      {searchBookCodeList &&
                        searchBookCodeList.map((el, idx) => {
                          const toLowTitle = el.title.toLowerCase();
                          const toLowSearch = bookCodeSearch.toLowerCase();
                          const splitTitle = el.title
                            ? toLowTitle.split(toLowSearch)
                            : "";
                          if (!splitTitle) return;
                          return (
                            <li key={idx}>
                              <span>
                                {splitTitle[0]}
                                <span className="search-text">
                                  {bookCodeSearch}
                                </span>
                                {splitTitle[1]}
                              </span>
                              <div className="code-box">
                                <span>{el.book_code}</span>
                                <Button
                                  variant="outline"
                                  colorScheme={"green"}
                                  onClick={() =>
                                    onSearchBookCodeChange(el.book_code)
                                  }
                                  size={"sm"}
                                >
                                  선택
                                </Button>
                              </div>
                            </li>
                          );
                        })}
                    </BookCodeSearchListStyle>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <TabPanels>
                {Object.keys(typeGroups).map((groupKey) => (
                  <TabPanel key={groupKey} className="tab-table-box">
                    <Flex gap={2} mb={5}>
                      <Input
                        placeholder="북코드"
                        readOnly
                        width={100}
                        value={bookcodeValue}
                        onClick={onBookCodeModal}
                      />
                      <Button
                        colorScheme={"green"}
                        onClick={onBookCodeModal}
                        fontSize={"sm"}
                      >
                        북코드 검색
                        <IoSearch
                          style={{ marginLeft: "4px", fontSize: "1.2rem" }}
                        />
                      </Button>
                      <Input
                        width={300}
                        placeholder={"원서 시리즈"}
                        onChange={onSeriesChange}
                      />
                      <Input
                        width={300}
                        placeholder={"원서 에피소드"}
                        onChange={onEpiChange}
                      />
                      <Input
                        width={150}
                        placeholder={"에피소드 순서"}
                        onChange={onEpiNumChange}
                      />
                    </Flex>
                    {typeGroups[groupKey as keyof typeof typeGroups].map(
                      (typeIndex) => (
                        <Box mb={6} key={`type${typeIndex}`}>
                          <DataList
                            activeTab={activeTab}
                            fields={fieldArrays[typeIndex - 1].fields}
                            register={register}
                            seriesValue={seriesValue}
                            onBookcodeChange={onBookcodeChange}
                            onSeriesChange={onSeriesChange}
                            onEpiChange={onEpiChange}
                            onEpiNumChange={onEpiNumChange}
                            onSetValue={onSetValue}
                            typeKey={`type${typeIndex}`}
                            hiddenFields={hiddenFields}
                            columnWidths={columnWidths}
                            onAutoFill={onAutoFill}
                          />
                        </Box>
                      )
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <div className="excel-btn-box">
              <Button className="btn-exit" colorScheme="green" type="submit">
                <SiMicrosoftexcel /> Export to Excel
              </Button>
              <Button
                className="btn-delete"
                colorScheme="red"
                onClick={onResetInput}
              >
                <MdOutlineDelete />
              </Button>
            </div>
          </form>
          {scrollTopVisible && (
            <Button onClick={onMoveTop} className="btn-top-move" size={"lg"}>
              <GoMoveToTop />
            </Button>
          )}
        </Box>
      ) : (
        <>
          <WordExport />
        </>
      )}
      <div className="footer">
        <MdCopyright />
        2024 sooya_dev All rights reserved.
      </div>
    </WrapperStyle>
  );
};
