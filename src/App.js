import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Min', age: 21},
      {name: 'Avg', age: 25}
    ],
    credentials: {
      username: "myusername",
      password: "123456"
    },
    showPersons: false
  }
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age: 28},
        {name: 'Min', age: 21},
        {name: 'Avg', age: 25}
      ]
    })
  }
  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: "Maximilian", age: 28},
        {name: event.target.value, age: 21},
        {name: 'Avg', age: 25}
      ]
    })
  }
  passwordChangedHandler = (event) => {
    this.setState({
      credentials:{
        username: "myusername",
        password: event.target.value
      }
    })

  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let persons = null;
    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
                      name={person.name}
                      age={person.age}
                      click={this.deletePersonHandler(index)} />
          })}
        </div>
      );
    }
    return (
        <div className='App'>
          <h1>Hi, I'm a React app</h1>
          <p>This is really working!</p>
          <button
            style={style}
            onClick={this.switchNameHandler.bind(this, 'Maximilian')}>Switch Name</button>
          <button onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
          <h1>Assignment Area</h1>
          <UserInput changed={this.passwordChangedHandler} />
          <UserOutput
            username={this.state.credentials.username}
            password={this.state.credentials.password}
          />
        </div>
    );
  }
}

export default App;
