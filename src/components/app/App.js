import AppHeader from '../appHeader/AppHeader';
import CurrencyConverter from '../currencyExchange/CurrencyConverter';
import './app.scss'

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <CurrencyConverter/>
    </div>
  );
}

export default App;
