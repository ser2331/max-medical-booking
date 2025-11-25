import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import { UserCard } from '@/components/ui/User/UserCard.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox.tsx';
import authBackground from '@/assets/images/auth/authBack.png';
import { ImageLoader } from '@/components/ImageLoader.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';

export const PageContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  background: url(${authBackground}) no-repeat center center;
  background-size: cover;
  padding: ${props => props.theme.spacing.md};
  transition: opacity 0.3s ease;
  position: relative;
`;

export const PageContent = styled(Card).attrs({ $vertical: true })`
  align-items: center;
  gap: 16px;
`;

const Text = styled.span`
  width: 100%;
  max-width: ${props => props.theme.breakpoints.sm};
`;

const Subtitle = styled(Text)`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: ${props => props.theme.spacing.lg};
`;

const CheckboxesContainer = styled(Flex).attrs({ $direction: 'column' })`
  gap: 16px;
  width: 100%;
  max-width: ${props => props.theme.breakpoints.sm};
`;

// Компонент для чекбокса со ссылкой
interface AgreementCheckboxProps {
  id: string;
  text: string;
  linkText: string;
  linkTo: string;
  checked?: boolean;
  onChange?: (id: string) => void;
}

const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
  id,
  text,
  linkText,
  linkTo,
  checked,
  onChange,
}) => {
  return (
    <Checkbox
      title={
        <>
          {text} <Link to={linkTo}>{linkText}</Link>
        </>
      }
      checked={checked}
      onChange={() => onChange?.(id)}
    />
  );
};

const AgreementContent: React.FC = () => {
  const navigator = useNavigate();
  const { user, hapticFeedback } = useMaxBridgeContext();
  const [checkedAgreements, setCheckedAgreements] = React.useState<string[]>([]);

  const handleCheckAgreement = (agreementId: string) => {
    hapticFeedback('impact', 'light').then(() => {
      setCheckedAgreements(prev =>
        !prev.includes(agreementId)
          ? [...prev, agreementId]
          : prev.filter(id => id !== agreementId),
      );
    });
  };

  const handleConfirm = () => {
    hapticFeedback('impact', 'light').then(() => {
      if (checkedAgreements.length === 2) {
        navigator('/');
      }
    });
  };

  const agreementCheckboxes = [
    {
      id: 'personal-data',
      text: 'Я даю',
      linkText: 'согласие на обработку моих персональных данных',
      linkTo: '/personal-data-agreement',
    },
    {
      id: 'privacy-policy',
      text: 'Соглашаюсь с',
      linkText: 'политикой конфиденциальности',
      linkTo: '/privacy-policy',
    },
  ];

  return (
    <PageContainer className="page-container">
      <PageContent>
        {/* Карточка пользователя */}
        {user && <UserCard user={user} />}

        <Subtitle>
          Для записи к врачу или на телемедицинские услуги, необходимо дать согласие на обработку
          персональных данных.
        </Subtitle>

        <CheckboxesContainer>
          {agreementCheckboxes.map(checkbox => (
            <AgreementCheckbox
              key={checkbox.id}
              id={checkbox.id}
              checked={checkedAgreements.includes(checkbox.id)}
              onChange={handleCheckAgreement}
              text={checkbox.text}
              linkText={checkbox.linkText}
              linkTo={checkbox.linkTo}
            />
          ))}
        </CheckboxesContainer>

        <CustomButton
          disabled={checkedAgreements.length !== 2}
          variant={'primary'}
          onClick={handleConfirm}
        >
          Подтвердить
        </CustomButton>
      </PageContent>
    </PageContainer>
  );
};

export const Agreement: React.FC = () => {
  return (
    <ImageLoader images={[authBackground]}>
      <AgreementContent />
    </ImageLoader>
  );
};
