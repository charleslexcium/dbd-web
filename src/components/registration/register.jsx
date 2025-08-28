import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import { Alert, Button, Form, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [error, setError] = useState('');
  const [viewData, setViewData] = useState([]);
  const [mode, setMode] = useState('model-selection');

  const pmodel = searchParams.get('model');
  const pserial = searchParams.get('serial');
  const [postData, setPostData] = useState({ model: pmodel?.toUpperCase() || '', serial_number: pserial?.toUpperCase() || '' });

  const empty = (v) => v === undefined || v === null || v === '';

  const validate = (d, m) => {
    if (!empty(postData.model)) {
      const ml = d.filter((dd) => dd.name === m);

      if (ml.length === 0) {
        setError(`'${postData.model}' is not a valid model, select one from the list below`);
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (!initialized) {
      return;
    }

    axios.create({
      baseURL: process.env.REACT_APP_BFF_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`,
      },
    }).get('/models').then((response) => {
      if (response.data.status === 'ok') {
        setViewData(response.data.data);
        validate(response.data, postData.model);
      } else {
        setError(response.data.error.message);
      }
    }).catch((err) => {
      if (err.response?.status === 401) {
        keycloak.login({
          redirectUri: `${process.env.REACT_APP_URL}/register`,
        });
        // navigate('/');
      } else {
        setError(err.message);
      }
    });
  }, [initialized]);

  const clear = () => {
    setPostData({ model: '', serial_number: '' });
    setMode('model-selection');
    setError('');
  };

  const selectItem = (item) => {
    setError('');
    setPostData({ model: item?.toUpperCase(), serial_number: postData?.serial_number?.toUpperCase() });
  };

  const next = () => {
    if (validate(viewData, postData.model)) {
      setMode('serial-input');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    // const response = await axios.create({
    axios.create({
      baseURL: process.env.REACT_APP_BFF_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`,
      },
    }).post('/register', postData, {
      withCredentials: true,
    }).then((response) => {
      if (response.data.status === 'ok') {
        navigate(`/complete/${encodeURIComponent(`${postData.model}/${postData.serial_number}`)}`);
      } else {
        setError(response.data.error.message);
      }
    }).catch((err) => {
      setError(err.message);
    });
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value.toUpperCase() });
  };

  return (
    <>
      {
        keycloak.authenticated && viewData?.length > 0 && (
          <>
            {
              mode === 'model-selection' && (
                <>
                  <h5 className="margin-top-20">Select device model</h5>
                  {
                    error && (
                      <Alert key="danger" variant="danger">
                        {error}
                      </Alert>
                    )
                  }
                  <ListGroup variant="flush">
                    {viewData.map((item, i) => (
                      <ListGroup.Item key={i} action onClick={() => selectItem(item.name)} active={postData.model === item.name}>
                        {item.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button variant="primary" className="margin-top-12" onClick={next} disabled={empty(postData.model)}>Next</Button>
                </>
              )
            }
            {
              mode === 'serial-input' && (
                <>
                  <h5 className="margin-top-20">{`Enter serial number for ${postData.model}`}</h5>
                  {
                    error && (
                      <Alert key="danger" variant="danger">
                        {error}
                      </Alert>
                    )
                  }
                  <Form onSubmit={handleSubmit}>
                    <Form.Control className="uppercase-text" onChange={handleChange} name="serial_number" value={postData.serial_number} />
                    <Button variant="secondary" className="margin-top-12" onClick={() => clear()}>Cancel</Button>{' '}
                    <Button variant="primary" className="margin-top-12" disabled={empty(postData.serial_number)} type="submit">Register</Button>{' '}
                  </Form>
                </>
              )
            }
          </>
        )
      }
    </>
  );
}

export default Register;
