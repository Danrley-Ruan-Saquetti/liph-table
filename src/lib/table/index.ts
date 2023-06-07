type TDataProps<T extends object> = Partial<T> & {}

export type TableLiphData<T extends object> = {
    [x in keyof TDataProps<T>]: T[x]
}

export type TableLiphHeader<T extends object> = {
    content: string
    name: keyof T extends string ? string : string
    hidden?: boolean
    index?: boolean
}

export interface TableLiphOption<T extends object> {
    headers: TableLiphHeader<T>[]
    data: TableLiphData<T>[]
}

export interface TableLiphFilter { }

export type TableLiphModel<T extends object> = {
    load: (data: TableLiphData<T>[]) => void
    setColumnHidden: (column: keyof T, value?: boolean) => void
    sortColumn: (column: keyof T) => void
    setPage: (page: number) => void
    setSize: (size: number) => void
    getPage: () => number
}

export function TableLiph<T extends object>(classTable: string, options: TableLiphOption<T>): TableLiphModel<T> {
    const TABLE = document.querySelector(`${classTable}`) as HTMLElement
    let HEADER: HTMLElement
    let BODY: HTMLElement
    let FOOTER: HTMLElement
    let OPTIONS: TableLiphOption<T>
    let DATA: TableLiphData<T>[]

    const STATE = {
        headers: {
            hidden: false,
        },
        filters: {},
        sort: {
            column: "",
            operator: "",
        },
        pagination: {
            page: 0,
            size: 15,
        },
    }

    if (!TABLE) { throw new Error(`Element table not found`) }

    const setup = () => {
        OPTIONS = options
        DATA = options.data

        // # Add Table Wrapper
        const tableWrapper = document.createElement("div")
        HEADER = tableWrapper
        tableWrapper.classList.add("table-wrapper")
        TABLE.appendChild(tableWrapper)

        // # Add Header Wrapper
        const headerWrapper = document.createElement("div")
        HEADER = headerWrapper
        headerWrapper.classList.add("table-header-wrapper")
        tableWrapper.appendChild(headerWrapper)

        // # Add Body Wrapper
        const bodyWrapper = document.createElement("div")
        BODY = bodyWrapper
        bodyWrapper.classList.add("table-body-wrapper")
        tableWrapper.appendChild(bodyWrapper)

        // # Add Footer Wrapper
        const footerWrapper = document.createElement("div")
        FOOTER = footerWrapper
        footerWrapper.classList.add("table-footer-wrapper")
        TABLE.appendChild(footerWrapper)

        loadFooter()
        reload(OPTIONS.data, true)
    }

    // # Util
    const updatePage = (page: number) => {
        console.log(STATE.pagination)
        if (page >= 0 && DATA.length > getRangePageIndex().final) { STATE.pagination.page = page }
        else { STATE.pagination.page = 0 }
        console.log(STATE.pagination)
        console.log("")
    }

    const geTableLiphHeaders = (args?: Partial<TableLiphHeader<T>>) => {
        // @ts-expect-error
        const headers = args && Object.keys(args).length > 0 ? options.headers.filter((_header) => Object.keys(args).find((key) => (typeof _header[`${key}`] == "undefined" && !args[`${key}`]) || _header[`${key}`] === args[`${key}`]
        )) : options.headers

        return headers
    }

    // # Use Case
    const load = (data: TableLiphData<T>[]) => {
        DATA = data
        reload(DATA, STATE.headers.hidden)
    }

    const reload = (data: TableLiphData<T>[] = DATA, forceHeader?: boolean) => {
        const spanLength = FOOTER.querySelector(`[name="table-data-length"]`)
        if (spanLength) { spanLength.innerHTML = `${data.length}` }

        updatePage(getPage())
        forceHeader && loadHeaders()
        loadData(data)
    }

    const loadHeaders = () => {
        // # Add Row Header
        const rowHeader = document.createElement("div")
        rowHeader.classList.add("table-row", "header")

        HEADER.innerHTML = ""

        const headers = geTableLiphHeaders({ hidden: false })

        headers.forEach((_header) => {
            // # Add Header
            const cellHeader = document.createElement("div")
            const btToggleSort = document.createElement("div")
            const content = document.createElement("div")
            const span = document.createElement("span")

            btToggleSort.classList.add("sort-column")
            cellHeader.classList.add("table-header", "cell")
            cellHeader.setAttribute("data-table-header-name", `${_header.name}`)
            span.classList.add("value")

            span.innerHTML = _header.content || ""

            cellHeader.onclick = () => sortColumn(_header.name as keyof T)

            content.appendChild(span)
            content.appendChild(btToggleSort)
            cellHeader.appendChild(content)
            rowHeader.appendChild(cellHeader)
        })

        HEADER.appendChild(rowHeader)

        STATE.headers.hidden = false
    }

    const loadData = (data: TableLiphData<T>[] = DATA) => {
        const headers = geTableLiphHeaders({ hidden: false })
        BODY.innerHTML = ""

        const rangeData = getRangePageData({ data })

        console.log(rangeData)

        for (let i = 0; i < rangeData.length; i++) {
            const _data = rangeData[i]

            // # Add Row
            const rowData = document.createElement("div")
            rowData.classList.add("table-row", "body")

            headers.forEach(({ name }) => {
                // ## Add Data Value
                const cellData = document.createElement("div")

                cellData.classList.add("table-data", "cell")
                // @ts-expect-error
                cellData.setAttribute(name, _data[name] ? `${_data[name]}` : "")

                // @ts-expect-error
                cellData.innerHTML = _data[name] ? `${_data[name]}` : ""

                rowData.appendChild(cellData)
            })

            BODY.appendChild(rowData)
        }
    }

    const loadFooter = () => {
        const footerInfo = document.createElement("div")
        const actions = document.createElement("div")

        const info = document.createElement("div")
        const dataLength = document.createElement("span")

        info.innerHTML = "Total: "
        info.appendChild(dataLength)

        const nav = document.createElement("div")

        dataLength.setAttribute("name", "table-data-length")
        footerInfo.classList.add("footer-content")
        info.classList.add("footer-info")
        nav.classList.add("footer-pagination")

        // footerInfo.appendChild(actions)
        footerInfo.appendChild(info)
        footerInfo.appendChild(nav)

        FOOTER.appendChild(footerInfo)
    }

    const setColumnHidden = (column: keyof T, value = true) => {
        const index = OPTIONS.headers.findIndex((_header) => _header.name == column)

        if (index < 0) { throw new Error(`Column "${typeof column == "string" ? column : ""}" not found`) }

        OPTIONS.headers[index].hidden = value

        STATE.headers.hidden = true
    }

    const sortColumn = (column: keyof T) => {
        STATE.sort.operator = STATE.sort.column == `${column as string}` ? STATE.sort.operator == "ASC" ? "DESC" : "ASC" : "ASC"
        STATE.sort.column = `${column as string}`

        DATA = DATA.sort((a, b) => {
            // ASC
            if (STATE.sort.operator == "ASC") {
                if (!isNaN(Number(a[column])) && !isNaN(Number(b[column]))) { return parseInt(`${a[column]}`) - parseInt(`${b[column]}`) }

                return `${a[column]}`.localeCompare(`${b[column]}`)
            }

            // DESC
            if (!isNaN(Number(a[column])) && !isNaN(Number(b[column]))) { return parseInt(`${b[column]}`) - parseInt(`${a[column]}`) }

            return `${b[column]}`.localeCompare(`${a[column]}`)
        })

        loadData(DATA)
    }

    const getRangePageIndex = (pagination: { page: number, size: number, } = STATE.pagination) => {
        const initial = pagination.page * pagination.size
        const final = initial + pagination.size

        return { initial, final }
    }

    const getRangePageData = ({ data = DATA, pagination = STATE.pagination, }: { data?: TableLiphData<T>[], pagination?: { page: number, size: number } }) => {
        const { final, initial } = getRangePageIndex(pagination)

        return data.filter((_, i) => i >= initial && i <= final)
    }

    const setPage = (page: number) => {
        updatePage(page)
        loadData()
    }

    const setSize = (size: number) => {
        if (size > 0) { STATE.pagination.size = size }
    }

    const getPage = () => STATE.pagination.page

    setup()

    return {
        load,
        setColumnHidden,
        sortColumn,
        setPage,
        setSize,
        getPage
    }
}
