import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@maxhub/max-ui';
import { media } from '@/styles/mixins.ts';

export const AccordionContainer = styled(Flex)`
  align-items: stretch !important;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  transition: all 0.2s ease;
`;

export const AccordionItem = styled.div<{ $isExpanded?: boolean }>`
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  background: ${props => props.theme.colors.background.card};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.border.accent};
    box-shadow: ${props => props.theme.shadows.small};
  }

  ${media.md} {
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

export const AccordionHeader = styled.button<{ $isExpanded: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  border: none;
  background: ${props =>
    props.$isExpanded ? props.theme.colors.primary + '15' : props.theme.colors.background.card};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.$isExpanded
        ? props.theme.colors.primary + '20'
        : props.theme.colors.background.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: -2px;
  }

  ${media.md} {
    padding: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

export const AccordionToggle = styled.span<{ $isExpanded: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  transition: transform 0.2s ease;
  transform: ${props => (props.$isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)')};

  &::before {
    content: '▼';
    display: inline-block;
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

export const AccordionContent = styled.div<{ $isExpanded: boolean }>`
  padding: 0 ${props => (props.$isExpanded ? props.theme.spacing.lg : 0)}
    ${props => (props.$isExpanded ? props.theme.spacing.lg : 0)};
  background: ${props => props.theme.colors.background.secondary};
  max-height: ${props => (props.$isExpanded ? '1000px' : '0')};
  opacity: ${props => (props.$isExpanded ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s ease;

  ${media.md} {
    padding: 0 ${props => (props.$isExpanded ? props.theme.spacing.md : 0)}
      ${props => (props.$isExpanded ? props.theme.spacing.md : 0)};
  }
`;

export const AccordionBody = styled(Flex)`
  align-items: stretch !important;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  opacity: 1;
  transition: opacity 0.2s ease;
`;

interface AccordionItemProps {
  key: string;
  header: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  onItemToggle?: (key: string, isExpanded: boolean) => void;
  className?: string;
}

export const Accordion: FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  onItemToggle,
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultExpanded).map(item => item.key)),
  );

  const toggleItem = (key: string) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(key)) {
      newExpanded.delete(key);
      onItemToggle?.(key, false);
    } else {
      if (!allowMultiple) {
        newExpanded.clear();
      }
      newExpanded.add(key);
      onItemToggle?.(key, true);
    }

    setExpandedItems(newExpanded);
  };

  return (
    <AccordionContainer direction="column" className={`ACCORDION ${className}`}>
      {items.map(item => {
        const isExpanded = expandedItems.has(item.key);

        return (
          <AccordionItem key={item.key} $isExpanded={isExpanded}>
            <AccordionHeader
              type="button"
              onClick={() => !item.disabled && toggleItem(item.key)}
              $isExpanded={isExpanded}
              disabled={item.disabled}
            >
              <span>{item.header}</span>
              <AccordionToggle $isExpanded={isExpanded} />
            </AccordionHeader>

            <AccordionContent $isExpanded={isExpanded}>
              <AccordionBody direction="column">{item.children}</AccordionBody>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </AccordionContainer>
  );
};
