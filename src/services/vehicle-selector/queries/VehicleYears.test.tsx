import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useVehicleYearsSelector, VEHICLE_SELECTOR_YEARS } from './VehicleYears';

const response = [
  {
    request: {
      query: VEHICLE_SELECTOR_YEARS,
      variables: {},
    },
    result: {
      data: {
        uvdb: {
          vehicle_selector: {
            uvdb_years: {
              items: [
                {
                  id: 2021,
                },
                {
                  id: 2020,
                },
                {
                  id: 2020,
                },
              ],
              cursor: {
                currentPage: 1,
                perPage: 10,
                total: 46,
              },
            },
          },
        },
      },
    },
  },
];

function MockComponent() {
  const { data } = useVehicleYearsSelector({
    shouldSkip: false,
    variables: {},
  });
  const elements = (data || []).map((year) => <div key={`${year.id}`}>year.id</div>);
  return <div data-testid="mock-year-component">{elements}</div>;
}

test('should remove duplication year 2020', async () => {
  jest.useFakeTimers();
  render(
    <MockedProvider mocks={response} addTypename={false}>
      <MockComponent />
    </MockedProvider>,
  );
  jest.advanceTimersByTime(1000);

  const listNode = await screen.findByTestId('mock-year-component');
  expect(listNode.children).toHaveLength(2);
});
