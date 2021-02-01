import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useVehicleMakesSelector, VEHICLE_SELECTOR_MAKES } from './VehicleMakes';
import { VEHICLE_SELECTOR_YEARS, useVehicleYearsSelector } from './VehicleYears';

const response = [
  {
    request: {
      query: VEHICLE_SELECTOR_MAKES,
      variables: {},
    },
    result: {
      data: {
        uvdb: {
          vehicle_selector: {
            uvdb_makes: {
              items: [
                {
                  id: 1366,
                  name: 'Bentley',
                },
                {
                  id: 1366,
                  name: 'Bentley',
                },
              ],
              cursor: {
                currentPage: 1,
                perPage: 20,
                total: 2,
              },
            },
          },
        },
      },
    },
  },
];

// const response = [
//   {
//     request: {
//       query: VEHICLE_SELECTOR_YEARS,
//       variables: {},
//     },
//     result: {
//       data: {
//         uvdb: {
//           vehicle_selector: {
//             uvdb_years: {
//               items: [
//                 {
//                   id: 2021,
//                 },
//                 {
//                   id: 2020,
//                 },
//                 {
//                   id: 2020,
//                 },
//               ],
//               cursor: {
//                 currentPage: 1,
//                 perPage: 10,
//                 total: 46,
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// ];

function MockMakeComponent() {
  const { data } = useVehicleMakesSelector({
    shouldSkip: false,
    variables: {},
  });
  // const { data } = useVehicleYearsSelector({
  //   shouldSkip: false,
  //   variables: {},
  // });
  const elements = (data || []).map((makes) => <div key={`${makes.id}`}>{makes.id}</div>);
  return <div data-testid="mock-make-component">{elements}</div>;
}

test('should remove duplicate vehicle makes', async () => {
  jest.useFakeTimers();
  render(
    <MockedProvider mocks={response} addTypename={false}>
      <MockMakeComponent />
    </MockedProvider>,
  );
  jest.advanceTimersByTime(1000);

  const listNode = await screen.findByTestId('mock-make-component');
  expect(listNode.children).toHaveLength(1);
});
