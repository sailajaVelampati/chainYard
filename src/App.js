import React from "react";
import { Route } from "react-router-dom";
import BlockListPage from "./components/blockList";
import BlockDetailsPage from "./components/blockDetails";
import TransactionDetailsPage from "./components/transactionDetails";
function App() {
  return (
    <div className="container-fluid">
      <Route exact path="/" component={BlockListPage}></Route>
      <Route path="/block/:id" component={BlockDetailsPage}></Route>
      <Route path="/transaction/:id" component={TransactionDetailsPage}></Route>
    </div>
  );
}

export default App;
