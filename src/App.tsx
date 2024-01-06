import './style/main.scss';
import SelectorWidget from './components/SelectorWidget';
import { ELEMENT_COUNT } from './components/helpers/variables';
import { generateSampleData } from './components/helpers/helpers';

const App = () => {
  return (
    <div className="main-container">
      <SelectorWidget options={generateSampleData(ELEMENT_COUNT)} />
    </div>
  );
}

export default App;
