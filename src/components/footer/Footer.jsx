import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';
import { GithubIcon, FacebookIcon, BlogIcon } from '../../styles/SvgIcon';

import {
  E_MAIL, GITHUB, FACEBOOK, BLOG,
} from '../../utils/constants/link';

const FooterWrapper = styled.footer`
  ${mq({
    fontSize: ['0.9rem', '1rem'],
  })};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const CopyrightWrapper = styled.div`
  margin-bottom: .5rem;

  & span {
    color: ${palette.gray[5]};
  }

  & a {
    text-decoration: none;
    color: ${palette.gray[6]};
    transition: color .2s;

    &:hover {
      color: ${palette.gray[7]};
      text-decoration: underline;
    }
  }
`;

const IconWrapper = styled.div`
  & a {
    margin-right: 5px;

    &:last-child {
      margin-right: 0px;
    }
  }

`;

const Footer = () => (
  <FooterWrapper>
    <CopyrightWrapper>
      <span>© Created by </span>
      <a href={E_MAIL} target="_blank" rel="noopener noreferrer">Seungmin Sa</a>
    </CopyrightWrapper>
    <IconWrapper>
      <a href={GITHUB} target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
      <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </a>
      <a href={BLOG} target="_blank" rel="noopener noreferrer">
        <BlogIcon />
      </a>
    </IconWrapper>
  </FooterWrapper>
);

export default Footer;
