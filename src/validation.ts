export const emptyCheck = (obj: any) => {
  let check = false;
  for (const key in obj) {
    if (obj[key] === "") {
      check = true;
      return key;
    }
  }
  return check;
};

export const convertType3Options = (value: string) => {
  const imageFiles = value.split("/");
  const transformedFiles = imageFiles.map((file) => {
    const fileNameWithoutExt = file.split(".")[0];
    return `${fileNameWithoutExt}|${file}`;
  });
  return transformedFiles.join(" / ");
};
