import React from 'react';
import { FilterSelect } from './common/FilterSelect';
import { FilterItemProps } from './VehicleSelector';

export function VehicleMake({ disabled, onSelected }: FilterItemProps) {
  const options = [
    {
      key: '1456',
      label: 'Abarth',
    },
    {
      key: '1442',
      label: 'AC',
    },
    {
      key: '1359',
      label: 'Acura',
    },
    {
      key: '2151',
      label: 'Aixam',
    },
  ];

  return (
    <FilterSelect disabled={disabled} title="Make" options={options} onSelected={(option) => onSelected?.(option)} />
  );
}
