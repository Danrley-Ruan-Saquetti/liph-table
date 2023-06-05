import { TableLiph, TableLipthOption } from "./lib/table/index.js";

console.clear();

export interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
}

const tableLiphConfig: TableLipthOption<IUser> = {
  headers: [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email", visible: false },
  ],
  data: [
    { id: "1", age: 18, name: "Dan Ruan", email: "dan@liph.com" },
    { id: "2", age: 18, name: "Dan Ruan" },
    { id: "3", age: 18, name: "Dan Ruan", email: "dan@liph.com" },
    { id: "4", age: 18, name: "Dan Ruan" },
    { id: "5", age: 18, name: "Dan Ruan", email: "dan@liph.com" },
  ],
};

function App() {
  const table = TableLiph(".table", tableLiphConfig);
}

window.onload = App;
