import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';

import { Home } from './pages/Home'
import { Exercise } from './pages/Exercise'


import './App.scss';


function App() {
  return (
    <div className="App">
      <Navbar color="primary">
        <Navbar.Brand>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container>
            <Navbar.Item href="/">
              Home
            </Navbar.Item>
            <Navbar.Item href="/exercise">
              Exercise
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>

      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/exercise' component={Exercise} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
