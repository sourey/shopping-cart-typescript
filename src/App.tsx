import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Checkout from "./components/Checkout/Checkout";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="*" render={() => <h3>404 Not found.</h3>} />
        </Switch>
      </>
    );
  }
}

export default App;
