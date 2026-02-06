export function joinClasses(classes: (string | false | undefined | null)[]) {
  return classes
    .filter((c) => ![false, null, undefined].includes(c as false))
    .join(" ");
}
