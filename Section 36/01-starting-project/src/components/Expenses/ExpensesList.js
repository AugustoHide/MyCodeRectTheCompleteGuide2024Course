import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./ExpensesList.css";
import ExpensesFilter from "./ExpensesFilter";

export default function ExpensesList({ expenses }) {
  return (
    <Card className="expenses">
      <ExpensesFilter expenses={expenses} />
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
}
