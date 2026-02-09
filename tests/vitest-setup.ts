import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  vi.resetAllMocks();
});

beforeAll(() => {
  HTMLDialogElement.prototype.show = function () {
    this.setAttribute("open", "true");
  };
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "true");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
