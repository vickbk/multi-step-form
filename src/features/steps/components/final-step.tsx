import { default as thanksImage } from "@/assets/images/icon-thank-you.svg";
import { SROnly } from "@/shared/components/SROnly";
import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";

export const FinalStep = () => {
  return (
    <Article className="grid items-center gap-4 text-center c-grey-500 py-8 justify-items-center font-medium">
      <img src={thanksImage} alt="" />
      <Heading className="c-blue-950 font-bold text-4xl">
        Thank you<SROnly> for your subscription</SROnly>!
      </Heading>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
      <button
        type="button"
        className="blue-950 p-4 rounded-lg c-background text-lg mt-8"
      >
        Subscribe another account
      </button>
    </Article>
  );
};
