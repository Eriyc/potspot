/**
 * @format
 */

import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import 'react-native';

import Entrypoint from '../src/Entrypoint';

it('renders correctly', () => {
  renderer.create(<Entrypoint />);
});
