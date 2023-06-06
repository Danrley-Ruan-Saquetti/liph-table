import { TableLiph, TableLiphOption } from "./lib/table/index.js";

console.clear();

function randomIdInt() {
  const VALUE_MAX = 9999;
  const now = new Date();
  const idString = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(2, '0')}${`${Math.floor(Math.random() * VALUE_MAX)}`.padStart(`${VALUE_MAX}`.length, '0')}`;
  return Number(idString);
}

export interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
}

const data = [
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomIdInt(), age: 18, name: "Dan Ruan" },
]

const tableLiphConfig: TableLiphOption<IUser> = {
  headers: [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email", hidden: true },
  ],
  data,
};

function App() {
  const table = TableLiph(".table", tableLiphConfig);

  document.querySelector('[name="load-data"]')?.addEventListener("click", () => {
    table.load(data)
  })

  document.querySelector('[name="hidden-column-false"]')?.addEventListener("click", () => {
    table.setHidden("email", false)
  })
  document.querySelector('[name="hidden-column-true"]')?.addEventListener("click", () => {
    table.setHidden("email", true)
  })
}

window.onload = App;
