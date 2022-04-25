import Home from './views/home/Home';
import Login from './views/login__sign-up/Login';
import Sign__up from './views/login__sign-up/Sign__up';
import Product from './views/product/Product';
import Cart from './views/cart/Cart';
import Change__pass from './views/change-pass/Change__pass';
import User from './views/user/User';
import Admin from './views/admin/Admin';
import Admin__header from './components/admin__header/Admin__header';

function App() {

  const number = 2;

  return <div className="App">
    {/* <Login /> */}
    {/* <Sign__up/> */}
    {/* <Home/> */}
    {/* <Product/> */}
    {/* <Cart/> */}
    {/* <Change__pass/> */}
    {/* <User/> */}
    {/* <Admin__header/> */}
    <Admin/>
  </div>;
}

export default App;
