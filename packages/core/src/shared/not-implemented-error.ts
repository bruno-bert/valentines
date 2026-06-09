export class NotImplementedError extends Error {
  constructor(boundary: string) {
    super(`${boundary} is not implemented yet`);
    this.name = "NotImplementedError";
  }
}
