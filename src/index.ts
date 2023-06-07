import {
  TableLiph,
  TableLiphData,
  TableLiphOption,
  TableLiphHeader,
} from "./lib/table/index.js";

console.clear();

export interface IUser {
  id: number;
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

const data: TableLiphData<IUser>[] = users.map((user, i) => ({
  ...user,
  id: i + 1,
}));

const tableLiphConfig: TableLiphOption<IUser> = { headers, data };

function App() {
  const table = TableLiph(".table", tableLiphConfig);

  table.on("row/select", ({ data }) => console.log(data));
  table.on("body/load", ({ data }) => {});
  table.on("table/build", ({ data }) => {});
  table.on("table/build/pre", ({ data }) => {});
  table.on("body/page/update", () => {
    const el = document.querySelector(`[name="current-page"]`);
    if (el) {
      el.innerHTML = `${table.getCurrentPage()}`;
    }
  });

  document
    .querySelector('[name="load-data"]')
    ?.addEventListener("click", () => table.load(data));
  document
    .querySelector('[name="lenght-pages"]')
    ?.addEventListener("click", () => console.log(table.getPages()));
  document
    .querySelector('[name="hidden-column-false"]')
    ?.addEventListener("click", () => table.setColumnHidden("email", false));
  document
    .querySelector('[name="hidden-column-true"]')
    ?.addEventListener("click", () => table.setColumnHidden("email", true));
  document.querySelector('[name="add-data"]')?.addEventListener("click", () => {
    data.push({ age: 17, name: "Dan Ruan", id: data.length + 1 });
    table.load(data);
  });
  document
    .querySelector('[name="remove-data"]')
    ?.addEventListener("click", () => {
      data.splice(0, 1);
    });

  document
    .querySelector('[name="preview-page"]')
    ?.addEventListener("click", () => {
      table.setPage(table.getCurrentPage() - 1);
    });
  document
    .querySelector('[name="next-page"]')
    ?.addEventListener("click", () => {
      table.setPage(table.getCurrentPage() + 1);
    });

  document
    .querySelector('[name="size-table-data"]')
    ?.addEventListener("change", ({ target }) => {
      // @ts-expect-error
      table.setSize(Number(target.value));
    });

  const elSize = document.querySelector(
    '[name="size-table-data"]'
  ) as HTMLInputElement;
  if (elSize) elSize.value = `${table.getSize()}`;
  const elPage = document.querySelector(
    '[name="current-page"]'
  ) as HTMLInputElement;
  if (elPage) elPage.innerHTML = `${table.getCurrentPage()}`;
}

window.onload = App;
