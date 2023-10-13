import { extractErrorMessage } from "../../src/utils/extractErrorMessage";

describe("extractErrorMessage", () => {
  it("should return the error message when passed an Error object", () => {
    const error = new Error("This is an error message");
    expect(extractErrorMessage(error)).toBe("This is an error message");
  });

  it("should return the string itself when passed a string", () => {
    const error = "This is just a string";
    expect(extractErrorMessage(error)).toBe(error);
  });

  it("should convert other types to a string", () => {
    const error = 123; // A number
    expect(extractErrorMessage(error)).toBe("123");
  });

  it("should handle undefined gracefully", () => {
    const error = undefined;
    expect(extractErrorMessage(error)).toBe("undefined");
  });

  it("should handle null gracefully", () => {
    const error = null;
    expect(extractErrorMessage(error)).toBe("null");
  });

  it("should handle custom error objects", () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = "CustomError";
      }
    }

    const error = new CustomError("Custom error message");
    expect(extractErrorMessage(error)).toBe("Custom error message");
  });
});
