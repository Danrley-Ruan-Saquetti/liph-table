import {
  TableLiph,
  TableLiphData,
  TableLiphOption,
  TableLiphHeader,
} from "./lib/table/index.js";

console.clear();

function randomId() {
  const VALUE_MAX = 9999;
  const now = new Date();
  const idString = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(
    2,
    "0"
  )}${`${Math.floor(Math.random() * VALUE_MAX)}`.padStart(
    `${VALUE_MAX}`.length,
    "0"
  )}`;
  return idString;
}

export interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
}

const headers: TableLiphHeader<IUser>[] = [
  { name: "id", content: "#", index: true },
  { name: "age", content: "Idade" },
  { name: "name", content: "Nome" },
  { name: "email", content: "Email", hidden: true },
];

const data: TableLiphData<IUser>[] = [
  { id: randomId(), age: 1, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomId(), age: 1, name: "Dan Ruan" },
  { id: randomId(), age: 2, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomId(), age: 3, name: "Dan Ruan" },
  { id: randomId(), age: 4, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomId(), age: 5, name: "Dan Ruan" },
  { id: randomId(), age: 6, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomId(), age: 7, name: "Dan Ruan" },
  { id: randomId(), age: 8, name: "Dan Ruan", email: "dan@liph.com" },
  { id: randomId(), age: 9, name: "Dan Ruan" },
  { id: randomId(), age: 10, name: "Dan Ruan", email: "dan@liph.com" },
];

const tableLiphConfig: TableLiphOption<IUser> = {
  headers,
  data,
};

function App() {
  const table = TableLiph(".table", tableLiphConfig);

  document
    .querySelector('[name="load-data"]')
    ?.addEventListener("click", () => {
      table.load(data);
    });

  document
    .querySelector('[name="hidden-column-false"]')
    ?.addEventListener("click", () => {
      table.setColumnHidden("email", false);
    });
  document
    .querySelector('[name="hidden-column-true"]')
    ?.addEventListener("click", () => {
      table.setColumnHidden("email", true);
    });
}

window.onload = App;
