import './style/main.scss';
import SelectorWidget from './components/SelectorWidget';
import { ELEMENT_COUNT } from './components/helpers/variables';
import { generateSampleData } from './components/helpers/helpers';
import { type FC } from 'react';

const App: FC = () => {
  return (
    <div className="main-container">
      <SelectorWidget options={generateSampleData(ELEMENT_COUNT)} />
    </div>
  );
}

export default App;
