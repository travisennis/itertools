import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as iter from "../source/itertools.ts";

describe("itertools", () => {
  it("isIterable", () => {
    assert.equal(iter.isIterable([1, 2, 3]), true);
    assert.equal(iter.isIterable("abcd"), true);
  });

  it("chain succeeds", () => {
    const testIter = iter.chain([1, 2, 3], [4, 5, 6]);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, 5);
    assert.equal(testIter.next().value, 6);
  });

  it("count succeeds with default args", () => {
    const testIter = iter.count();
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, 5);
  });

  it("count succeeds with given start and step", () => {
    const testIter = iter.count(1, 5);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 6);
    assert.equal(testIter.next().value, 11);
    assert.equal(testIter.next().value, 16);
    assert.equal(testIter.next().value, 21);
    assert.equal(testIter.next().value, 26);
  });

  it("cycle succeeds", () => {
    const testIter = iter.cycle([1, 2]);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
  });

  it("dropwhile succeeds", () => {
    const testIter = iter.dropwhile([7, -1, 0, 1], (i) => i > 0);
    assert.equal(testIter.next().value, -1);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
  });

  it("filter succeeds", () => {
    const testIter = iter.filter(iter.range(0, 10), (i) => i % 2 === 0);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, 6);
    assert.equal(testIter.next().value, 8);
    assert.equal(testIter.next().value, undefined);
  });

  it("filterfalse succeeds", () => {
    const testIter = iter.filterfalse(iter.range(0, 10), (i) => i % 2 === 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 5);
    assert.equal(testIter.next().value, 7);
    assert.equal(testIter.next().value, 9);
    assert.equal(testIter.next().value, undefined);
  });

  it("map succeeds", () => {
    const testIter = iter.map(iter.range(0, 5), (i) => i ** 2);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, 9);
    assert.equal(testIter.next().value, 16);
    assert.equal(testIter.next().value, undefined);
  });

  it("starmap succeeds", () => {
    const input = iter.zip(iter.range(0, 5), iter.range(6, 11));
    const testIter = iter.starmap(input, (x, y) => x + y);
    assert.equal(testIter.next().value, 6);
    assert.equal(testIter.next().value, 8);
    assert.equal(testIter.next().value, 10);
    assert.equal(testIter.next().value, 12);
    assert.equal(testIter.next().value, 14);
    assert.equal(testIter.next().value, undefined);
  });

  it("range succeeds", () => {
    const testIter = iter.range(0, 5);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("range succeeds in reverse", () => {
    const testIter = iter.range(5, 0, -1);
    assert.equal(testIter.next().value, 5);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);

    const testIter2 = iter.range(5, -1, -1);
    assert.equal(testIter2.next().value, 5);
    assert.equal(testIter2.next().value, 4);
    assert.equal(testIter2.next().value, 3);
    assert.equal(testIter2.next().value, 2);
    assert.equal(testIter2.next().value, 1);
    assert.equal(testIter2.next().value, 0);
    assert.equal(testIter2.next().value, undefined);
    assert.equal(testIter2.next().done, true);
  });

  it("range succeeds with one argument", () => {
    const testIter = iter.range(3);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("takewhile succeeds", () => {
    const testIter = iter.takewhile(iter.range(0, 10), (i) => i < 5);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, 4);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("slice succeeds", () => {
    const testIter = iter.slice(iter.range(0, 10), 2, 4);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("zip succeeds", () => {
    const testIter = iter.zip(iter.range(0, 5), iter.range(6, 11));
    assert.deepEqual(testIter.next().value, [0, 6]);
    assert.deepEqual(testIter.next().value, [1, 7]);
  });

  it("take succeeds", () => {
    const testIter = iter.take(iter.count(), 3);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("weave succeeds", () => {
    const testIter = iter.weave(
      iter.count(100),
      iter.count(200),
      iter.count(300),
    );
    assert.equal(testIter.next().value, 100);
    assert.equal(testIter.next().value, 200);
    assert.equal(testIter.next().value, 300);
    assert.equal(testIter.next().value, 101);
    assert.equal(testIter.next().value, 201);
    assert.equal(testIter.next().value, 301);
  });

  it("groupby succeeds", () => {
    const countValues = <T>(grouped: T[]) => Array.from(grouped).length;
    const testIter = iter.groupBy("aaabbbcddddaa");
    const first = testIter.next().value;
    assert.equal(first[0], "a");
    assert.equal(countValues(first[1]), 3);
    const second = testIter.next().value;
    assert.equal(second[0], "b");
    assert.equal(countValues(second[1]), 3);
    const third = testIter.next().value;
    assert.equal(third[0], "c");
    assert.equal(countValues(third[1]), 1);
    const fourth = testIter.next().value;
    assert.equal(fourth[0], "d");
    assert.equal(countValues(fourth[1]), 4);
    const fifth = testIter.next().value;
    assert.equal(fifth[0], "a");
    assert.equal(countValues(fifth[1]), 2);
    assert.equal(testIter.next().done, true);
  });

  it("compress succeeds", () => {
    const testIter = iter.compress("aaabbbcddddaa");
    assert.equal(testIter.next().value, "a");
    assert.equal(testIter.next().value, "b");
    assert.equal(testIter.next().value, "c");
    assert.equal(testIter.next().value, "d");
    assert.equal(testIter.next().value, "a");
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("pack succeeds", () => {
    const testIter = iter.pack("aaabbbcddddaa");
    let value = testIter.next().value;
    assert.deepEqual(value ? value : [], ["a", "a", "a"]);
    value = testIter.next().value;
    assert.deepEqual(value ? value : [], ["b", "b", "b"]);
    value = testIter.next().value;
    assert.deepEqual(value ? value : [], ["c"]);
    value = testIter.next().value;
    assert.deepEqual(value ? value : [], ["d", "d", "d", "d"]);
    value = testIter.next().value;
    assert.deepEqual(value ? value : [], ["a", "a"]);
    assert.equal(testIter.next().value, undefined);
    assert.equal(testIter.next().done, true);
  });

  it("repeat succeeds", () => {
    const testIter = iter.repeat(10);
    assert.equal(testIter.next().value, 10);
    assert.equal(testIter.next().value, 10);
    assert.equal(testIter.next().value, 10);
  });

  it("tee succeeds", () => {
    const testIters = iter.tee(iter.count());
    assert.equal(testIters[0].next().value, 0);
    assert.equal(testIters[1].next().value, 0);
    assert.equal(testIters[0].next().value, 1);
    assert.equal(testIters[1].next().value, 1);
  });

  it("repeat with stop succeeds", () => {
    const testIter = iter.repeat(10, 3);
    assert.equal(testIter.next().value, 10);
    assert.equal(testIter.next().value, 10);
    assert.equal(testIter.next().value, 10);
    const last = testIter.next();
    assert.equal(last.value, undefined);
    assert.equal(last.done, true);
  });

  it("flatten succeeds", () => {
    const testIter = iter.flatten([
      [0, 1],
      [2, 3],
    ]);
    assert.equal(testIter.next().value, 0);
    assert.equal(testIter.next().value, 1);
    assert.equal(testIter.next().value, 2);
    assert.equal(testIter.next().value, 3);
    const last = testIter.next();
    assert.equal(last.value, undefined);
    assert.equal(last.done, true);
  });

  it("permutations succeeds", () => {
    const testIter = iter.permutations(iter.range(1, 6), 2);
    const result = [...testIter];
    assert.equal(result.length, 20);
  });

  it("combinations succeeds", () => {
    const testIter = iter.combinations(iter.range(1, 6), 2);
    const result = [...testIter];
    assert.equal(result.length, 10);
  });

  it("combinations with replacement succeeds", () => {
    const testIter = iter.combinationsWithReplacement(iter.range(1, 6), 2);
    const result = [...testIter];
    assert.equal(result.length, 15);

    const testIter2 = iter.combinationsWithReplacement(iter.range(3), 3);
    const result2 = [...testIter2];
    assert.equal(result2.length, 10);
  });

  it("product succeeds", () => {
    const testIter = iter.product([1, 2], [10, 20], [100, 200, 300]);
    const result = [...testIter];
    assert.equal(result.length, 12);

    const testIter2 = iter.product(iter.range(2), iter.range(2), iter.range(2));
    const result2 = [...testIter2];
    assert.equal(result2.length, 8);

    const testIter3 = iter.product("ABCD", "xy");
    const result3 = [...testIter3];
    assert.equal(result3.length, 8);
  });
});
