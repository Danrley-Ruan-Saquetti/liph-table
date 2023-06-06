import { TableLiph, TableLiphData, TableLiphOption, TableLiphHeader, } from "./lib/table/index.js"

export interface IUser {
    id: number
    name: string
    age: number
    email: string
}

const headers: TableLiphHeader<IUser>[] = [
    { name: "id", content: "#", index: true },
    { name: "age", content: "Idade" },
    { name: "name", content: "Nome" },
    { name: "email", content: "Email" },
]

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
]

const data: TableLiphData<IUser>[] = users.map((user, i) => ({ ...user, id: i + 1, }))

const tableLiphConfig: TableLiphOption<IUser> = { headers, data, }

function App() {
    const table = TableLiph(".table", tableLiphConfig)

    document.querySelector('[name="load-data"]')?.addEventListener("click", () => { table.load(data) })
    document.querySelector('[name="hidden-column-false"]')?.addEventListener("click", () => { table.setColumnHidden("email", false) })
    document.querySelector('[name="hidden-column-true"]')?.addEventListener("click", () => { table.setColumnHidden("email", true) })
}

window.onload = App
