import { Action, Getter, Mutation, State, namespace } from 'vueclass';

export default name => {
  return {
    Action: namespace(name, Action),
    Getter: namespace(name, Getter),
    Mutation: namespace(name, Mutation),
    State: namespace(name, State),
  };
};
