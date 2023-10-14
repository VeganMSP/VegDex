export const escapedNewLineToLineBreakTag = (string: string) => {
  return string.split("\n").map((item, index) => {
    return (index === 0) ? item : `<br/>${item}`;
  });
};