import { describe, expect, it } from "vitest";
import { parseArguments } from "./main";

describe("parseArguments", () => {
  const testCases = [
    {
      input: "key1=value1",
      expected: { key1: "value1" },
    },
    {
      input: "key1=value1\nkey2=value2",
      expected: { key1: "value1", key2: "value2" },
    },
    {
      input: "key1=value1\nkey2=value2\nkey3=value",
      expected: { key1: "value1", key2: "value2", key3: "value" },
    },
    {
      input: "",
      expected: {},
    },
  ];

  for (const { input, expected } of testCases) {
    it(`input: ${input}, expected: ${JSON.stringify(expected)}`, () => {
      expect(parseArguments(input)).toEqual(expected);
    });
  }
});
