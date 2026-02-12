import { SROnly } from "@/shared/components/SROnly";

export const NavigationBar = () => {
  return (
    <div className="mt-auto flex p-4 justify-between white">
      <button className="c-grey-500 font-semibold" type="button">
        Go Back <SROnly>to the previous step</SROnly>
      </button>
      <button
        className="p-4 px-6 rounded-md blue-950 c-background font-semibold text-xl"
        type="button"
      >
        Next Step
      </button>
      <button
        className="p-4 px-6 rounded-md purple-600 c-background text-xl hidden"
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};
