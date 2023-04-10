import countries from "world-countries";

const formatedCountires = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formatedCountires;

  const getByValue = (value: string) => {
    return formatedCountires.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
