import { default as AdvancedIcon } from "@/assets/images/icon-advanced.svg";
import { default as ArcadeIcon } from "@/assets/images/icon-arcade.svg";
import { default as ProIcon } from "@/assets/images/icon-pro.svg";
import { SROnly } from "@/shared/components/SROnly";

export const PlanOptions = () => {
  const options = [
    {
      name: "arcade",
      price: 18,
      discount: "2 months free",
      icon: ArcadeIcon,
    },
    {
      name: "advanced",
      price: 12,
      discount: "2 months free",
      icon: AdvancedIcon,
    },
    {
      name: "pro",
      price: 15,
      discount: "2 months free",
      icon: ProIcon,
    },
  ];
  return (
    <fieldset className="grid gap-4">
      <legend className="sr-only">Plan Options</legend>
      {options.map(({ name, price, discount, icon }) => (
        <label
          className="flex gap-4 capitalize items-start p-4 outline rounded-lg out-grey-500 cursor-pointer"
          key={name}
        >
          <input className="sr-only" type="radio" name="plan" value={name} />
          <img src={icon} alt="" />
          <span className="grid">
            <span className="text-xl font-medium">{name}</span>{" "}
            <SROnly>plan</SROnly>
            <span className="c-grey-500">{price}/mo</span>
            {discount && <span>{discount} </span>}
          </span>
        </label>
      ))}
    </fieldset>
  );
};
