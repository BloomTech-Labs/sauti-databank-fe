import { getRangePeriods } from "../LineGraphHelpers/Range";
import "jest";
import "jest-extended";

let time = [
  {
    bean: "100",
    date: "2017-06",
    period: "2"
  },
  {
    rice: "100",
    date: "2017-10",
    period: "2"
  },
  {
    rice: "100",
    date: "2018-06",
    period: "2"
  },
  {
    rice: "100",
    date: "2018-10",
    period: "2"
  },
  {
    rice: "100",
    date: "2019-06",
    period: "2"
  },
  {
    rice: "100",
    date: "2019-10",
    period: "2"
  }
];

let allPeriodsArray = [
  "2017-06",
  "2017-10",
  "2018-06",
  "2018-10",
  "2019-06",
  "2019-10"
];

describe("periodsAmount", () => {
  it("returns a number", async () => {
    const response = await getRangePeriods(time, allPeriodsArray);

    expect(response.periodsAmount).toBeNumber();
  });
});

describe("allPeriodsArray", () => {
  it("returns a number", async () => {
    const response = await getRangePeriods(time, allPeriodsArray);

    expect(response.allPeriodsArray).toBeArray();
  });
});

describe("to equal ", () => {
  it("returns a number", async () => {
    const response = await getRangePeriods(time, allPeriodsArray);

    expect(response.allPeriodsArray.length).toEqual(response.periodsAmount);
  });
});
