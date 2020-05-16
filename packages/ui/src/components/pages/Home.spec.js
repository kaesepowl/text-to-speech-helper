import React from "react";
import { shallow } from "enzyme";

import UnderTestComponent from "./Home";

const defaultProps = {};

describe("init", () => {
  it("should be rendered without crash", () => {
    shallow(<UnderTestComponent {...defaultProps} />);
  });
});
