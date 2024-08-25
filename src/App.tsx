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
import { Cell, Header, Row, Table, WrapperStyle } from "./style";
import { initialColumnWidths, typeGroups } from "./constant";
import { FiInfo } from "react-icons/fi";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdCopyright, MdOutlineDelete } from "react-icons/md";
import { convertType3Options } from "./validation";

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
  fields: any[];
  register: any;
  seriesValue: string;
  onSeriesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEpiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEpiNumChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetValue: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  typeKey: string;
  hiddenFields: string[];
  columnWidths: { [key: string]: number };
  onAutoFill: (typeKey: string, header: string) => void;
}> = ({
  fields,
  register,
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

  const readOnlyList = ["type", "difficulty", "step", "order"];

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
            field.type === 1 && field.difficulty === "a" && field.order > 4
              ? true
              : field.type === 9 && field.difficulty === "a" && field.order > 4
              ? true
              : field.type === 12 && field.difficulty === "b" && field.order > 5
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
                      header === "series"
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
                      자동
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

  const fieldArrays = useFieldArrays(control);
  const [seriesValue, setSeriesValue] = useState("");
  const [epsodeValue, setEpsodeValue] = useState("");
  const [episodeNumValue, setEpisodeNumValue] = useState("");
  const [hiddenFields, setHiddenFields] = useState<string[]>([
    "step",
    "difficulty",
    "order",
  ]);
  const [activeTab, setActiveTab] = useState(0); // 활성화된 탭을 추적하는 상태
  const [pendingTab, setPendingTab] = useState<number>(0); // 이동을 원하는 탭을 추적하는 상태
  const [columnWidths] = useState(initialColumnWidths);
  const [onResetState, setOnResetState] = useState(false);

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
      return;
    }
    return empty;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // 빈값 체크
    const emptyCheck = onEmptyCheck();
    if (emptyCheck) return;

    const groupKeys = Object.keys(typeGroups);
    const activeGroup = groupKeys[activeTab]; // 현재 활성화된 그룹의 키를 가져옴
    const activeTypes = typeGroups[activeGroup];

    for (const key in data) {
      const objArr = data[key];
      const activeArr = objArr.filter((el) => activeTypes.includes(el.type));
      if (activeArr.length > 0) {
        activeArr.forEach((el) => {
          if (el.type === 3 && el.options !== "") {
            el.options = convertType3Options(el.options as string);
          }
          //문제 개별 행
          for (const key in el) {
            if (typeof el[key] === "string") {
              el[key] =
                el[key].indexOf("/") > -1 && el[key].indexOf("[") === -1
                  ? `[${el[key]}]`
                  : el[key];
            }
          }
        });
      }
    }

    const combinedData = typeGroups[
      activeGroup as keyof typeof typeGroups
    ].flatMap((typeIndex) =>
      data[`type${typeIndex}`].map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          newItem[headerMap[key].excelHeader] = item[key];
        });
        return newItem;
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ActiveTabData");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const onForceSumbit = () => {
    const data = getValues();

    const groupKeys = Object.keys(typeGroups);
    const activeGroup = groupKeys[activeTab]; // 현재 활성화된 그룹의 키를 가져옴
    const activeTypes = typeGroups[activeGroup];

    for (const key in data) {
      const objArr = data[key];
      const activeArr = objArr.filter((el) => activeTypes.includes(el.type));
      if (activeArr.length > 0) {
        activeArr.forEach((el) => {
          if (el.type === 3 && el.options !== "") {
            el.options = convertType3Options(el.options as string);
          }
          //문제 개별 행
          for (const key in el) {
            if (typeof el[key] === "string") {
              el[key] =
                el[key].indexOf("/") > -1 && el[key].indexOf("[") === -1
                  ? `[${el[key]}]`
                  : el[key];
            }
          }
        });
      }
    }

    const combinedData = typeGroups[
      activeGroup as keyof typeof typeGroups
    ].flatMap((typeIndex) =>
      data[`type${typeIndex}`].map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          newItem[headerMap[key].excelHeader] = item[key];
        });
        return newItem;
      })
    );

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
          input.value = newValue;
        }
      });
    });
  };

  return (
    <WrapperStyle>
      <Box className="container" width="100%" margin="0 auto">
        <Flex className="view-header" gap={"1rem"}>
          <Flex alignItems={"center"}>
            <Text fontSize={"md"} fontWeight={"600"}>
              보이는 항목
            </Text>
            <Text fontSize={"sm"}>(엑셀추출과는 무관)</Text>
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
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            onChange={(index) => {
              setActiveTab(index);
            }}
          >
            {/* 활성화된 탭 추적 */}
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <TabList style={{ gap: "1rem" }}>
                <Tab px={"1.5rem"}>A안(non-fiction)</Tab>
                <Tab px={"1.5rem"}>B안</Tab>
                <Tab px={"1.5rem"}>C안</Tab>
                <Tab
                  onClick={() => setPendingTab(3)}
                  className="tab-3"
                  px={"1.5rem"}
                >
                  A안(fiction)
                </Tab>
              </TabList>
              <Button
                onClick={onForceSumbit}
                size={"sm"}
                colorScheme="gray"
                type="submit"
              >
                테스트용 Excel 강제 추출
              </Button>
            </Flex>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
            >
              <div className="excel-btn-box">
                <Button className="btn-exit" colorScheme="green" type="submit">
                  <SiMicrosoftexcel /> Excel 추출
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
            <ul className="top-info">
              <li>- 여러문항은 / 로 구분하여 작성</li>
              <li>- 빈칸 부분은 @_ 로 작성</li>
              <li>
                - ctrl + 방향키로 인풋커서 이동 / ctrl + enter키로 다음행 이동
              </li>
            </ul>
            <TabPanels>
              {Object.keys(typeGroups).map((groupKey) => (
                <TabPanel key={groupKey} className="tab-table-box">
                  {typeGroups[groupKey as keyof typeof typeGroups].map(
                    (typeIndex) => (
                      <Box mb={6} key={`type${typeIndex}`}>
                        <DataList
                          fields={fieldArrays[typeIndex - 1].fields}
                          register={register}
                          seriesValue={seriesValue}
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
              <SiMicrosoftexcel /> Excel 추출
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
      </Box>
      <div className="footer">
        <MdCopyright />
        2024 sooya_dev All rights reserved.
      </div>
    </WrapperStyle>
  );
};
