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
import { Cell, Header, Row, Table } from "./style";
import { initialColumnWidths, typeGroups } from "./constant";

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
  onAutoFill: (header: string) => void;
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
                {autoableHeader.includes(header) && (
                  <Button
                    onClick={() => onAutoFill(header)}
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
  const { register, control, handleSubmit, setValue, reset, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const fieldArrays = useFieldArrays(control);
  const [seriesValue, setSeriesValue] = useState("");
  const [epsodeValue, setEpsodeValue] = useState("");
  const [episodeNumValue, setEpisodeNumValue] = useState("");
  const [hiddenFields, setHiddenFields] = useState<string[]>([
    "step",
    "difficulty",
  ]);
  const [activeTab, setActiveTab] = useState(0); // 활성화된 탭을 추적하는 상태
  const [columnWidths] = useState(initialColumnWidths);

  useEffect(() => {
    console.log("reset");
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
  }, [reset, getValues, activeTab]);

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
    console.log(e);
    const value = e.target.value;
    setValue(name, value);
  };

  const toggleHiddenField = (field: string) => {
    setHiddenFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const groupKeys = Object.keys(typeGroups);
    const activeGroup = groupKeys[activeTab]; // 현재 활성화된 그룹의 키를 가져옴

    // // 빈값이 있는지 확인하는 로직 추가
    // const hasEmptyValues = typeGroups[
    //   activeGroup as keyof typeof typeGroups
    // ].some((typeIndex) =>
    //   data[`type${typeIndex}`].some((item) => {
    //     return Object.values(item).some((val) => {
    //       return val === "";
    //     });
    //   })
    // );

    // // 빈값이 있는 경우 경고창을 띄우고 함수 종료
    // if (hasEmptyValues) {
    //   toast({
    //     description: "빈 입력값이 있습니다. 모든 값을 입력해주세요.",
    //     status: "error",
    //     duration: 1500,
    //     isClosable: false,
    //     position: "top",
    //   });
    //   return;
    // }

    // 빈값이 없는 경우에만 엑셀 추출 진행
    const combinedData = typeGroups[
      activeGroup as keyof typeof typeGroups
    ].flatMap((typeIndex) =>
      data[`type${typeIndex}`].map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          newItem[headerMap[key].label] = item[key];
        });
        return newItem;
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ActiveTabData");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const onAutoFill = (header: string) => {
    console.log(getValues());
    return;
    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;

      // 첫 번째 값 가져오기
      const firstValue = getValues(`${typeKey}.0.${header}`);

      if (!firstValue) return; // 첫 번째 값이 없으면 종료

      const matches = firstValue.match(/(.*?)(\d+)(\.\w+)$/); // 숫자로 끝나는 경우 찾기
      if (matches) {
        const [_, prefix, num, ext] = matches;
        const startNum = parseInt(num, 10);

        fields.forEach((_, index) => {
          const newValue = `${prefix}${startNum + index}${ext}`;
          setValue(`${typeKey}.0.${header}`, newValue);
        });
      } else {
        console.error(
          "The format of the first value is not suitable for auto-fill"
        );
      }
    });
  };

  return (
    <Box width="100%" margin="0 auto">
      <Flex gap={"1rem"} mb={10} padding={"1rem"}>
        {Object.keys(headerMap).map((header) => (
          <Checkbox
            key={header}
            isChecked={!hiddenFields.includes(header)}
            onChange={() => toggleHiddenField(header)}
          >
            {headerMap[header].label}
          </Checkbox>
        ))}
      </Flex>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        onChange={(index) => setActiveTab(index)}
      >
        {" "}
        {/* 활성화된 탭 추적 */}
        <TabList style={{ gap: "1rem", paddingLeft: "1.5rem" }}>
          <Tab width={70}>A</Tab>
          <Tab width={70}>B</Tab>
          <Tab width={70}>C</Tab>
          <Tab width={70}>A-1</Tab>
        </TabList>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justifyContent={"center"} mb={10}>
            <Button
              style={{ width: "300px", height: "50px" }}
              colorScheme="green"
              type="submit"
            >
              Excel 추출
            </Button>
          </Flex>
        </form>
        <TabPanels>
          {Object.keys(typeGroups).map((groupKey) => (
            <TabPanel key={groupKey}>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent={"center"} mb={10}>
          <Button
            style={{ width: "300px", height: "50px" }}
            colorScheme="green"
            type="submit"
          >
            Excel 추출
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
