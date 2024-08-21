import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  VStack,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ResizableBox } from "react-resizable";
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

type FormItem = {
  [key: string]: string | number;
};

type FormValues = {
  [key: string]: FormItem[];
};

const defaultValue: FormValues = {
  type1: [...defaultValuesType1],
  type2: [...defaultValuesType2],
  type3: [...defaultValuesType3],
  type4: [...defaultValuesType4],
  type5: [...defaultValuesType5],
  type6: [...defaultValuesType6],
  type7: [...defaultValuesType7],
  type8: [...defaultValuesType8],
  type9: [...defaultValuesType9],
  type10: [...defaultValuesType10],
  type11: [...defaultValuesType11],
  type12: [...defaultValuesType12],
  type13: [...defaultValuesType13],
  type14: [...defaultValuesType14],
  type15: [...defaultValuesType15],
};

// 컬럼 크기 상태를 초기화
const initialColumnWidths = {
  type: 50,
  series: 200,
  episode: 200,
  episode_order: 50,
  difficulty: 50,
  step: 50,
  order: 50,
  qeustion: 300,
  image: 200,
  q_sound: 150,
  q_options: 300,
  options: 300,
  o_sound: 150,
  mean: 100,
  hint: 200,
  answer: 150,
  sub_options: 300,
  sub_answer: 200,
};

const headerMap = {
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

const typeGroups = {
  A: [1, 2, 3, 4],
  B: [5, 6, 7, 8],
  C: [9, 10, 11, 12],
  D: [13, 14, 15],
};

const useFieldArrays = (control: any) => {
  return Array.from({ length: 15 }, (_, i) =>
    useFieldArray({ control, name: `type${i + 1}` })
  );
};

const DataTable: React.FC<{
  fields: any[];
  register: any;
  seriesValue: string;
  onSeriesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeKey: string;
  hiddenFields: string[];
  columnWidths: { [key: string]: number };
  setColumnWidth: (header: string, width: number) => void;
}> = ({
  fields,
  register,
  seriesValue,
  onSeriesChange,
  typeKey,
  hiddenFields,
  columnWidths,
  setColumnWidth,
}) => {
  const activeHeaders = Object.keys(headerMap).filter(
    (header) =>
      fields.some((field) => field[header] !== "") &&
      !hiddenFields.includes(header)
  );

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          {activeHeaders.map((header) => (
            <Th key={header} textAlign="left">
              <ResizableBox
                width={columnWidths[header]}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                minConstraints={[50, 20]}
                maxConstraints={[1000, 20]}
                onResize={(e, data) => {
                  setColumnWidth(header, data.size.width);
                }}
              >
                <div style={{ width: "100%", whiteSpace: "nowrap" }}>
                  {headerMap[header].label}
                </div>
              </ResizableBox>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {fields.map((field, index) => (
          <Tr key={field.id}>
            {activeHeaders.map((header) => (
              <Td
                key={header}
                width={`${columnWidths[header]}px`}
                textAlign="left"
              >
                <Input
                  {...register(`${typeKey}.${index}.${header}`)}
                  value={header === "series" ? seriesValue : undefined}
                  onChange={header === "series" ? onSeriesChange : undefined}
                  width={`${columnWidths[header]}px`} // 인풋의 크기 적용
                  textAlign="left"
                />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const App: React.FC = () => {
  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: defaultValue,
  });

  const fieldArrays = useFieldArrays(control);
  const [seriesValue, setSeriesValue] = useState("");
  const [hiddenFields, setHiddenFields] = useState<string[]>([
    "step",
    "difficulty",
  ]);
  const [columnWidths, setColumnWidths] = useState(initialColumnWidths);

  const onSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSeriesValue(value);

    fieldArrays.forEach(({ fields }, index) => {
      const typeKey = `type${index + 1}`;
      fields.forEach((_, i) => setValue(`${typeKey}.${i}.series`, value));
    });
  };

  const toggleHiddenField = (field: string) => {
    setHiddenFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const combinedData = Object.keys(data).flatMap((typeKey) =>
      data[typeKey].map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          if (!hiddenFields.includes(key)) {
            newItem[headerMap[key].label] = item[key];
          }
        });
        return newItem;
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CombinedData");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const setColumnWidth = (header: string, width: number) => {
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [header]: width,
    }));
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
      <Tabs>
        <TabList>
          <Tab>A</Tab>
          <Tab>B</Tab>
          <Tab>C</Tab>
          <Tab>D</Tab>
        </TabList>

        <TabPanels>
          {Object.keys(typeGroups).map((groupKey) => (
            <TabPanel key={groupKey}>
              {typeGroups[groupKey as keyof typeof typeGroups].map(
                (typeIndex) => (
                  <Box mb={6} key={`type${typeIndex}`}>
                    <DataTable
                      fields={fieldArrays[typeIndex - 1].fields}
                      register={register}
                      seriesValue={seriesValue}
                      onSeriesChange={onSeriesChange}
                      typeKey={`type${typeIndex}`}
                      hiddenFields={hiddenFields}
                      columnWidths={columnWidths}
                      setColumnWidth={setColumnWidth}
                    />
                  </Box>
                )
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button mt={4} colorScheme="blue" type="submit">
          제출
        </Button>
      </form>
    </Box>
  );
};
