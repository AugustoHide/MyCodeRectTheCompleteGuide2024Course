import { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm({ onSaveExpenseData }) {
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });
  function titleChangeHandler(event) {
    setUserInput((userInput) => {
      return { ...userInput, enteredTitle: event.target.value };
    });
  }
  function AmountChangeHandler(event) {
    setUserInput((userInput) => {
      return { ...userInput, enteredAmount: event.target.value };
    });
  }
  function dateChangeHandler(event) {
    setUserInput((userInput) => {
      return { ...userInput, enteredDate: event.target.value };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    const expenseData = userInput;
    onSaveExpenseData(expenseData);
    setUserInput({ enteredTitle: "", enteredAmount: "", enteredDate: "" });
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            value={userInput.enteredAmount}
            onChange={AmountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            value={userInput.enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
