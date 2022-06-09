import {rollbar} from 'core';
import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {showErrorMessage} from 'ui/utils';
import {ErrorFallback} from './ErrorFallback';

setJSExceptionHandler((error, isFatal) => {
  if (error.message && !error.message.includes('permanent error: Canceled')) {
    rollbar.error(error);
  }

  showErrorMessage(error.message);
}, true);

//For most use cases:
setNativeExceptionHandler(exceptionString => {
  console.error({exceptionString});
  // This is your custom global error handler
  // You do stuff likehit google analytics to track crashes.
  // or hit a custom api to inform the dev team.
  //NOTE: alert or showing any UI change via JS
  //WILL NOT WORK in case of NATIVE ERRORS.
  rollbar.critical(exceptionString);
});

const myErrorHandler = (error: Error) => {
  console.log('error:!', error);
  //   captureException(error);
};

export const ErrorHandler = ({children}: {children: React.ReactNode}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
