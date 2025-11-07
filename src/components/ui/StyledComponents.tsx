import styled from 'styled-components';
import { Panel, Flex, Button, Spinner } from '@maxhub/max-ui';
import { media, responsive } from '@/styles/mixins.ts';


export const ContentFlex = styled(Flex)`
    height: 100%;
    ${responsive.gap}
`;

// Карточки - используем наследование от MAX UI Panel
export const StyledPanel = styled(Panel)`
    transition: all 0.2s ease;

    ${media.hover} {
        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    }

    // Адаптивные отступы для карточек

    && {
        ${media.md} {
            border-radius: var(--radius-medium);
        }

        ${media.xs} {
            border-radius: var(--radius-small);
        }
    }
`;

// Кнопки - расширяем MAX UI Button
export const CompactButton = styled(Button)`
    && {
        min-width: auto;
        padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
        flex-shrink: 0;

        ${media.md} {
            padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
            font-size: 14px;
        }

        ${media.xs} {
            padding: 6px 10px;
            font-size: 13px;
            min-height: 32px;
        }
    }
`;

export const LoadingSpinner = styled(Spinner)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
`;

export const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.spacing.xl};
    gap: ${props => props.theme.spacing.md};
    text-align: center;
    min-height: 200px;
    width: 100%;
`;