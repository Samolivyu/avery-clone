import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Keep this here

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter> {/* This is your single, top-level router */}
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  console.error('Failed to find the root element');
}