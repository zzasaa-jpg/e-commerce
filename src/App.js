import './App.css';
import Navbar from './componentes/Navbar';
import TopNavbar from './componentes/TopNavbar';
import Prd from './componentes/Prd';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './componentes/Layout';
import Buy from './componentes/Buy';
import Cart from './componentes/Cart'
import { ShopContextProvider } from './context/Shop_context';
import Search from './componentes/Search';
import GoogleAuthentication from './FireBase/GoogleAuthentication ';
import Userinfo from './UserInfo/Userinfo';
import PrivateRoute from './componentes/Private';
import SignIn from './FireBase/SignIn';

function App() {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <div className="App font-mont">
          < TopNavbar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/app" element={<Layout />} />
              <Route path='/categories' element={<Navbar />} />
              <Route path='/prd/:id' element={<Prd />} />
              <Route path='/buy/:product' element={<Buy />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/search' element={<Search />} />
              <Route path='/user-info' element={<Userinfo />} />
            </Route>
            <Route path='/' element={<GoogleAuthentication />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </div>
      </ShopContextProvider>
    </BrowserRouter>

  );
}

export default App;