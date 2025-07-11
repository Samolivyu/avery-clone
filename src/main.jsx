import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error('Failed to find the root element');
}