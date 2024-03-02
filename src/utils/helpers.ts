import { ImmigrationLawExperienceEnum } from '@/types/schema';

/**
 * inspiration from https://stackoverflow.com/a/57941711/22063638
 * example timestamp format: 2024-01-18T11:22:40+00:00
 * WARNING: assumes +00:00 (which should be the case for timestamptz)
 * @param ts
 * @returns Date
 */
export function timestampStringToDate(ts: string): Date {
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
}

export function dateToTimestampString(d: Date): string {
  return d.toUTCString();
}

// parse js date to mm/dd/yyyy
export const parseDate = (d: Date): string =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

// parse js date to yyyy-mm-dd
export const parseDateAlt = (d: Date): string =>
  `${d.getFullYear().toString().padStart(4, '0')}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

// check if a string is a valid bar number
export const isValidBarNumber = (b: string): boolean => /^\d{1,6}$/.test(b);

/**
 * Parses the adjudicating agency to normal words & acronyms.
 * @param agency - a case's adjudicating agency.
 * @returns a correctly formatted string for the adjudicating agency
 */
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

/**
 * @param experience - an attorney's required experience for a listed case.
 * @returns appropriate string description according to the experience level.
 */
export const parseExperience = (experience: ImmigrationLawExperienceEnum) => {
  if (experience === 'LOW') {
    return `${
      experience.charAt(0).toUpperCase() + experience.toLowerCase().substring(1)
    } (No prior case)`;
  }
  if (experience === 'MEDIUM') {
    return `${
      experience.charAt(0).toUpperCase() + experience.toLowerCase().substring(1)
    } (One prior case)`;
  }
  return `${
    experience.charAt(0).toUpperCase() + experience.toLowerCase().substring(1)
  } (Multiple prior cases)`;
};

/**
 * If the description is used for the case listing cards, CARD should be passed in as
 * TRUE, FALSE otherwise.
 * @param attorney - a boolean indicating whether a case needs an attorney.
 * @param interpreter - a boolean indicating whether a case needs an interpreter.
 * @param card a boolean indicating whether the description will be used for a case listing card.
 * @returns appropriate description for roles needed field based on the attorney & interpreter parameters.
 */
export const parseRolesNeeded = (
  card: boolean,
  attorney?: boolean,
  interpreter?: boolean,
) => {
  if (interpreter && attorney) {
    return card ? 'Interpreter & Attorney' : 'Attorney, Interpreter';
  }
  return interpreter ? 'Interpreter' : 'Attorney';
};

/**
 * @param hoursPerMonth - expected hours/month rate a volunteer or attorney spends on a case.
 * @param numMonths expected number of months a volunteer/attorney will help with the case.
 * @returns appropriate format for the time commitment description based on the parameters.
 */
export const parseTimeCommitment = (
  hoursPerMonth: number | undefined,
  numMonths: number | undefined,
) => {
  if (hoursPerMonth && numMonths) {
    return `${hoursPerMonth} hours/month for ${numMonths} ${
      numMonths > 1 ? 'months' : 'month'
    }`;
  }
  if (hoursPerMonth) {
    return `${hoursPerMonth} hours/month`;
  }
  if (numMonths) {
    return `${numMonths} ${numMonths} ${numMonths > 1 ? 'months' : 'month'}`;
  }
  return 'N/A';
};
