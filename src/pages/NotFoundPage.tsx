import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Flex, Panel, Typography } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';

export const NotFoundPage: React.FC = () => {
  const { hapticFeedback } = useMaxBridgeContext();

  React.useEffect(() => {
    hapticFeedback('notification', { style: 'light', type: 'error' });
  }, [hapticFeedback]);

  return (
    <Container>
      <Flex
        direction="column"
        gap={24}
        align="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Panel>
          <Flex direction="column" gap={16} align="center">
            <Typography.Display color="danger">404</Typography.Display>

            <Typography.Headline>Страница не найдена</Typography.Headline>

            <Typography.Body color="secondary">
              Запрашиваемая страница не существует или была перемещена
            </Typography.Body>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => hapticFeedback('impact', { style: 'medium' })}
                size="large">
                На главную
              </Button>
            </Link>
          </Flex>
        </Panel>
      </Flex>
    </Container>
  );
};
