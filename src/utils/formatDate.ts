export const dbFormatDate = (date: string) => {
  const formated = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return formated.replaceAll('/', '-');
};

export const ISOtoShortDate = (isoString: string, locale = 'en-US') => {
  const options: {} = { month: 'numeric', day: 'numeric', year: 'numeric' };
  const date = new Date(isoString);
  const numericDate = new Intl.DateTimeFormat(locale, options).format(date);
  return numericDate;
};
