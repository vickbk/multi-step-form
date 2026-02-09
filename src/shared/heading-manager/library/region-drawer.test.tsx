import { render, screen } from "@testing-library/react";
import { Heading, Main, Section } from "../components/heading-managers";
import { drawRegion } from "./region-drawer";

describe("Region Drawer", () => {
  test("should draw a component tree of all land marks whithin the component", async () => {
    render(
      <Main pageHasH1={false}>
        <Heading>Heading 1</Heading>
        <Section>
          <Heading>Heading 2</Heading>
          <Section>
            <Heading>Heading 3</Heading>
            <Section>
              <Heading>Heading 4</Heading>
            </Section>
          </Section>
        </Section>
      </Main>,
    );
    const main = await screen.findByRole("main");
    const regionMap = drawRegion(main);
    expect(regionMap).toEqual({
      tagName: "MAIN",
      headings: ["H1"],
      children: [
        {
          tagName: "SECTION",
          headings: ["H2"],
          children: [
            {
              tagName: "SECTION",
              headings: ["H3"],
              children: [
                {
                  tagName: "SECTION",
                  headings: ["H4"],
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
