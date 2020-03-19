import useCalendar from "./useCalendar";
import { renderHook, act } from "@testing-library/react-hooks";

it("returns an object with 4 keys/values", () => {
  const { result } = renderHook(() => useCalendar());
  expect(Object.keys(result.current)).toHaveLength(4);
});

it("should set the date", () => {
  const { result } = renderHook(() => useCalendar());
  act(() => {
    result.current.setFilterBoxStartDate(new Date("3/19/2020").toDateString());
  });
  expect(result.current.filterBoxStartDate).toBe("Thu Mar 19 2020");
});
