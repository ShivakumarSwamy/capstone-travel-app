import { updateStartEndDates, planTravel } from "./app.js";

jest.mock('../media/placeholder_image.jpg');

describe("Testing functions defined", () => {

  test("Testing the updateStartEndDates() function", () => {
        expect(updateStartEndDates).toBeDefined();
  });

  test("Testing the planTravel() function", () => {
        expect(planTravel).toBeDefined();
  });

});