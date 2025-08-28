import './App.css';
import React from 'react';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalError from './components/globalError';
import PrivacyPolicy from './components/privacyPolicy';
import TermsOfService from './components/termsOfService';
import NotFound from './components/notFound';
import Home from './components/home';
import PrivateRoute from './helpers/privateRoute';
import logo from './images/logo64.png';

function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary FallbackComponent={GlobalError}>
      <Container>
        <Row className="abase">
          <Col md="auto" xs="auto"><Image src={logo} className="logo48" rounded /></Col>
          <Col className="hh1">dbd</Col>
        </Row>
      </Container>
      <Container>
        <Outlet />
      </Container>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/terms-of-service', element: <TermsOfService /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <Container className="p-3">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
