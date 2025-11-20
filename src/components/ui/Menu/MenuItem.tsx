import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '@/assets/style/mixins.ts';

const MenuLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xsm};
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.blue};
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.lg}`};
  color: ${props => props.theme.colors.blue};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};

  max-width: ${props => props.theme.breakpoints.xs};
  font-size: ${props => props.theme.typography.fontSize.lg};

  ${media.md} {
    max-width: 100%;
    font-size: ${props => props.theme.typography.fontSize.md};
    padding: ${props => `${props.theme.spacing.xsm} ${props.theme.spacing.md}`};
  }
`;

const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
`;

const MenuText = styled.div`
  min-width: 0;
`;

interface MenuItemProps {
  name: string;
  description: string;
  icon: ReactNode;
  path: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, icon, path, onClick }) => {
  return (
    <MenuLink to={path} onClick={onClick}>
      <MenuIcon>{icon}</MenuIcon>
      <MenuText>{name}</MenuText>
    </MenuLink>
  );
};
