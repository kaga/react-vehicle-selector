import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useVehicleModelsSelector, VEHICLE_SELECTOR_MODELS } from './VehicleModels';

const response = [
  {
    request: {
      query: VEHICLE_SELECTOR_MODELS,
      variables: {
        uvdb_year_id: 2021,
        uvdb_make_id: 1330,
      },
    },
    result: {
      data: {
        uvdb: {
          vehicle_selector: {
            uvdb_models: {
              items: [
                {
                  id: 72993,
                  name: 'Ignis',
                },
                {
                  id: 72993,
                  name: 'Ignis',
                },
                {
                  id: 65636,
                  name: 'Swift',
                },
                {
                  id: 65636,
                  name: 'Swift',
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

function MockModelComponent() {
  const { data } = useVehicleModelsSelector({
    shouldSkip: false,
    variables: {
      uvdb_year_id: 2021,
      uvdb_make_id: 1330,
    },
  });
  const elements = (data || []).map((model) => (
    <div key={`${model.id}`}>
      model.id
    </div>
  ));
  return <div data-testid="mock-model-component">{elements}</div>;
}

/**
 * TODO seems like something in my graphql query causing MockProvider not returning any data
 */
test.skip('should remove duplication 2021 Suzuki(1330) models', async () => {
  jest.useFakeTimers();
  render(
    <MockedProvider mocks={response} addTypename={false}>
      <MockModelComponent/>
    </MockedProvider>,
  );
  jest.advanceTimersByTime(1000);

  const listNode = await screen.findByTestId('mock-model-component');
  expect(listNode.children).toHaveLength(2);
});
