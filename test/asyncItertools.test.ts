import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { asyncInterleave } from "../source/index.ts";

describe("asyncIterools", () => {
  it("interleave should alternate two async iterables", async () => {
    const iter1 = (async function* () {
      yield 1;
      yield 2;
    })();

    const iter2 = (async function* () {
      yield 5;
    })();

    const result: number[] = [];
    for await (const value of asyncInterleave([iter1, iter2])) {
      result.push(value);
    }

    assert.deepEqual(result, [1, 5, 2]);
  });
});
