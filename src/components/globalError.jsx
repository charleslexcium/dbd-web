import React from 'react';

class GlobalError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // eslint-disable-next-line
    console.log("TTTTT", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    console.log("BBBBBB", error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default GlobalError;
