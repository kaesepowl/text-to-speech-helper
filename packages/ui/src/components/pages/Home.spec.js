import React from 'react';
import { shallow } from 'enzyme';

import UnderTestComponent from './Home';

import useProcessed from '../../api/use-processed';

jest.mock('../../api/use-processed', () => jest.fn(() => ({})));

const defaultProps = {};

/**
 * @typedef { import('enzyme').ShallowWrapper } ShallowWrapper
 */
describe('init', () => {
  it('should be rendered without crash', () => {
    shallow(<UnderTestComponent {...defaultProps} />);
  });
});

describe('render data', () => {
  /**
   * @type ShallowWrapper
   */
  let comp;
  beforeAll(() => {
    useProcessed.mockImplementation(() => ({
      data: [
        {
          id: 'abcd1234'.repeat(4),
          text: 'Hallo Paul',
        },
      ],
    }));
    comp = shallow(<UnderTestComponent {...defaultProps} />);
  });

  it('should find Text from mock item', () => {
    expect(comp.text()).toEqual(expect.stringContaining('Hallo Paul'));
  });
  it('should provide audio element', () => {
    expect(
      comp.find(
        `[src="http://localhost:8080/processed/${'abcd1234'.repeat(4)}/audio"]`
      )
    ).toHaveLength(1);
  });
});
