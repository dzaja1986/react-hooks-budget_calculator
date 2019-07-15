import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import "./App.css";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];
console.log(initialExpenses);

function App() {
  //*******************state values **************************** */
  //all expanses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({show:false})
  //*******************functionality**************************** */
  //handle charge
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = e => {
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 4000)
  }
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(charge, amount)
    if(charge !== '' && amount > 0) {
     const singleExpense = {id:uuid(), charge, amount};
     setExpenses([...expenses, singleExpense]);
     handleAlert({type:'success', text:'item added'})
     setCharge("");
     setAmount("");
    }
    else {
      //handle alert called
      handleAlert({type:'danger', 
      text:'charge cant be empty value and amount value has to be bigger than zero'})
    }
    };
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
