const assert = require("assert");
const Lazy = require("../index");

var numbers = [2, 9, 3, 8, 2];

describe("Lazy", () => {
  it("#map()", () => {
    const result = Lazy(numbers)
      .map((i) => i * 2)
      .toArray();
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0], 4);
    assert.strictEqual(result[1], 18);
    assert.strictEqual(result[2], 6);
    assert.strictEqual(result[3], 16);
    assert.strictEqual(result[4], 4);
  });

  it("#filter()", () => {
    const result = Lazy(numbers)
      .filter((i) => i <= 4)
      .toArray();
    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0], 2);
    assert.strictEqual(result[1], 3);
    assert.strictEqual(result[2], 2);
  });

  it("#take()", () => {
    const result = Lazy(numbers).take(4).toArray();
    assert.strictEqual(result.length, 4);
    assert.strictEqual(result[0], 2);
    assert.strictEqual(result[1], 9);
    assert.strictEqual(result[2], 3);
    assert.strictEqual(result[3], 8);
  });

  it("filter() after map()", () => {
    const result = Lazy(numbers)
      .map((i) => i * 2)
      .filter((i) => i <= 5)
      .toArray();
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0], 4);
    assert.strictEqual(result[1], 4);
  });

  it("map() after filter()", () => {
    const result = Lazy(numbers)
      .filter((i) => i <= 5)
      .map((i) => i * 2)
      .toArray();
    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0], 4);
    assert.strictEqual(result[1], 6);
    assert.strictEqual(result[2], 4);
  });
});
