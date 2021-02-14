import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BlogSvg from '../assets/icons/blog.svg';
import GithubSvg from '../assets/icons/github.svg';
import FacebookSvg from '../assets/icons/facebook.svg';

const SvgIconWrapper = () => css`
  width: 20px;
  height: 20px;
  transition: fill .2s;

  &:hover {
    fill: gray;
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
