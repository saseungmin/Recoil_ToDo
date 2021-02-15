import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ReactTooltip from 'react-tooltip';

import PencilSvg from '../../assets/icons/pencil.svg';

const PencilIcon = styled(PencilSvg)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 3px;

  ${({ ismobile }) => ismobile && css`
    top: 0;
    right: 45px;
    position: absolute;
    bottom: 0;
    margin: auto 0;
    margin-bottom: 18px;
    cursor: pointer;
  `};
`;

const EditTooltip = styled(ReactTooltip)`
  background: #91a7ff !important;
  opacity: 0.8 !important;

  &.place-top {
    &:after {
      border-top-color: #91a7ff !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
    }
  }

  & p {
    font-size: 0.9rem;
  }
`;

const EditTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EditShowTool = ({ isMobile, onShowEdit, id }) => {
  if (isMobile) {
    return (
      <div>
        <PencilIcon
          data-testid="todo-edit-icon"
          onClick={onShowEdit}
          ismobile={isMobile && 1}
        />
      </div>
    );
  }

  return (
    <EditTooltip
      id={id}
    >
      <EditTooltipWrapper>
        <PencilIcon />
        <p>
          수정하려면 더블 클릭해주세요!
        </p>
      </EditTooltipWrapper>
    </EditTooltip>
  );
};

export default EditShowTool;
