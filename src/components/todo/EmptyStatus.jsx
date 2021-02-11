import React from 'react';

import { useRecoilValue } from 'recoil';

import { filterAtom } from '../../recoil/todos';

import { FILTER_TYPE_BUTTON, EMPTY_TODO_MESSAGE } from '../../utils/constants/constants';

import EmptyMessage from '../../styles/EmptyMessage';

const { ACTIVE } = FILTER_TYPE_BUTTON;
const { NOTHING_ACTIVE, NOTHING_COMPLETED } = EMPTY_TODO_MESSAGE;

const EmptyStatus = () => {
  const filterStatus = useRecoilValue(filterAtom);

  if (filterStatus === ACTIVE) {
    return (
      <EmptyMessage>
        {NOTHING_ACTIVE}
      </EmptyMessage>
    );
  }

  return (
    <EmptyMessage>
      {NOTHING_COMPLETED}
    </EmptyMessage>
  );
};

export default EmptyStatus;
