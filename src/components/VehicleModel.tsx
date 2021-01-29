import React from 'react';
import { FilterSelect } from './common/FilterSelect';
import { FilterItemProps } from './VehicleSelector';

export function VehicleModel({ disabled, onSelected }: FilterItemProps) {
  const options = [
    {
      key: '66765',
      label: 'EL',
    },
    {
      key: '66618',
      label: 'ILX',
    },
    {
      key: '65272',
      label: 'Integra',
    },
    {
      key: '64841',
      label: 'Legend',
    },
    {
      key: '64848',
      label: 'MDX',
    },
    {
      key: '64845',
      label: 'NSX',
    },
    {
      key: '104468',
      label: 'NSX Targa',
    },
  ];

  return (
    <FilterSelect disabled={disabled} title="Model" options={options} onSelected={(option) => onSelected?.(option)} />
  );
}
