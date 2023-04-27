import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TablePagination from './TablePagination';

test('render count', () => {
  const onPage = jest.fn();
  const { getByTestId } = render(
    <TablePagination currentPage={0} size={10} count={100} onPage={onPage} />,
  );
  const count = Number(getByTestId('count').textContent);
  expect(count).toBe(100);
});

test('render initial page 0 StartIndex and EndIndex', () => {
  const onPage = jest.fn();
  const { getByTestId } = render(
    <TablePagination currentPage={0} size={10} count={100} onPage={onPage} />,
  );
  const startIndex = Number(getByTestId('startIndex').textContent);
  const endIndex = Number(getByTestId('endIndex').textContent);
  expect(startIndex).toBe(1);
  expect(endIndex).toBe(10);
});

test('render increment startIndex and endIndex', () => {
  const onPage = jest.fn();
  const { getByTestId, getByRole } = render(
    <TablePagination currentPage={0} size={10} count={100} onPage={onPage} />,
  );

  const startIndex1 = Number(getByTestId('startIndex').textContent);
  const endIndex1 = Number(getByTestId('endIndex').textContent);
  expect(startIndex1).toEqual(1);
  expect(endIndex1).toEqual(10);

  const nextButton = getByRole('button', {
    name: /next/i,
  });
  fireEvent.click(nextButton);

  const startIndex2 = Number(getByTestId('startIndex').textContent);
  const endIndex2 = Number(getByTestId('endIndex').textContent);
  expect(startIndex2).toEqual(10);
  expect(endIndex2).toEqual(20);
});

test('prev button is disabled', () => {
  const onPage = jest.fn();
  const { getByTestId, getByRole } = render(
    <TablePagination currentPage={0} size={10} count={100} onPage={onPage} />,
  );

  const prevButton = getByRole('button', {
    name: /prev/i,
  });
  expect(prevButton).toBeDisabled();
});

test('next button is disabled', () => {
  const onPage = jest.fn();
  const { getByTestId, getByRole } = render(
    <TablePagination currentPage={9} size={10} count={100} onPage={onPage} />,
  );

  const nextButton = getByRole('button', {
    name: /next/i,
  });
  expect(nextButton).toBeDisabled();
});
