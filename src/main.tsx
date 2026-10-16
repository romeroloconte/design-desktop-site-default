import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import './styles/appearances.css';
import App from './App';
import { TokensPage } from './components/TokensPage';
import { author } from './content/dock';

document.title = `${author.name} — ${author.role}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {location.pathname === '/tokens' ? <TokensPage /> : <App />}
  </StrictMode>,
);
