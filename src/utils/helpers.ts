/* eslint-disable no-bitwise */
// inspiration from https://stackoverflow.com/a/57941711/22063638
// example timestamp format: 2024-01-18T11:22:40+00:00
// WARNING: assumes +00:00 (which should be the case for timestamptz)
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

// shade, blend, or convert color value
// ONLY COMPATIBLE WITH RGB AND HEX
// for usage, see link below vvvv
// code source: https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
export const pSBC = (
  percent: number,
  color1: string,
  color2: string | null = null,
  linear = false,
) => {
  let red;
  let green;
  let blue;
  let percentComplement;
  let parsedColor1;
  let parsedColor2;
  let isRGB;

  if (percent < -1 || percent > 1 || (color1[0] !== 'r' && color1[0] !== '#'))
    return null;

  isRGB = color1.length > 9;
  if (typeof color2 === 'string')
    if (color2.length > 9) isRGB = true;
    else if (color2 === 'c') isRGB = !isRGB;
    else isRGB = false;

  parsedColor1 = pSBC.pSBCr(color1);
  percentComplement = percent < 0;

  if (color2 && color2 !== 'c') parsedColor2 = pSBC.pSBCr(color2);
  else
    parsedColor2 = percentComplement
      ? { r: 0, g: 0, b: 0, a: -1 }
      : { r: 255, g: 255, b: 255, a: -1 };

  // eslint-disable-next-line no-param-reassign
  percent = percentComplement ? percent * -1 : percent;
  percentComplement = 1 - percent;
  if (!parsedColor1 || !parsedColor2) return null;
  if (linear) {
    red = Math.round(
      percentComplement * parsedColor1.r + percent * parsedColor2.r,
    );
    green = Math.round(
      percentComplement * parsedColor1.g + percent * parsedColor2.g,
    );
    blue = Math.round(
      percentComplement * parsedColor1.b + percent * parsedColor2.b,
    );
  } else {
    red = Math.round(
      (percentComplement * parsedColor1.r ** 2 +
        percent * parsedColor2.r ** 2) **
        0.5,
    );
    green = Math.round(
      (percentComplement * parsedColor1.g ** 2 +
        percent * parsedColor2.g ** 2) **
        0.5,
    );
    blue = Math.round(
      (percentComplement * parsedColor1.b ** 2 +
        percent * parsedColor2.b ** 2) **
        0.5,
    );
  }

  let alpha = parsedColor1.a;
  parsedColor2 = parsedColor2.a;
  parsedColor1 = alpha >= 0 || parsedColor2 >= 0;

  if (parsedColor1)
    if (alpha < 0) alpha = parsedColor2;
    else if (parsedColor2 >= 0)
      alpha = alpha * percentComplement + parsedColor2 * percent;
    else alpha = 0;

  if (isRGB)
    return `rgb${parsedColor1 ? 'a(' : '('}${red},${green},${blue}${
      parsedColor1 ? `,${Math.round(alpha * 1000) / 1000}` : ''
    })`;

  return `#${(
    4294967296 +
    red * 16777216 +
    green * 65536 +
    blue * 256 +
    (parsedColor1 ? Math.round(alpha * 255) : 0)
  )
    .toString(16)
    .slice(1, parsedColor1 ? undefined : -2)}`;
};

// dependency for pSBC
pSBC.pSBCr = (color: string) => {
  const x = { r: 0, g: 0, b: 0, a: 0 };
  let n = color.length;

  if (n > 9) {
    const split = color.split(',');
    const [r, g, b, a] = split;
    n = split.length;
    if (n < 3 || n > 4) return null;

    x.r = parseInt(r[3] === 'a' ? r.slice(5) : r.slice(4), 10);
    x.g = parseInt(g, 10);
    x.b = parseInt(b, 10);
    x.a = a ? parseFloat(a) : -1;
  } else {
    if (n === 8 || n === 6 || n < 4) return null;
    let c = color;
    if (n < 6)
      c = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}${
        n > 4 ? color[4] + color[4] : ''
      }`;

    const ci = parseInt(c.slice(1), 16);

    if (n === 9 || n === 5) {
      x.r = (ci >> 24) & 255;
      x.g = (ci >> 16) & 255;
      x.b = (ci >> 8) & 255;
      x.a = Math.round((ci & 255) / 0.255) / 1000;
    } else {
      x.r = ci >> 16;
      x.g = (ci >> 8) & 255;
      x.b = ci & 255;
      x.a = -1;
    }
  }
  return x;
};

// helper functions
export const parseDate = (d: Date): string =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

// parse adjudicating agency to normal words
export const parseAgency = (agency: string): string =>
  agency.length <= 5
    ? agency.toUpperCase()
    : agency
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.toLowerCase().substring(1))
        .join(' ');
