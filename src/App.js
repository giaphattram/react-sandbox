import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'
import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'
class App extends Component {
  state = {
    persons: [
      {id: 'id1', name: 'Max', age: 28},
      {id: 'id2', name: 'Min', age: 21},
      {id: 'id3', name: 'Avg', age: 25}
    ],
    credentials: {
      username: "myusername",
      password: "123456"
    },
    assignment: {
      inputText: "",
      letterList: []
    },
    showPersons: false
  }
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {id: 'id1', name: newName, age: 28},
        {id: 'id2', name: 'Min', age: 21},
        {id: 'id3', name: 'Avg', age: 25}
      ]
    })
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    const person = {...this.state.persons[personIndex]}; // create a deep copy of the person object
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex]=person;
    this.setState({persons: persons});
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
    //const persons = this.state.persons; // bad practice: get a reference of the object
    const persons = [...this.state.persons]; // good practice: get a deep copy of the object
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  /*Assignment Methods-------------------------*/
  textChangeHandler = (event) => {
    this.setState({assignment:{
          inputText: event.target.value,
          inputLength: event.target.value.length,
          letterList: event.target.value.split('')
    }});
  }
  letterClickHandler = (index) => {
    const inputText = [...this.state.assignment.inputText];
    inputText.splice(index ,1);
    this.setState({assignment:{
      inputText: inputText.join('')
    }})
    console.log(inputText);
  }
  /*Render Method-------------------------*/
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
                      key={person.id}
                      // Two way to pass the function deletePersonHandler
                      //click={this.deletePersonHandler.bind(this, index)}
                      click={()=>this.deletePersonHandler(index)}
                      changed={(event)=>this.nameChangedHandler(event, person.id)}
                  />
          })}
        </div>
      );
    }
    let letterList = null;
    if (this.state.assignment.inputText.length > 0){
      letterList = (
        <div>
          {this.state.assignment.inputText.split('').map((letter, index) => {
            return <CharComponent
                      letter={letter}
                      key={index}
                      click={()=>this.letterClickHandler(index)}
                   />
          })}
        </div>
      )
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
          <h1>Assignment 1</h1>
          <UserInput changed={this.passwordChangedHandler} />
          <UserOutput
            username={this.state.credentials.username}
            password={this.state.credentials.password}
          />
          <h1>Assignment 2</h1>
          <input type='text' onChange={(event) => this.textChangeHandler(event)} value={this.state.assignment.inputText}/>
          <p>Input Length: {this.state.assignment.inputText.length}</p>
          <ValidationComponent inputLength={this.state.assignment.inputText.length}/>
          {letterList}
        </div>
    );
  }
}

export default App;
