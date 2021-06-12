
import './App.css';
import Header from './components/Header';
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import Schedule from './components/Schedule';

function App() {
  return (
    <Provider store={Store}>
      <Header/>

     <div className="container" >
     <Schedule/> 

     </div>

    </Provider>
  );
}

export default App;
