import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@maxhub/max-ui';
import { media } from '@/styles/mixins.ts';
import { Card } from '@/components/ui/Cart.tsx';
import { ArrowIcon } from '@/assets/icons/Arrow/ArrowIcon.tsx';

export const AccordionContainer = styled(Flex)`
  align-items: stretch !important;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  transition: all 0.2s ease;
`;

export const AccordionItem = styled.div<{ $isExpanded?: boolean }>`
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  background: ${props => props.theme.colors.mainBackgroundColor};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.black};
    box-shadow: ${props => props.theme.shadows.small};
  }

  ${media.md} {
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

export const AccordionHeader = styled('div')`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
`;

export const AccordionContent = styled.div<{ $isExpanded: boolean }>`
  max-height: ${props => (props.$isExpanded ? '1000px' : '0')};
  opacity: ${props => (props.$isExpanded ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const AccordionBody = styled(Flex)`
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
          <Card key={item.key}>
            <AccordionHeader onClick={() => !item.disabled && toggleItem(item.key)}>
              <span>{item.header}</span>
              <ArrowIcon rotate={isExpanded ? 90 : -90} color={''} />
            </AccordionHeader>

            <AccordionContent $isExpanded={isExpanded}>
              <AccordionBody direction="column">{item.children}</AccordionBody>
            </AccordionContent>
          </Card>
        );
      })}
    </AccordionContainer>
  );
};
