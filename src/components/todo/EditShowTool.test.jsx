import React from 'react';

import { render, fireEvent } from '@testing-library/react';

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
      const { getByTestId } = renderEditShowTool({ isMobile: true });

      fireEvent.click(getByTestId('todo-edit-icon'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
