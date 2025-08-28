import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Complete() {
  const navigate = useNavigate();
  const { device } = useParams();

  return (
    <>
      <Alert variant="success" className="margin-top-20">
        <Alert.Heading>Done!</Alert.Heading>
        <p>
          Your new device <b className="uppercase-text">{device}</b> has been registered successfully. You may proceed to use it with your Google Home app.
        </p>
      </Alert>
      <Button variant="primary" className="margin-top-12" onClick={() => navigate('/register')}>Register another device</Button>{' '}
    </>
  );
}

export default Complete;
