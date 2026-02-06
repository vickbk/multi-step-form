import { CustomDetails } from "@/components/CustomDetails";
import { SROnly } from "@/components/SROnly";
import { PagingButton } from "./paging-button";

export const PagingGapHolding = ({
  start,
  end,
  updateFunction,
}: {
  start: number;
  end: number;
  updateFunction: (key: number) => void;
}) => {
  const count = end - start;
  return (
    count > 0 && (
      <li>
        <CustomDetails className="paging-suspense">
          <summary className="outstand-button paging-suspense__summary cursor-pointer p-2 rounded-lg">
            <SROnly>Show previous pages</SROnly>...
          </summary>
          <ol className="paging-suspense__container">
            {Array(count)
              .fill(null)
              .map((_, key) => (
                <PagingButton
                  key={key}
                  onClickFunction={() => updateFunction(key + start)}
                >
                  <SROnly>Go to page</SROnly> {key + start + 1}
                </PagingButton>
              ))}
          </ol>
        </CustomDetails>
      </li>
    )
  );
};
