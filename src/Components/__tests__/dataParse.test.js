import dataParse from "../dataParse";
import graphLabels from "../graphLabels";
import "jest";
import "jest-extended";

let data = [
  { gender: "Female" },
  { gender: "Female" },
  { gender: "Male" },
  { gender: null },
  { gender: "Female" },
  { gender: "Female" },
  { gender: "Male" },
  { gender: "Male" },
  { gender: "Male" },
  { gender: null },
  { gender: null }
];

describe("DataParse", () => {
  it("returns an array", async () => {
    const response = await dataParse("gender", data, "");

    expect(response.dataStructure).toBeArray();
  });

  it("should be a function", () => {
    expect(dataParse).toBeFunction();
  });

  it("should return a DataStructure", async () => {
    const response = await dataParse("gender", data, "");

    expect(response.dataStructure).toBeDefined();
  });

  //   it("dataStructure should return an array of objects", async () => {
  //     const response = await dataParse("gender", data, "");
  //     expect(response.dataStructure[0].toBeObject();
  //     expect(
  //       response.dataStructure[response.dataStructure.length - 1]
  //     ).toBeObject();
  //   });

  it("each dataStructure object should have a gender property when gender is index", async () => {
    const response = await dataParse("gender", data, "");

    const filtered = response.dataStructure.filter(object =>
      object.hasOwnProperty("gender")
    );

    expect(filtered.length).toEqual(response.dataStructure.length);
  });
});
