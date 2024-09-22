import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

export default function NewExpense(props) {
  function saveExpenseData(enteredExpenseData) {
    const expenseData = {
      id: Math.random().toString(),
      date: new Date(enteredExpenseData.enteredDate),
      title: enteredExpenseData.enteredTitle,
      amount: +enteredExpenseData.enteredAmount,
    };
    props.onAddExpense(expenseData);
    return expenseData;
  }
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseData} />
    </div>
  );
}
