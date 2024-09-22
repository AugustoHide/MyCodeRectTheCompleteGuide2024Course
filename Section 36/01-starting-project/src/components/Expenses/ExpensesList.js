import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./ExpensesList.css";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesChart from "./ExpensesChart";

export default function ExpensesList({ expenses }) {
  const [yearFilter, setYearFilter] = useState(2022);
  function onYearSelection(selectedYear) {
    setYearFilter(selectedYear);
  }
  const filteredExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear() === parseInt(yearFilter);
  });

  return (
    <Card className="expenses">
      <ExpensesFilter expenses={expenses} onYearSelection={onYearSelection} />
      <ExpensesChart expenses={filteredExpenses} />
      {filteredExpenses.length === 0 ? (
        <p>No expenses registered yet!</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))
      )}
    </Card>
  );
}
