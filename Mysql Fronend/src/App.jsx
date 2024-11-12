import { useState } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeesList, setEmployeesList] = useState([]);

  const addEmployee = () => {
    axios.post('http://localhost:8000/create',
      { name: name, age: age, country: country, position: position, wage: wage }
    ).then(() => {
      console.log("Success");
    })
  }

  const getEmployees = () => {
    axios.get("http://localhost:8000/employees").then((response) => {
      console.log(response);
      setEmployeesList(response.data);
    });
  }

  return (
    <>
      <div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            onChange={
              (event) => {
                setName(event.target.value);
              }} />
          <label>Age: </label>
          <input type="number"
            onChange={
              (event) => {
                setAge(event.target.value);
              }}
          />
          <label>Country: </label>
          <input type="text"
            onChange={
              (event) => {
                setCountry(event.target.value);
              }}
          />
          <label>Position: </label>
          <input type="text"
            onChange={
              (event) => {
                setPosition(event.target.value);
              }}
          />
          <label>Wage: </label>
          <input type="number"
            onChange={
              (event) => {
                setWage(event.target.value);
              }}
          />

          <button onClick={addEmployee}>Add Employee</button>
        </div>
        <hr />
        <div>
          <button className='employees' onClick={getEmployees}>Show Employees</button>
          {employeesList.map((val, key) => (
            <div key={key} className='employee'>
              <p >Name: {val.name}</p>
              <p >Age: {val.age}</p>
              <p >Country: {val.country}</p>
              <p >Position: {val.position}</p>
              <p >Wage: {val.wage}</p>
            </div>
            
          ))}
        </div>
      </div>
    </>
  )
}

export default App
