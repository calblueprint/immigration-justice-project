import { City, Country, State } from 'country-state-city';
import { DropdownOption } from '@/types/dropdown';

export const countries: DropdownOption[] = Country.getAllCountries()
  .map(c => ({ label: c.name, value: c.isoCode }))
  .sort((c1, c2) => c1.label.localeCompare(c2.label));

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

export const usStates = State.getAllStates()
  .filter(s => s.countryCode === 'US')
  .map(s => s.name)
  .sort((s1, s2) => s1.localeCompare(s2));
