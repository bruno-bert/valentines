import {
  calculateRelationshipElapsedTime,
  relationshipStartDate
} from "../src/utils/relationshipTimer";

describe("relationshipTimer", () => {
  it("returns zero values before the relationship start date", () => {
    expect(calculateRelationshipElapsedTime(new Date(2026, 0, 14, 19, 59, 59))).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  });

  it("calculates second and minute rollover from deterministic current times", () => {
    expect(calculateRelationshipElapsedTime(new Date(2026, 0, 14, 20, 0, 1))).toMatchObject({
      seconds: 1
    });

    expect(calculateRelationshipElapsedTime(new Date(2026, 0, 14, 20, 1, 0))).toMatchObject({
      minutes: 1,
      seconds: 0
    });
  });

  it("calculates elapsed calendar units across a leap-year date", () => {
    expect(calculateRelationshipElapsedTime(new Date(2028, 1, 29, 21, 2, 3))).toEqual({
      years: 2,
      months: 1,
      days: 15,
      hours: 1,
      minutes: 2,
      seconds: 3
    });
  });

  it("exports the fixed local relationship start date", () => {
    expect(relationshipStartDate).toEqual(new Date(2026, 0, 14, 20, 0, 0));
  });
});
