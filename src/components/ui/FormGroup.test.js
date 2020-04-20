import React from 'react';
import renderer from 'react-test-renderer';

import FormGroup from './FormGroup';

describe('FormGroup', () => {
  it('>>> Snapshot', () => {
    const tree = renderer.create(
      <FormGroup
        name='hashtags'
        type='text'
        placeholder='#хэш-тег'
        groupClass='form-group'
        controlClass='form-control'
        input={{}}
        meta={{}}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
