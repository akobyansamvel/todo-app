import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('ToDo App', () => {
  test('Добавление новой задачи', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Введите задачу');
    const addButton = getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Новая задача')).toBeInTheDocument();
    });
  });

  test('Фильтрация задач: Все, Активные и Выполненные', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Введите задачу');
    const addButton = getByText('Добавить');

    // Добавляем две задачи: одну активную, одну выполненную
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Выполненная задача' } });
    fireEvent.click(addButton);

    // Отмечаем одну задачу как выполненную
    const completedTask = getByText('Выполненная задача');
    fireEvent.click(completedTask);

    // Фильтр "Активные"
    fireEvent.click(getByText('Активные'));
    await waitFor(() => {
      expect(queryByText('Активная задача')).toBeInTheDocument();
      expect(queryByText('Выполненная задача')).not.toBeInTheDocument();
    });

    // Фильтр "Выполненные"
    fireEvent.click(getByText('Выполненные'));
    await waitFor(() => {
      expect(queryByText('Выполненная задача')).toBeInTheDocument();
      expect(queryByText('Активная задача')).not.toBeInTheDocument();
    });

    // Фильтр "Все"
    fireEvent.click(getByText('Все'));
    await waitFor(() => {
      expect(queryByText('Активная задача')).toBeInTheDocument();
      expect(queryByText('Выполненная задача')).toBeInTheDocument();
    });
  });

  test('Удаление задачи', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Введите задачу');
    const addButton = getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Удаляемая задача' } });
    fireEvent.click(addButton);

    const deleteButton = getByText('Удалить');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryByText('Удаляемая задача')).not.toBeInTheDocument();
    });
  });

  test('Очистка выполненных задач', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Введите задачу');
    const addButton = getByText('Добавить');

    // Добавляем и выполняем задачу
    fireEvent.change(input, { target: { value: 'Очистимая задача' } });
    fireEvent.click(addButton);

    const task = getByText('Очистимая задача');
    fireEvent.click(task);

    // Нажимаем на "Очистить выполненные задачи"
    const clearCompletedButton = getByText('Очистить выполненные задачи');
    fireEvent.click(clearCompletedButton);

    await waitFor(() => {
      expect(queryByText('Очистимая задача')).not.toBeInTheDocument();
    });
  });

  test('Отображение количества активных задач', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Введите задачу');
    const addButton = getByText('Добавить');

    // Добавляем две задачи
    fireEvent.change(input, { target: { value: 'Первая активная задача' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Вторая активная задача' } });
    fireEvent.click(addButton);

    // Отмечаем одну задачу как выполненную
    const task = getByText('Первая активная задача');
    fireEvent.click(task);

    // Проверяем количество активных задач
    await waitFor(() => {
      expect(getByText('Активные задачи: 1')).toBeInTheDocument();
    });
  });
});
