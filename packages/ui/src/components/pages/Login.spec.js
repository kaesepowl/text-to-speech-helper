import React from "react";
import { shallow } from "enzyme";
import { useHistory } from "react-router-dom";

import UnderTestComponent from "./Login";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

const defaultProps = {};

describe("init", () => {
  it("should be rendered without crash", () => {
    shallow(<UnderTestComponent {...defaultProps} />);
  });
});

const getLastResults = (fn) => fn.mock.results[fn.mock.results.length - 1];

describe("session change", () => {
  const comp = shallow(<UnderTestComponent {...defaultProps} />);

  it("should invoke onSessionChange prop if login clicked", () => {
    useHistory.mockClear();
    comp
      .find('[data-test-id="access-key-id-input"]')
      .simulate("change", { target: { value: "THE_ACCESS_KEY_ID" } });
    comp
      .find('[data-test-id="secret-access-key-input"]')
      .simulate("change", { target: { value: "THE_SECRET_ACCESS_KEY" } });
    comp.find('[data-test-id="login-button"]').simulate("click");
    
    expect(getLastResults(useHistory).value.push).toHaveBeenCalledWith("/");
  });
});
