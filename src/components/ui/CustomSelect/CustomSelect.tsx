import { forwardRef } from 'react';
import Select, {
  ActionMeta,
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  SingleValue,
  SingleValueProps,
  StylesConfig,
} from 'react-select';
import styled, { useTheme } from 'styled-components';
import { SelectedIcon } from '@/assets/icons/SelectedIcon.tsx';
import { DatePickerArrowRight } from '@/assets/icons/DatePickerArrowRight.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { getErrorMessage } from '@/helpers/heplers.tsx';

const FormSelectContainer = styled.div<{
  $withoutDescriptionMargin?: boolean;
  $hasDescription?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: ${props =>
    !props.$withoutDescriptionMargin && props.$hasDescription ? props.theme.spacing.md : '0'};
`;

const Title = styled.span<{ $hasError?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey2)};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const Required = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.red};
  margin-left: ${props => props.theme.spacing.xs};
`;

const Description = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.grey2};
  position: absolute;
  bottom: -${props => props.theme.spacing.md};
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
`;

const OptionContent = styled.span<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  ${props =>
    props.$isSelected &&
    `
    .tm-sub-option {
      color: ${props.theme.colors.white};
    }
  `}
`;

const SubOption = styled.span`
  color: ${props => props.theme.colors.grey2};
  margin-left: ${props => props.theme.spacing.xs};
`;

const OptionAddButton = styled.span`
  color: ${props => props.theme.colors.blue};
  text-decoration: underline;
  text-decoration-skip-ink: none;

  &:hover {
    color: ${props => props.theme.colors.white};
  }
`;

const CustomIndicatorContainer = styled(Flex)<{ $isFocused?: boolean }>`
  transition: transform 0.2s ease;
  transform: ${props => (props.$isFocused ? 'rotate(180deg)' : 'rotate(0deg)')};

  svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${props => props.theme.colors.grey2};
    }
  }
`;

export type IValue = Date | string | number | null;

export interface SelectOption {
  value: IValue;
  label: string;
  subLabel?: string;
  extraLabel?: string;
}

interface CustomSelectProps {
  title?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: SelectOption | null;
  onChange: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void;
  onSearch?: (value: string) => void;
  loadOptions?: boolean;
  disabled?: boolean;
  error?: { type: string };
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  isClearable?: boolean;
  greyMode?: boolean;
  isSearchable?: boolean;
  cyName: string;
  withAddBtn?: boolean;
  showErrorText?: boolean;
  isYearSelect?: boolean;
  isPositionAbsolute?: boolean;
  withoutDescriptionMargin?: boolean;
}

// Кастомный компонент для индикатора
const DropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIndicatorContainer $isFocused={props.selectProps.menuIsOpen}>
        <DatePickerArrowRight />
      </CustomIndicatorContainer>
    </components.DropdownIndicator>
  );
};

// Компонент Option с правильными типами
const Option = (props: OptionProps<SelectOption, false>) => {
  const theme = useTheme();
  const index = props.options?.findIndex(
    (x: SelectOption | GroupBase<SelectOption>) => 'value' in x && x.value === props.data.value,
  );

  return (
    <components.Option {...props}>
      <OptionContent $isSelected={props.isSelected} data-cy={`option-${index}`}>
        {props.data.label}
        {props.data.subLabel && (
          <>
            {' '}
            | <SubOption className="tm-sub-option">{props.data.subLabel}</SubOption>
          </>
        )}
        {props.data.extraLabel && (
          <>
            {' '}
            | <SubOption className="tm-sub-option">{props.data.extraLabel}</SubOption>
          </>
        )}
        {props.isSelected && (
          <span style={{ marginLeft: theme.spacing.sm }}>
            <SelectedIcon />
          </span>
        )}
      </OptionContent>
    </components.Option>
  );
};

// Компонент SingleValue с правильными типами
const CustomSingleValue = (props: SingleValueProps<SelectOption, false>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.label}
      {props.data.subLabel && (
        <>
          {' '}
          | <SubOption className="tm-sub-option">{props.data.subLabel}</SubOption>
        </>
      )}
      {props.data.extraLabel && (
        <>
          {' '}
          | <SubOption className="tm-sub-option">{props.data.extraLabel}</SubOption>
        </>
      )}
    </components.SingleValue>
  );
};

// Компонент OptionWithAdd с правильными типами
const OptionWithAdd = (props: OptionProps<SelectOption, false>) => {
  const index = props.options?.findIndex(
    (x: SelectOption | GroupBase<SelectOption>) => 'value' in x && x.value === props.data.value,
  );

  return (
    <components.Option {...props}>
      {props.data.value === 0 ? (
        <OptionAddButton data-cy={`option-${index}`}>{props.data.label}</OptionAddButton>
      ) : (
        <span data-cy={`option-${index}`}>{props.data.label}</span>
      )}
    </components.Option>
  );
};

export const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>((props, ref) => {
  const theme = useTheme();

  // Правильная типизация стилей для React Select
  const customStyles: StylesConfig<SelectOption, false> = {
    menuPortal: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: 3,
    }),
    control: (base: CSSObjectWithLabel) =>
      ({
        ...base,
        borderRadius: theme.borderRadius.small,
        minHeight: 44,
        color: theme.colors.black,
        paddingLeft: theme.spacing.xs,
        backgroundColor: props.isYearSelect
          ? 'transparent'
          : props.error
            ? theme.colors.redLight
            : theme.colors.white,
        borderColor: props.isYearSelect
          ? 'transparent'
          : props.error
            ? theme.colors.red
            : theme.colors.grey3,
        ':hover': {
          borderColor: props.isYearSelect
            ? 'transparent'
            : props.error
              ? theme.colors.red
              : theme.colors.blue,
        },
        ':focus-within': {
          borderColor: props.isYearSelect
            ? 'transparent'
            : props.error
              ? theme.colors.red
              : theme.colors.blue,
          boxShadow: 'none',
        },
        boxShadow: 'none',
      }) as CSSObjectWithLabel,
    container: (base: CSSObjectWithLabel) => ({
      ...base,
      width: props.isYearSelect ? '100%' : '',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 0,
    }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    option: (base: CSSObjectWithLabel, state) =>
      ({
        ...base,
        cursor: 'pointer',
        backgroundColor:
          state.isSelected && !props.greyMode ? theme.colors.blueLight : theme.colors.white,
        color: state.isSelected && !props.greyMode ? theme.colors.blueDark : theme.colors.black,
        ':hover': {
          backgroundColor: theme.colors.blueLight,
        },
        borderRadius: theme.borderRadius.small,
      }) as CSSObjectWithLabel,
    multiValue: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: theme.colors.grey4,
      border: `1px solid ${theme.colors.grey3}`,
      borderRadius: theme.borderRadius.small,
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
      ...base,
      ':hover': {
        backgroundColor: 'transparent',
        color: 'unset',
        cursor: 'pointer',
      },
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: theme.spacing.xs,
    }),
    noOptionsMessage: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: theme.typography.fontSize.md,
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      color: theme.colors.black,
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: theme.typography.fontSize.md,
      whiteSpace: 'nowrap',
    }),
    menuList: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.large,
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      borderRadius: theme.borderRadius.large,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    }),
  };

  return (
    <FormSelectContainer
      data-cy={props.cyName}
      $withoutDescriptionMargin={props.withoutDescriptionMargin}
      $hasDescription={!!props.description}
      ref={ref}
    >
      {props.title && (
        <Title $hasError={!!props.error}>
          {props.title}
          {props.required && <Required>*</Required>}
        </Title>
      )}

      <Select<SelectOption, false>
        options={props.options}
        placeholder={props.placeholder ?? ''}
        onChange={props.onChange}
        value={props.value ?? null}
        onInputChange={props.onSearch}
        isSearchable={props.isSearchable !== undefined ? props.isSearchable : true}
        isClearable={props.isClearable !== undefined ? props.isClearable : true}
        styles={customStyles}
        isLoading={props.loadOptions}
        noOptionsMessage={({ inputValue }) => (!inputValue ? 'Пусто' : 'Нет совпадений')}
        loadingMessage={() => 'Загрузка'}
        components={{
          Option: props.withAddBtn ? OptionWithAdd : Option,
          SingleValue: CustomSingleValue,
          DropdownIndicator,
        }}
        isDisabled={props.disabled ?? false}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        menuPlacement="auto"
        menuPosition={props.isPositionAbsolute ? 'absolute' : 'fixed'}
      />

      {props.showErrorText && props.error && <ErrorText>{getErrorMessage(props.error)}</ErrorText>}

      {props.description && <Description>{props.description}</Description>}
    </FormSelectContainer>
  );
});

CustomSelect.displayName = 'CustomSelect';
