//import logo from './logo.svg';
import './App.css';
import Footer from './components/footer';
import Header from './components/header/index';

import Routes from './components/routes';



function App() {
  return (
    <div className="App">

      <Header/>
      <Routes/>
      <Footer/>
     
    
    </div>
  );
}

export default App;
