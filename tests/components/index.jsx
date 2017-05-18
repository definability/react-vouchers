import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Application from 'components';

describe('Application', () => {
  it('should exist', () => {
    Application.should.be.ok();
  });
  it('should create a component', () => {
    const application = TestUtils.renderIntoDocument(<Application />);
    TestUtils.isCompositeComponent(application).should.be.True();
  });
});
