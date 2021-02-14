import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

import { GithubIcon, FacebookIcon, BlogIcon } from '../../styles/SvgIcon';

const FooterWrapper = styled.footer`
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
      <a href="mailto:dbd02169@naver.com">Seungmin Sa</a>
    </CopyrightWrapper>
    <IconWrapper>
      <a href="https://github.com/saseungmin">
        <GithubIcon />
      </a>
      <a href="https://www.facebook.com/people/%EC%82%AC%EC%8A%B9%EB%AF%BC/100003758628929">
        <FacebookIcon />
      </a>
      <a href="https://haranglog.tistory.com/">
        <BlogIcon />
      </a>
    </IconWrapper>
  </FooterWrapper>
);

export default Footer;
