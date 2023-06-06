import { TableLiph } from "./lib/table/index.js";
console.clear();
function randomIdInt() {
    const VALUE_MAX = 9999;
    const now = new Date();
    const idString = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(2, '0')}${`${Math.floor(Math.random() * VALUE_MAX)}`.padStart(`${VALUE_MAX}`.length, '0')}`;
    return Number(idString);
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
];
const tableLiphConfig = {
    headers: [
        { name: "id", content: "#", index: true },
        { name: "age", content: "Idade" },
        { name: "name", content: "Nome" },
        { name: "email", content: "Email", hidden: true },
    ],
    data,
};
function App() {
    var _a, _b, _c;
    const table = TableLiph(".table", tableLiphConfig);
    (_a = document.querySelector('[name="load-data"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        table.load(data);
    });
    (_b = document.querySelector('[name="hidden-column-false"]')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        table.setHidden("email", false);
    });
    (_c = document.querySelector('[name="hidden-column-true"]')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        table.setHidden("email", true);
    });
}
window.onload = App;
