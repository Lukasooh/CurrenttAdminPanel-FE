import React from 'react';
import { ItemForm } from './features/items/components/ItemForm';
import { ItemList } from './features/items/components/ItemList';
import { LoginForm } from './features/auth/components/LoginForm';

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Items</h1>
      <ItemForm onAdd={() => window.location.reload()} />
      <ItemList />
      <LoginForm />
    </div>
  );
};

export default App;
