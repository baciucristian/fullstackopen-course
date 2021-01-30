import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
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

    component = render(
      <Blog blog={blog} addlike={addLike} deleteBlog={deleteBlog} />
    );
  });

  test('at start render just the blog title and author', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(component.container).toHaveTextContent('Why to learn programming?');
    expect(component.container).toHaveTextContent('Cristian Baciu');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
});
