import { default as thanksImage } from "@/assets/images/icon-thank-you.svg";
import { SROnly } from "@/shared/components/SROnly";
import { Heading } from "@/shared/heading-manager/components/heading-managers";

export const FinalStep = ({ show = false }: { show: boolean }) => {
  return (
    <article className={!show ? "hidden" : ""}>
      <img src={thanksImage} alt="" />
      <Heading>
        Thank you <SROnly>for your subscription</SROnly>
      </Heading>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
      <button type="button">Subscribe another account</button>
    </article>
  );
};
