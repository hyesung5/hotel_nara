import React from 'react';
import { withRouter } from 'react-router-dom';

const ShowPageInfo = withRouter(({ match, location }) => {
  return <div>현재 위치: {location.pathname}</div>;
});

export default ShowPageInfo;