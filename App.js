import React from 'react';
import { UserProvider } from './src/composables/UserContext';
import Navigation from './src/components/Navigation';
const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
