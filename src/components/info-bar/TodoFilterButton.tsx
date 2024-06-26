import React, { ChangeEvent, MouseEvent } from 'react';

import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { FilterType } from 'src/recoil/todos/atom';
import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

import { filterAtom } from '../../recoil/todos';

const { COMPLETED } = FILTER_TYPE_BUTTON;

const FilterButtonWrapper = styled.button<{ value: FilterType; status: FilterType; }>`
  ${mq({
    fontSize: ['0.9rem', '1.2rem'],
  })};

  border: none;
  padding: 0;
  background: none;
  transition: color 0.3s;
  color: ${({ theme }) => theme.gray};

  &:hover {
    color: ${palette.active[0]};
  };

  ${({ value, status, theme }) => value === status && css`
    color: ${theme.baseTone};
  `};

  ${({ value }) => value !== COMPLETED && css`
    &::after {
      content: "";
      border-right: 1px solid ${palette.gray[5]};

  ${mq({
    margin: ['0px 5px', '0px 10px'],
  })}
    }
  `};
`;

type Props = {
  type: FilterType;
};

function TodoFilterButton({ type }: Props) {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter((e.target as any).value);
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
}

export default TodoFilterButton;
