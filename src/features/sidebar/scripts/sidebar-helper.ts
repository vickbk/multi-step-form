export function saveAndGoTo(e: React.MouseEvent<HTMLButtonElement>) {
  const target = e.target as HTMLElement;
  const button = target.closest("button");
  button?.setAttribute("type", "submit");
  target.closest("form")?.requestSubmit(button ?? undefined);
  button?.setAttribute("type", "button");
}
