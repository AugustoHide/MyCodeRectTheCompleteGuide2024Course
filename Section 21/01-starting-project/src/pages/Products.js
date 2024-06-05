import { Link } from "react-router-dom";

//his is to simulate as if getting data from backend
const PRODUCTS = [
  { id: "prod1", title: "Product One" },
  { id: "prod2", title: "Product Two" },
  { id: "prod3", title: "Product Three" },
];

export default function ProductsPage() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={`${prod.id}`}>{prod.id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
