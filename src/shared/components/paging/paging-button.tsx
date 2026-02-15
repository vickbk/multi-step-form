export const PagingButton = ({
  children,
  onClickFunction,
  isActive = false,
}: {
  children: React.ReactNode;
  onClickFunction: () => void;
  isActive?: boolean;
}) => {
  return (
    <li>
      <button
        className={`outstand outstand-button p-4 rounded-lg shadow-2xl ${
          isActive ? "scale-85 opacity-40" : ""
        }`}
        type="button"
        onClick={onClickFunction}
        disabled={isActive}
      >
        {children}
      </button>
    </li>
  );
};
