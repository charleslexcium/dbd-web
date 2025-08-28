import React from 'react';
import { Alert } from 'react-bootstrap';

function NotFound() {
  return (
    <Alert className="margin-top-20" variant="secondary">
      <Alert.Heading>Sorry</Alert.Heading>
      <p>
        The page you are looking for does not exist.
      </p>
      <hr />
      <p className="mb-0">
        Go: <a href="/">home</a>.
      </p>
    </Alert>
  );
}

export default NotFound;
