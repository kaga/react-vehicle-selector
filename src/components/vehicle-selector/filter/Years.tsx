import { useQuery } from '@apollo/client';
import React from 'react';
import { VEHICLE_SELECTOR_YEARS } from '../Query';
import { AutocompleteOptions, Option } from './Sample';

export function YearsComponent(props: YearsProps) {
  const { loading, error, data } = useQuery(VEHICLE_SELECTOR_YEARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const options: YearOption[] = data.uvdb.vehicle_selector.uvdb_years.items.map(({ id }: { id: number }) => {
    return {
      id: id,
      label: `${id}`,
      key: `${id}`,
    };
  });

  return <AutocompleteOptions title="Year" options={options} onSelected={(option) => props.onSelected(option)} />;
}

type YearsProps = {
  onSelected: (selectedOption: YearOption) => void;
};

export interface YearOption extends Option {
  id: number;
}
