import type { RegionMaping } from "../types/region-maping";

export function drawRegion<T extends Element>(element: T): RegionMaping {
  const regions = [
    ...element.querySelectorAll("main, header, section, article"),
  ].filter(
    (region) =>
      region.parentElement!.closest("main, header, section, article") ===
      element,
  );

  const headings = [...element.querySelectorAll("h1, h2, h3, h4, h5, h6")]
    .filter(
      (heading) =>
        heading.closest("main, header, section, article") === element,
    )
    .map((heading) => heading.tagName)
    .sort();

  const region = { tagName: element.tagName, headings, children: [] };

  if (regions.length === 0) {
    return region;
  }
  return {
    ...region,
    children: regions.map((region) => drawRegion(region)),
  };
}
