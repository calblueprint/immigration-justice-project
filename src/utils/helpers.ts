// inspiration from https://stackoverflow.com/a/57941711/22063638
// example timestamp format: 2024-01-18T11:22:40+00:00
// assumes +00:00
export default function timestampStringToDate(ts: string) {
  const digits = ts.split(/\D/).map(s => parseInt(s, 10));
  digits[1] -= 1; // ground month to 0-index

  // lint complains about spread operator :pensive:
  const ms = Date.UTC(
    digits[0],
    digits[1],
    digits[2],
    digits[3],
    digits[4],
    digits[5],
    0,
  );

  return new Date(ms);
}
