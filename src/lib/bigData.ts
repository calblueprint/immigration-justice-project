import { City, Country, State } from 'country-state-city';
import { iso6393 } from 'iso-639-3';

export const languages = iso6393
  .filter(i => i.type === 'living')
  .filter(i => i.iso6392T || i.name.endsWith('Sign Language'))
  .map(i => `${i.name}`)
  .sort((l1, l2) => l1.localeCompare(l2));

export const cities = City.getAllCities()
  .map(c => ({
    cityName: c.name,
    stateName: State.getStateByCodeAndCountry(c.stateCode, c.countryCode)?.name,
    countryName: Country.getCountryByCode(c.countryCode)?.name,
  }))
  .sort((c1, c2) => c1.cityName.localeCompare(c2.cityName))
  .sort((c1, c2) => c1.stateName?.localeCompare(c2?.stateName ?? '') ?? -1)
  .sort((c1, c2) => c1.countryName?.localeCompare(c2?.countryName ?? '') ?? -1)
  .map(c => `${c.cityName}, ${c.stateName}, ${c.countryName}`);
