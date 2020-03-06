import React, { Component } from 'react';

import { Provider } from 'react-redux';

import store from './store/history';

import TodoList from './components/TudoList';
import Counter from './components/Counter';

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <TodoList />
        <Counter />
      </Provider>
    );
  }
}

 
export default App;
