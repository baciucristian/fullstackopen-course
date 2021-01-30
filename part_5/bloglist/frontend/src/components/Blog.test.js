import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('at start render just the blogs title and author ', () => {
  const blog = {
    id: 965734074,
    title: 'Why to learn programming?',
    author: 'Cristian Baciu',
    url: 'cristianbaciu.com',
    likes: 2,
    user: {
      name: 'BaciuNess',
    },
  };

  const addLike = jest.fn();
  const deleteBlog = jest.fn();

  const component = render(
    <Blog blog={blog} addlike={addLike} deleteBlog={deleteBlog} />
  );

  const div = component.container.querySelector('.togglableContent');

  expect(component.container).toHaveTextContent('Why to learn programming?');
  expect(component.container).toHaveTextContent('Cristian Baciu');
  expect(div).toHaveStyle('display: none');
});
