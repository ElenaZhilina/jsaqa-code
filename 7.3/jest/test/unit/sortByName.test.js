const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ];

    const expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];

    const output = sorting.sortByName(input);

    expect(output).toEqual(expected);
  });

  it("should return an empty array when input is empty", () => {
    const input = [];
    const expected = [];
    const output = sorting.sortByName(input);
    expect(output).toEqual(expected);
  });

  it("should handle duplicate names", () => {
    const input = ["Гарри Поттер", "Гарри Поттер", "Властелин Колец"];
    const expected = ["Властелин Колец", "Гарри Поттер", "Гарри Поттер"];
    const output = sorting.sortByName(input);
    expect(output).toEqual(expected);
  });

});
