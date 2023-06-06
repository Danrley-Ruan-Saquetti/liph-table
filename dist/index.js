import { TableLiph, } from "./lib/table/index.js";
const headers = [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email" },
];
const users = [
    { age: 1, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 1, name: "Dan Ruan" },
    { age: 2, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 3, name: "Dan Ruan" },
    { age: 4, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 5, name: "Dan Ruan" },
    { age: 6, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 7, name: "Dan Ruan" },
    { age: 8, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 9, name: "Dan Ruan" },
    { age: 10, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 1, name: "Dan Ruan" },
    { age: 2, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 3, name: "Dan Ruan" },
    { age: 4, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 5, name: "Dan Ruan" },
    { age: 6, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 7, name: "Dan Ruan" },
    { age: 8, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 9, name: "Dan Ruan" },
    { age: 10, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 1, name: "Dan Ruan" },
    { age: 2, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 3, name: "Dan Ruan" },
    { age: 4, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 5, name: "Dan Ruan" },
    { age: 6, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 7, name: "Dan Ruan" },
    { age: 8, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 9, name: "Dan Ruan" },
    { age: 10, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 3, name: "Dan Ruan" },
    { age: 4, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 5, name: "Dan Ruan" },
    { age: 6, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 7, name: "Dan Ruan" },
    { age: 8, name: "Dan Ruan", email: "dan@liph.com" },
    { age: 9, name: "Dan Ruan" },
    { age: 10, name: "Dan Ruan", email: "dan@liph.com" },
];
const data = users.map((user, i) => (Object.assign(Object.assign({}, user), { id: i + 1 })));
const tableLiphConfig = { headers, data, };
function App() {
    var _a, _b, _c;
    const table = TableLiph(".table", tableLiphConfig);
    (_a = document.querySelector('[name="load-data"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { table.load(data); });
    (_b = document.querySelector('[name="hidden-column-false"]')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => { table.setColumnHidden("email", false); });
    (_c = document.querySelector('[name="hidden-column-true"]')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => { table.setColumnHidden("email", true); });
}
window.onload = App;
