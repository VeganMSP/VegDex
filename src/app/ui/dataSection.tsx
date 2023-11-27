import {ReactNode} from "react";

export const DataSection = (props: { isLoading: boolean, sectionTitle: string, children: ReactNode }) => {
  const {isLoading, sectionTitle, children} = props;
  return (
    <div>
      <h2 className={"text-3xl"}>{sectionTitle}</h2>
      {isLoading ? <p><em>Loading...</em></p> : <>
        {children}
      </>}
    </div>
  );
};