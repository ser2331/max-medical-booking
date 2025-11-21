import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import { UserCard } from '@/components/ui/User/UserCard.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox.tsx';

export const PageContainer = styled(Card).attrs({ $vertical: true })`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const Text = styled.span`
  width: 100%;
  text-align: center;
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

export const Agreement: React.FC = () => {
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

  console.log(checkedAgreements);

  useEffect(() => {
    if (checkedAgreements.length === 2) {
      navigator('/');
    }
  }, [navigator, checkedAgreements]);
  return (
    <PageContainer className="page-container">
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
    </PageContainer>
  );
};
