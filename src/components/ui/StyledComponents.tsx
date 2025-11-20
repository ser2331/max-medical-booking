import styled from 'styled-components';
export const Main = styled('div')`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100dvh;
  width: 100%;
  background: ${props => props.theme.colors.mainBackground};
`;

export const Flex = styled('div')<{
  $direction?: 'row' | 'column';
  $align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  $justifyContent?: 'space-between' | 'space-around' | 'flex-start';
  $gap?: number;
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justifyContent || 'center'};
  gap: ${props => (props.$gap || 0) + 'px'};
`;

export const Section = styled(Flex).attrs({ $direction: 'column' })`
  gap: ${props => props.theme.spacing.md};
`;

export const SpecialtyName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;
export const StatValue = styled.span<{ $available?: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => (props.$available ? props.theme.colors.grey2 : props.theme.colors.red)};
`;

export const Line = styled('div')<{
  marginTop?: number;
  marginBottom?: number;
}>`
  width: 100%;
  margin-top: ${props =>
    props.marginTop !== undefined ? `${props.marginTop}px` : props.theme.spacing.md};
  margin-bottom: ${props =>
    props.marginBottom !== undefined ? `${props.marginBottom}px` : props.theme.spacing.md};
  height: 1px;
  border-bottom: 1px solid ${props => props.theme.colors.grey1};
`;
export const CheckCardName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;
export const CheckCardName2 = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;
export const CheckCardDescription = styled(CheckCardName)`
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  color: ${props => props.theme.colors.grey2};
`;
