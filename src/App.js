import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/ebank/login" component={LoginRoute} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
