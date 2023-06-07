import { TableLiph, } from "./lib/table/index.js";
const headers = [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email", hidden: true },
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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const table = TableLiph(".table", tableLiphConfig);
    (_a = document.querySelector('[name="load-data"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => table.load(data));
    (_b = document.querySelector('[name="hidden-column-false"]')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => table.setColumnHidden("email", false));
    (_c = document.querySelector('[name="hidden-column-true"]')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => table.setColumnHidden("email", true));
    (_d = document.querySelector('[name="add-data"]')) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        data.push({ age: 17, name: "Dan Ruan", id: data.length });
        table.load(data);
        const el = document.querySelector(`[name="current-page"]`);
        if (el) {
            el.innerHTML = `${table.getPage() + 1}`;
        }
    });
    (_e = document.querySelector('[name="remove-data"]')) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        data.splice(0, 1);
        table.load(data);
        const el = document.querySelector(`[name="current-page"]`);
        if (el) {
            el.innerHTML = `${table.getPage() + 1}`;
        }
    });
    (_f = document.querySelector('[name="preview-page"]')) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
        table.setPage(table.getPage() - 1);
        const el = document.querySelector(`[name="current-page"]`);
        if (el) {
            el.innerHTML = `${table.getPage() + 1}`;
        }
    });
    (_g = document.querySelector('[name="next-page"]')) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
        table.setPage(table.getPage() + 1);
        const el = document.querySelector(`[name="current-page"]`);
        if (el) {
            el.innerHTML = `${table.getPage() + 1}`;
        }
    });
    (_h = document.querySelector('[name="size-table-data"]')) === null || _h === void 0 ? void 0 : _h.addEventListener("change", ({ target }) => {
        // @ts-expect-error
        table.setSize(Number(target.value));
    });
}
window.onload = App;
