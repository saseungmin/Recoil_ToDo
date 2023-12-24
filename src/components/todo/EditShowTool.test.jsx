import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import EditShowTool from './EditShowTool';

describe('EditShowTool', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderEditShowTool = ({ isMobile }) => render((
    <EditShowTool
      id="1"
      onShowEdit={handleClick}
      isMobile={isMobile}
    />
  ));

  context('When desktop', () => {
    it('renders edit tooltip', () => {
      const { container } = renderEditShowTool({ isMobile: false });

      expect(container).toHaveTextContent('수정하려면 더블 클릭해주세요!');
    });
  });

  context('When mobile', () => {
    it('Click pencil icon calls the function', () => {
      renderEditShowTool({ isMobile: true });

      fireEvent.click(screen.getByTestId('todo-edit-icon'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
