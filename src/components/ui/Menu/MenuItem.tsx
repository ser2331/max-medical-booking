import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '@/assets/style/mixins.ts';
import { CustomButton } from '@/components/ui/Button/Button.tsx';

const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
`;

const MeniBtn = styled(CustomButton)`
  width: 100%;
  padding: ${props => `${props.theme.spacing.xsm} ${props.theme.spacing.lg}`};
  gap: ${props => `${props.theme.spacing.xsm}`};
  border: none;

  ${media.md} {
    max-width: 100%;
    font-size: ${props => props.theme.typography.fontSize.md};
    padding: ${props => `${props.theme.spacing.xsm} ${props.theme.spacing.md}`};
  }
`;
interface MenuItemProps {
  name: string;
  description: string;
  icon: ReactNode;
  path: string;
  onClick?: (path: string) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, icon, path, onClick }) => {
  return (
    <MeniBtn variant={'primary'} onClick={() => onClick?.(path)}>
      <MenuIcon>{icon}</MenuIcon>
      {name}
    </MeniBtn>
  );
};
