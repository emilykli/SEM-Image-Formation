import React from 'react';
import './styles/App.css';

import Layout from "./containers/layout";

function App() {
  return (
    <Layout>
      props.child
    </Layout>
  );
}

export default App;
