import React from 'react';
import { Link } from 'react-router-dom';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import styled from 'styled-components';
import { Card } from '@/components/ui/Cart.tsx';

const MenuLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MenuItemContainer = styled(Card).attrs({ $interactive: true })`
  padding: ${props => props.theme.spacing.md};
`;

const MenuIcon = styled.div`
  font-size: 24px;
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.mainBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  flex-shrink: 0;
`;

const MenuTextContainer = styled(Flex)`
  flex: 1;
  min-width: 0;
`;

const MenuItemName = styled.h4`
  color: ${props => props.theme.colors.black};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MenuItemDescription = styled.p`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.4;
  margin: 0;
`;

interface MenuItemProps {
  name: string;
  description: string;
  icon: string;
  path: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, description, icon, path, onClick }) => {
  return (
    <MenuLink to={path} onClick={onClick}>
      <MenuItemContainer>
        <Flex $align="center">
          <MenuIcon>{icon}</MenuIcon>
          <MenuTextContainer $direction="column">
            <MenuItemName>{name}</MenuItemName>
            {description && <MenuItemDescription>{description}</MenuItemDescription>}
          </MenuTextContainer>
        </Flex>
      </MenuItemContainer>
    </MenuLink>
  );
};
