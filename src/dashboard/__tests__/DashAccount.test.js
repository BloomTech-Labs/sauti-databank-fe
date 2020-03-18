const { formatDate } = require("../DashAccount");

describe("formatDate()", () => {
  test("formats the date", () => {
    const date = new Date("3/18/2020");
    const formattedDate = formatDate(date);
    const expected = "Wed Mar 18 2020";

    expect(formattedDate).toBe(expected);
  });

  test("should be called once", () => {
    const mockFormatDate = jest.fn(formatDate);
    mockFormatDate(new Date());
    expect(mockFormatDate).toHaveBeenCalledTimes(1);
  });
});

// test("toBe", () => {
//   expect().toBe();
//   expect().not.toBe();
// });

// test("toEqual", () => {
//   const expected = {};
//   const actual = {};
//   expect(expected).toEqual(actual);
// });

// test("toMatchObject", () => {
//   const expected = {};
//   const actual = {};
//   expect(expected).toMatchObject(actual);
// });
