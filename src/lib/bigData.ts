import { City, State, Country } from 'country-state-city';
import { iso6393 } from 'iso-639-3';

export const languages = new Set(
  iso6393
    .filter(i => i.type === 'living')
    .filter(i => i.iso6392T || i.name.endsWith('Sign Language'))
    .map(i => `${i.name}`)
    .sort((l1, l2) => l1.localeCompare(l2)),
);

export const cities = new Set(
  City.getAllCities()
    .sort((c1, c2) => c1.countryCode.localeCompare(c2.countryCode))
    .map(
      c =>
        `${c.name}, ${
          State.getStateByCodeAndCountry(c.stateCode, c.countryCode)?.name
        }, ${Country.getCountryByCode(c.countryCode)?.name}`,
    ),
);
