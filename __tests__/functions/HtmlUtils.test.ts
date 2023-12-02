import {escapedNewLineToLineBreakTag} from "@/functions/HtmlUtils";

test("escapedNewLineToLineBreakTag", () => {
  const input = "a\nb\nc";
  const expected = ["a", "<br/>b", "<br/>c"];
  expect(escapedNewLineToLineBreakTag(input)).toEqual(expected);
});