import React from 'react';
import { Link } from 'react-router-dom';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';
import { Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';

export const NotFoundPage: React.FC = () => {
  const { hapticFeedback } = useMaxBridgeContext();

  React.useEffect(() => {
    hapticFeedback('notification', 'light');
  }, [hapticFeedback]);

  return (
    <Section>
      <Flex $direction="column" $gap={24} style={{ minHeight: '100dvh' }}>
        <Flex $direction="column" $gap={16}>
          <span>404</span>

          <span>Страница не найдена</span>

          <span color="secondary">Запрашиваемая страница не существует или была перемещена</span>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <CustomButton onClick={() => hapticFeedback('impact', 'medium')}>
              На главную
            </CustomButton>
          </Link>
        </Flex>
      </Flex>
    </Section>
  );
};
