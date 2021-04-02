import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BlogSvg from '../assets/icons/blog.svg';
import GithubSvg from '../assets/icons/github.svg';
import FacebookSvg from '../assets/icons/facebook.svg';

import mq from './responsive';

const SvgIconWrapper = ({ theme }) => css`
  ${mq({
    width: ['18px', '20px'],
    height: ['18px', '20px'],
  })};
  
  fill: ${theme.fill[0]};
  transition: fill .2s;

  &:hover {
    fill: ${theme.fill[1]};
  }
`;

export const FacebookIcon = styled(FacebookSvg)`
  ${SvgIconWrapper}
`;

export const GithubIcon = styled(GithubSvg)`
  ${SvgIconWrapper}
`;

export const BlogIcon = styled(BlogSvg)`
  ${SvgIconWrapper}
`;
