import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon } from '@/assets/icons/Arrow/ArrowIcon.tsx';
import { Flex, Line } from '@/components/ui/StyledComponents.tsx';

export const AccordionContainer = styled(Flex).attrs({ $direction: 'column', $align: 'stretch' })`
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;
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
  width: 100%;
  max-height: ${props => (props.$isExpanded ? '1000px' : '0')};
  opacity: ${props => (props.$isExpanded ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const AccordionBody = styled(Flex).attrs({
  $align: 'flex-start',
  $justifyContent: 'flex-start',
})`
  width: 100%;
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
    <AccordionContainer className={`ACCORDION ${className}`}>
      {items.map(item => {
        const isExpanded = expandedItems.has(item.key);

        return (
          <div key={item.key}>
            <AccordionHeader onClick={() => !item.disabled && toggleItem(item.key)}>
              <span>{item.header}</span>
              <ArrowIcon rotate={isExpanded ? 90 : -90} color={''} />
            </AccordionHeader>

            <AccordionContent $isExpanded={isExpanded}>
              <AccordionBody>{item.children}</AccordionBody>
            </AccordionContent>

            <Line $marginBottom={0} />
          </div>
        );
      })}
    </AccordionContainer>
  );
};
