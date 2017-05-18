import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import reactTestRenderer from 'react-test-renderer';

import Container from 'components/Container';

describe('Container', () => {
  const child = <div id="child" />;

  it('should exist', () => {
    Container.should.be.ok();
  });
  it('should create a component', () => {
    const container = TestUtils.renderIntoDocument(
      <Container>
        {child}
      </Container>
    );
    TestUtils.isCompositeComponent(container).should.be.True();
  });
  it('should be rendered with children', () => {
    const renderer = reactTestRenderer.create(
      <Container>
        {child}
      </Container>
    );
    const container = renderer.toJSON();

    container.children.should.be.deepEqual(
      [reactTestRenderer.create(child).toJSON()]
    );
  });
});
