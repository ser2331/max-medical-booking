import React from 'react';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import styled from 'styled-components';
import { Avatar } from '../Avatar/Avatar';

const UserCardContainer = styled(Flex).attrs({ $gap: 24 })`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const UserAvatar = styled.div`
  width: ${props => props.theme.spacing.xxxl};
  height: ${props => props.theme.spacing.xxxl};
  background: ${props => props.theme.colors.grey1};
  border-radius: 50%;
`;

const UserName = styled.h3`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const UserStatus = styled.p`
  color: ${props => props.theme.colors.blackPure};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

interface UserCardProps {
  user: {
    first_name: string;
    last_name: string;
    photo_url?: string;
  };
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <UserCardContainer $align="center">
      <UserAvatar>
        <Avatar
          src={user.photo_url}
          alt={user.first_name}
          text={user.first_name[0]}
          size={'xlarge'}
        />
      </UserAvatar>

      <Flex $direction="column">
        <UserName>
          {user.first_name} {user.last_name}
        </UserName>
        <UserStatus>Готовы к записи к врачу</UserStatus>
      </Flex>
    </UserCardContainer>
  );
};
