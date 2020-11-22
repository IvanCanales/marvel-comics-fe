import React from "react";
import { Route, Switch } from "react-router-dom";

import Characters from "../containers/Characters";
import CharacterDetails from "../containers/CharacterDetails";

const CharacterNavigation = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={CharacterDetails} />
      <Route path={match.path} component={Characters} />
    </Switch>
  );
};

export default CharacterNavigation;
