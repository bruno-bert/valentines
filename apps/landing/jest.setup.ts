import "@testing-library/jest-dom";

HTMLMediaElement.prototype.play = jest.fn(
  () => new Promise<void>(() => undefined)
);
