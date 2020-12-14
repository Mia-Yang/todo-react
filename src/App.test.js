import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import App from './App';

test('should take a snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});

test('should capture changes in inputbox', () => {
  const app = render(<App />);
  const inputElement = app.getByTestId('inputbox');
  fireEvent.change(inputElement, { target: { value: 'workout' } });
  expect(inputElement.value).toBe('workout');
});

test('should create a new todo', () => {
  const app = render(<App />);

  const inputElement = app.getByTestId('inputbox');
  const createButtonElement = app.getByTestId('addTodoButton');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'Feed my dog.' } });
  fireEvent.click(createButtonElement);

  expect(app.getByTestId('todo')).toHaveTextContent('Feed my dog');

  expect(inputElement.value).toBe('');

  expect(app.getByTestId('todo')).toBeInTheDocument();

  expect(app.getAllByTestId('todo').length).toBe(1);
});

test('should be checked when the item is done', () => {
  const app = render(<App />);
  const inputElement = app.getByTestId('inputbox');
  const createButtonElement = app.getByTestId('addTodoButton');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'workout 30mins.' } });
  fireEvent.click(createButtonElement);
  const checkbox = app.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked;
});

test('should delete item when click its delete button', () => {
  const app = render(<App />);

  const inputElement = app.getByTestId('inputbox');
  const createButtonElement = app.getByTestId('addTodoButton');

  expect(app.queryAllByTestId('todo').length).toBe(0);

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'workout 30mins.' } });
  fireEvent.click(createButtonElement);

  expect(app.queryAllByTestId('todo').length).toBe(1);

  // Click the delete button
  const deleteButton = app.getByTestId('deleteTodo');
  fireEvent.click(deleteButton);

  expect(inputElement.value).toBe('');

  expect(app.queryByTestId('todo')).not.toBeInTheDocument();

  expect(app.queryAllByTestId('todo').length).toBe(0);
});

test('should clear all items when click clear button', () => {
  const app = render(<App />);

  const inputElement = app.getByTestId('inputbox');
  const createButtonElement = app.getByTestId('addTodoButton');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'workout 30mins.' } });
  fireEvent.click(createButtonElement);
  fireEvent.change(inputElement, { target: { value: 'water flowers.' } });
  fireEvent.click(createButtonElement);

  expect(app.queryAllByTestId('todo').length).toBe(2);

  // Click the delete button
  const clearButton = app.getByTestId('clearButton');
  fireEvent.click(clearButton);

  expect(inputElement.value).toBe('');

  expect(app.queryAllByTestId('todo').length).toBe(0);
});
