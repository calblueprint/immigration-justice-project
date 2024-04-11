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

// parse js date to mm/dd/yyyy
export const parseDate = (d: Date): string =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

// format timestamp string
export const formatTimestamp = (timestamp?: string): string =>
  timestamp ? parseDate(timestampStringToDate(timestamp)) : 'Not Available';

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
 * @param hoursPerWeek - expected hours/weeks rate a volunteer or attorney spends on a case.
 * @param numWeeks expected number of weeks a volunteer/attorney will help with the case.
 * @returns appropriate format for the time commitment description based on the parameters.
 */
export const parseTimeCommitment = (
  hoursPerWeek?: number,
  numWeeks?: number,
) => {
  if (
    (hoursPerWeek === undefined || hoursPerWeek === null) &&
    (numWeeks === undefined || numWeeks === null)
  )
    return 'N/A';
  if (numWeeks === undefined || numWeeks === null)
    return `${hoursPerWeek} hours/week`;

  const unit = numWeeks > 4 ? 'month' : 'week';
  const numUnit = numWeeks > 4 ? numWeeks / 4 : numWeeks;
  const plural = numUnit > 1 ? 's' : '';
  if (hoursPerWeek === undefined || hoursPerWeek === null)
    return `${numWeeks} ${unit}${plural}`;

  const rate = numWeeks > 4 ? hoursPerWeek * 4 : hoursPerWeek;
  return `${rate} hours/${unit} for ${numUnit} ${unit}${plural}`;
};
