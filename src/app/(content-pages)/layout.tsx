import {ReactNode} from "react";

const ContentPagesLayout = (
  {
    children,
  }: {
    children: ReactNode
  }) => {
  return (
    <div className={"w-4/5 mx-auto"}>
      {children}
    </div>
  );
};
export default ContentPagesLayout;