import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Carditem from './components/Carditem';
import {getProducts} from './CallApis';

function App() {
  const products=getProducts();
  return (
    <div>
      {/* <Header/>
       
      <Footer/> */}
    </div>
  );
}

export default App;
