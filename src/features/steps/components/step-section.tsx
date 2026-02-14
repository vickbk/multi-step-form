import {
  Header,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { joinClasses } from "@/shared/libs";

export const StepSection = ({
  header: { title, description },
  children,
}: {
  header: Record<"title" | "description", string>;
  children: React.ReactNode;
}) => {
  return (
    <fieldset className={joinClasses(["grid gap-4"])}>
      <legend className="mb-4">
        <Header>
          <Heading className="text-4xl font-bold">{title}</Heading>
          <p className="text-xl c-grey-500 mt-4">{description}</p>
        </Header>
      </legend>
      {children}
    </fieldset>
  );
};
