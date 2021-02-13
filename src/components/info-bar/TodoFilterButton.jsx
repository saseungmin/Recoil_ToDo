import React from 'react';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from '../../styles/palette';
import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import { filterAtom } from '../../recoil/todos';

const { COMPLETED } = FILTER_TYPE_BUTTON;

const FilterButtonWrapper = styled.button`
  font-size: 1.2rem;
  border: none;
  padding: 0;
  background: none;
  transition: color 0.3s;

  &:hover {
    color: ${palette.active[0]};
  };

  ${({ value, status }) => value === status && css`
    color: ${palette.active[1]};
  `};

  ${({ value }) => value !== COMPLETED && css`
    &::after {
      content: "";
      border-right: 1px solid ${palette.gray[6]};
      margin: 0px 10px;
    }
  `};

`;

const TodoFilterButton = ({ type }) => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const handleClick = (e) => {
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <FilterButtonWrapper
      value={type}
      status={filter}
      type="button"
      onClick={handleClick}
    >
      {type}
    </FilterButtonWrapper>
  );
};

export default TodoFilterButton;
