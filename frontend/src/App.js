import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home'
import ProductDetail from './components/product/ProductDetail';
import Login from './components/user/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetail} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
