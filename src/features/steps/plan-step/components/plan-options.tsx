export const PlanOptions = () => {
  return (
    <fieldset>
      <legend className="sr-only">Options</legend>
      <label>
        <input type="radio" name="plan" value="arcade" />
        Arcade
        <span>18/mo</span>
        <span>save 10%</span>
      </label>
      <label>
        <input type="radio" name="plan" value="advanced" />
        Advanced
        <span>12/mo</span>
        <span>save 15%</span>
      </label>
      <label>
        <input type="radio" name="plan" value="pro" />
        Pro
        <span>15/mo</span>
        <span>save 20%</span>
      </label>
    </fieldset>
  );
};
