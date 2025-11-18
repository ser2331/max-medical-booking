export const getErrorMessage = (error: { type: string }): string => {
  if (error?.type === 'required') {
    return 'Заполните поле';
  }
  if (error?.type === 'pattern' || error?.type === 'validate') {
    return 'Не верный формат';
  }
  return '';
};
