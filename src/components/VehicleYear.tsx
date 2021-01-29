import React from 'react';
import { FilterSelect } from './common/FilterSelect';
import { VehicleSelectorFilterItemProps } from './VehicleSelector';

export function VehicleYear({ disabled, onSelected }: VehicleSelectorFilterItemProps) {
  const options = [
    {
      key: '2020',
      label: '2020',
    },
    {
      key: '2020',
      label: '2020',
    },
    {
      key: '2020',
      label: '2020',
    },
  ];

  return (
    <FilterSelect disabled={disabled} title="Year" options={options} onSelected={(option) => onSelected(option)} />
  );
}
