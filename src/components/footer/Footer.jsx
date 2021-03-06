import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';
import { GithubIcon, FacebookIcon, BlogIcon } from '../../styles/SvgIcon';

import {
  E_MAIL, GITHUB, FACEBOOK, BLOG,
} from '../../utils/constants/link';

import ExternalLink from './ExternalLink';

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
      <ExternalLink link={E_MAIL}>
        Seungmin Sa
      </ExternalLink>
    </CopyrightWrapper>
    <IconWrapper>
      <ExternalLink link={GITHUB}>
        <GithubIcon />
      </ExternalLink>
      <ExternalLink link={FACEBOOK}>
        <FacebookIcon />
      </ExternalLink>
      <ExternalLink link={BLOG}>
        <BlogIcon />
      </ExternalLink>
    </IconWrapper>
  </FooterWrapper>
);

export default Footer;
