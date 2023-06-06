import { TableLiph, } from "./lib/table/index.js";
console.clear();
function randomId() {
    const VALUE_MAX = 9999;
    const now = new Date();
    const idString = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(2, "0")}${`${Math.floor(Math.random() * VALUE_MAX)}`.padStart(`${VALUE_MAX}`.length, "0")}`;
    return idString;
}
const headers = [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email", hidden: true },
];
const data = [
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
const tableLiphConfig = {
    headers,
    data,
};
function App() {
    var _a, _b, _c;
    const table = TableLiph(".table", tableLiphConfig);
    (_a = document
        .querySelector('[name="load-data"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        table.load(data);
    });
    (_b = document
        .querySelector('[name="hidden-column-false"]')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        table.setColumnHidden("email", false);
    });
    (_c = document
        .querySelector('[name="hidden-column-true"]')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        table.setColumnHidden("email", true);
    });
}
window.onload = App;
