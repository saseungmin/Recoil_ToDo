import React from 'react';

import { useRecoilValue } from 'recoil';

import { filterAtom } from '../../recoil/todos';

import { EMPTY_TODO_MESSAGE } from '../../utils/constants/messages';
import { FILTER_TYPE_BUTTON } from '../../utils/constants/constants';

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
