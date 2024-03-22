import DOMPurify from "dompurify";

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const escapedNewLineToLineBreakTag = (string?: string): string[] => {
  return string?.split("\n").map((item, index) => {
    return (index === 0) ? item : `<br/>${item}`;
  }) ?? [];
};
export const sanitizeHTML = (content: string) => () => ({
  __html: DOMPurify.sanitize(
    escapedNewLineToLineBreakTag(content).join(""))
});