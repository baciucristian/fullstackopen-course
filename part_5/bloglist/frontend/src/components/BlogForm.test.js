import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> at start render just the blog title and author', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'Jest' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'jest.com' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toBe('testing of forms could be easier');
  expect(createBlog.mock.calls[0][1]).toBe('Jest');
  expect(createBlog.mock.calls[0][2]).toBe('jest.com');
});
