import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (component, { route = '/' } = {}) => ({
  ...render(
    <MemoryRouter initialEntries={ [route] }>
      {component}
    </MemoryRouter>,
  ),
});

export default renderWithRouter;
