import styled from 'styled-components';
import { Panel, Flex, Typography, Button, Counter } from '@maxhub/max-ui';
import { media, responsive } from '../../styles/mixins.ts';

// Контейнеры
export const PageContainer = styled.div`
    ${responsive.padding}
`;

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

export const SelectedItemPanel = styled(StyledPanel)<{ $isSelected?: boolean }>`
    border: 2px solid ${(props) =>
            props.$isSelected ? props.theme.colors.border.accent : props.theme.colors.border.secondary};
    background: ${(props) =>
            props.$isSelected ? props.theme.colors.primary : props.theme.colors.secondary};
    min-height: 80px;

    ${media.xs} {
        min-height: 70px;
    }
`;

// Иконки
export const IconContainer = styled.div<{
  $color?: string;
  $background?: string;
  $size?: string;
}>`
    width: ${(props) => props.$size || '40px'};
    height: ${(props) => props.$size || '40px'};
    border-radius: var(--radius-small);
    background: ${(props) => props.$background || props.theme.colors.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${(props) => props.$color || props.theme.colors.text.primary};
    flex-shrink: 0;

    ${media.xs} {
        width: ${(props) => (props.$size ? '32px' : '36px')};
        height: ${(props) => (props.$size ? '32px' : '36px')};
        font-size: 14px;
    }
`;

export const SkeletonLoader = styled.div`
    width: 60px;
    height: 20px;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 4px;
    flex-shrink: 0;
    animation: pulse 1.5s ease-in-out infinite;

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    ${media.xs} {
        width: 50px;
        height: 18px;
    }
`;

// Текст
export const EllipsisText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SecondaryText = styled(Typography.Body)`
    ${responsive.text.small}
    color: ${(props) => props.theme.colors.text.secondary};

    // Важно: переопределяем стили MAX UI с осторожностью

    && {
        margin: 0;
    }
`;

export const AccentLabel = styled(Typography.Label)`
    color: ${(props) => props.theme.colors.text.accent};
    font-weight: 600;

    ${media.xs} {
        font-size: 14px;
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

// Бейджи - расширяем MAX UI Counter
export const Badge = styled(Counter)<{
  $type?: 'success' | 'warning' | 'info';
}>`
    && {
        background: ${(props) => {
            switch (props.$type) {
                case 'success':
                    return props.theme.colors.success;
                case 'warning':
                    return props.theme.colors.warning;
                case 'info':
                    return props.theme.colors.primary;
                default:
                    return props.theme.colors.success;
            }
        }} !important;
        color: ${(props) => props.theme.colors.text.primary} !important;
        flex-shrink: 0;

        ${media.xs} {
            font-size: 11px;
            padding: 2px 6px;
            min-width: auto;
        }
    }
`;

// Адаптивные утилиты
export const MobileHidden = styled.div`
    ${media.xs} {
        display: none;
    }
`;

export const DesktopOnly = styled.div`
    ${media.md} {
        display: none;
    }
`;

// Специальные адаптивные компоненты
export const ResponsiveFlex = styled(Flex)<{
  $mobileDirection?: 'row' | 'column';
  $tabletDirection?: 'row' | 'column';
}>`
    ${media.md} {
        flex-direction: ${(props) => props.$tabletDirection || 'column'};
    }

    ${media.xs} {
        flex-direction: ${(props) => props.$mobileDirection || 'column'};
    }
`;

export const AdaptiveText = styled.div<{
  $size?: 'small' | 'medium' | 'large';
}>`
    ${(props) => {
        switch (props.$size) {
            case 'small':
                return responsive.text.small;
            case 'large':
                return responsive.text.large;
            default:
                return responsive.text.medium;
        }
    }}
    color: ${(props) => props.theme.colors.text.primary};
`;
