import { Heading, Main, Section } from "./heading-managers";

export const TestDrawer = () => {
  return (
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
    </Main>
  );
};
