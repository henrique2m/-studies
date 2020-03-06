import React, { Component} from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import * as todoActions from '../../actions'

class TodoList extends Component {
    constructor(props){
        super(props);

        console.log(props)
        console.log(props.todos)
    }

    state ={
        newTodoText: '',
        info: ''
    };

    addNewTodo = () => {

        const { newTodoText } = this.state; 

        if(newTodoText === ''){ 
            this.setState({ info: 'Informe um item!'});
            return;
        }else{
            this.setState({ info: ''});
        }

        this.props.addTodo(this.state.newTodoText);

        this.setState({ newTodoText: ''});
    };
    
    

    render(){
        const { newTodoText, info } = this.state; 
        return(
            <div>
                <ul>
                  {this.props.todos.map(todo => (
                      <li key={todo.id}>{todo.text} </li>
                  ))}
                </ul>
    
                <input 
                    name= "todo" 
                    type="text"
                    value={ newTodoText}
                    onChange={(e) => this.setState({ newTodoText: e.target.value})}
                 />

                 <span> {info} </span>
    
                <button onClick={this.addNewTodo}> Novo Todo </button>
            </div>
        );
    } 
}

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => bindActionCreators(todoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
