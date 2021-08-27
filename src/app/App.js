import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routeConfigs from "./routeConfigs";


function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            {
              routeConfigs().map( ({exact, path, component }) => (
                  <Route
                      key={path}
                      exact={exact}
                      path={path}
                      component={component}
                  />
              ))
            }
          </Switch>
        </Router>
      </div>
  );
}

export default App;
