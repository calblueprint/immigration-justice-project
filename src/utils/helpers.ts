/* eslint-disable no-bitwise */
// inspiration from https://stackoverflow.com/a/57941711/22063638
// example timestamp format: 2024-01-18T11:22:40+00:00
// WARNING: assumes +00:00 (which should be the case for timestamptz)
export const timestampStringToDate = (ts: string): Date => {
  const digits = ts.split(/\D/).map(s => parseInt(s, 10));
  digits[1] -= 1; // ground month to 0-index

  const ms = Date.UTC(
    digits[0], // year
    digits[1], // month
    digits[2], // day
    digits[3], // hour
    digits[4], // minute
    digits[5], // second
    0,
  );

  return new Date(ms);
};

// parse js date to mm/dd/yyyy
export const parseDate = (d: Date): string =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

export const parseDataAlt = (d: Date): string =>
  `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

// parse adjudicating agency to normal words
export const parseAgency = (agency: string): string =>
  agency.length <= 5
    ? agency.toUpperCase()
    : agency
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.toLowerCase().substring(1))
        .join(' ');

/**
 * @param d - date in string format
 * @returns true if the date is an upcoming date, false otherwise
 */
export const isValidDate = (d: string) => {
  const currentDate = new Date();
  const inputDate = new Date(`${d}T00:00`);
  currentDate.setHours(0, 0, 0, 0);

  if (d !== '' && inputDate >= currentDate) {
    return true;
  }
  return false;
};
