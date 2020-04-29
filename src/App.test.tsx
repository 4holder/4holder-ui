import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('build app and do not throw an error', () => {
  expect(() => render(<App />)).not.toThrow();
});
