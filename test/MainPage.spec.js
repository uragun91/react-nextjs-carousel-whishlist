import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import App from "../pages/mainpage";

describe("With Enzyme", () => {
  it('Total 5 div are using for Main Layout component"', () => {
    const app = shallow(<App />);

    expect(app.find('div')).toHaveLength(5)
  });
});

describe("With Enzyme", () => {
  it('3 h4 is using for text', () => {
    const app = shallow(<App />);

    expect(app.find('h4')).toHaveLength(3)
  });
});

describe("With Enzyme", () => {
  it('Heading displaying with specific text', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text().includes('Popular')).toBe(true);
    expect(wrapper.text().includes('Top Rated')).toBe(true);
    expect(wrapper.text().includes('Upcoming')).toBe(true);
  });
});


describe("With Snapshot Testing", () => {
  it('Application manageing movies and detail of specific movie.!"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});