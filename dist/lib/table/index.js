import { ObserverEvent } from "./util/observer.js";
export function TableLiph(classTable, options) {
    const TABLE = document.querySelector(`${classTable}`);
    let HEADER;
    let BODY;
    let FOOTER;
    let OPTIONS;
    let DATA;
    const observer = ObserverEvent();
    const STATE = {
        headers: {
            hidden: false,
        },
        dataSelected: [],
        filters: {},
        sort: {
            column: "",
            operator: "",
        },
        pagination: {
            page: 0,
            size: 15,
        },
    };
    if (!TABLE) {
        throw new Error(`Element table not found`);
    }
    const setup = (args) => {
        OPTIONS = Object.assign(Object.assign({}, args), (typeof args.selectRow == "undefined" && {
            selectRow: true,
        }));
        DATA = args.data;
        if (typeof OPTIONS.selectRow == "object") {
            if (OPTIONS.selectRow.addColumnSelect) {
                OPTIONS.headers.push({
                    name: "__select",
                    content: '<span><input type="checkbox" name="select-all-data" /></span>',
                    $type: "select",
                });
            }
        }
        observer.emit("table/build/pre", { data: TABLE });
        // # Add Table Wrapper
        const tableWrapper = document.createElement("div");
        HEADER = tableWrapper;
        tableWrapper.classList.add("table-wrapper");
        TABLE.appendChild(tableWrapper);
        // # Add Header Wrapper
        const headerWrapper = document.createElement("div");
        HEADER = headerWrapper;
        headerWrapper.classList.add("table-header-wrapper");
        tableWrapper.appendChild(headerWrapper);
        // # Add Body Wrapper
        const bodyWrapper = document.createElement("div");
        BODY = bodyWrapper;
        bodyWrapper.classList.add("table-body-wrapper");
        tableWrapper.appendChild(bodyWrapper);
        // # Add Footer Wrapper
        const footerWrapper = document.createElement("div");
        FOOTER = footerWrapper;
        footerWrapper.classList.add("table-footer-wrapper");
        TABLE.appendChild(footerWrapper);
        observer.emit("table/build", { data: TABLE });
        loadFooter();
        loadComponents({ data: OPTIONS.data, forceHeader: true });
    };
    // # Util
    const getColumn = () => {
        return OPTIONS.headers.find((_header) => _header.index) || null;
    };
    const updatePage = (page) => {
        STATE.pagination.page = page < 0 || page >= getPages() ? 0 : page;
        observer.emit("body/page/update", { data: STATE.pagination.page });
    };
    const geTableLiphHeaders = (args) => {
        const headers = args && Object.keys(args).length > 0
            ? OPTIONS.headers.filter((_header) => {
                let isSelected = true;
                for (const key in args) {
                    if (!(typeof _header[`${key}`] == "undefined" ||
                        _header[`${key}`] === args[`${key}`])) {
                        isSelected = false;
                        break;
                    }
                }
                return isSelected;
            })
            : OPTIONS.headers;
        return headers;
    };
    // # Use Case
    // ## Load Components
    const load = (data) => {
        DATA = data;
        loadComponents({ data: DATA, forceHeader: STATE.headers.hidden });
    };
    const loadComponents = (args) => {
        const { data = DATA, forceHeader, pagination = STATE.pagination, } = args || {
            data: DATA,
            forceHeader: false,
            pagination: STATE.pagination,
        };
        const spanLength = FOOTER.querySelector(`[name="table-data-length"]`);
        if (spanLength) {
            spanLength.innerHTML = `${data.length}`;
        }
        updatePage(pagination.page);
        forceHeader && loadHeaders();
        loadData({ data, pagination });
    };
    const loadHeaders = () => {
        // # Add Row Header
        const rowHeader = document.createElement("div");
        rowHeader.classList.add("table-row", "header");
        HEADER.innerHTML = "";
        let headers = geTableLiphHeaders({ hidden: false, $type: "select" });
        headers = [
            ...headers.filter((_h) => _h.$type == "select"),
            ...headers.filter((_h) => typeof _h.$type == "undefined"),
        ];
        headers.forEach((_header) => {
            // # Add Header
            const cellHeader = document.createElement("div");
            const content = document.createElement("div");
            const span = document.createElement("span");
            cellHeader.classList.add("table-header", "cell");
            cellHeader.setAttribute("data-table-header-name", `${_header.name}`);
            span.classList.add("value");
            span.innerHTML = _header.content || "";
            if (_header.$type != "select") {
                const btToggleSort = document.createElement("div");
                btToggleSort.classList.add("sort-column");
                content.appendChild(btToggleSort);
                cellHeader.onclick = () => sortColumn(_header.name);
            }
            else {
                const inputSelectAllData = cellHeader.querySelector('div span.value span input[type="checkbox"][name="select-all-data"]');
                console.log(cellHeader);
                console.log(inputSelectAllData);
                if (inputSelectAllData) {
                    inputSelectAllData.onclick = () => {
                        updateDataSelected([], false);
                        console.log(STATE.dataSelected);
                    };
                }
            }
            content.appendChild(span);
            cellHeader.appendChild(content);
            rowHeader.appendChild(cellHeader);
        });
        HEADER.appendChild(rowHeader);
        STATE.headers.hidden = false;
    };
    const loadData = ({ data = DATA, pagination, }) => {
        let headers = geTableLiphHeaders({ hidden: false });
        BODY.innerHTML = "";
        headers = [
            ...headers.filter((_h) => _h.$type == "select"),
            ...headers.filter((_h) => typeof _h.$type == "undefined"),
        ];
        clearDataSelected();
        const rangeData = getRangePageData({ data, pagination });
        for (let i = 0; i < rangeData.length; i++) {
            const _data = rangeData[i];
            // # Add Row
            const rowData = document.createElement("div");
            rowData.classList.add("table-row", "body");
            headers.forEach(({ name, $type }) => {
                const ref = !$type
                    ? // @ts-expect-error
                        _data[name]
                    : $type == "select"
                        ? '<span><input type="checkbox" /></span>'
                        : "";
                // ## Add Data Value
                const cellData = document.createElement("div");
                cellData.classList.add("table-data", "cell");
                $type == "select" && cellData.classList.add("select");
                cellData.setAttribute(name, ref ? `${ref}` : "");
                cellData.innerHTML = ref ? `${ref}` : "";
                rowData.appendChild(cellData);
            });
            const columnIndex = getColumn();
            if (columnIndex) {
                // @ts-expect-error
                rowData.setAttribute("data-row-index", `${_data[columnIndex.name]}`);
            }
            BODY.appendChild(rowData);
        }
        typeof OPTIONS.selectRow != "undefined" &&
            OPTIONS.selectRow &&
            setupSelected();
        observer.emit("body/load", { data: rangeData });
    };
    const setupSelected = () => {
        const rows = BODY.querySelectorAll(".table-row.body");
        rows.forEach((row) => {
            const index = row.getAttribute("data-row-index");
            row.onclick = ({ ctrlKey }) => {
                updateDataSelected([index], ctrlKey);
            };
        });
    };
    const loadFooter = () => {
        const footerInfo = document.createElement("div");
        const actions = document.createElement("div");
        const info = document.createElement("div");
        const dataLength = document.createElement("span");
        info.innerHTML = "Total: ";
        info.appendChild(dataLength);
        const nav = document.createElement("div");
        dataLength.setAttribute("name", "table-data-length");
        footerInfo.classList.add("footer-content");
        info.classList.add("footer-info");
        nav.classList.add("footer-pagination");
        // footerInfo.appendChild(actions)
        footerInfo.appendChild(info);
        footerInfo.appendChild(nav);
        FOOTER.appendChild(footerInfo);
    };
    const loadDataSelected = (data) => {
        BODY.querySelectorAll(".table-data-selected").forEach((row) => row.classList.toggle("table-data-selected", false));
        const rows = [];
        data.forEach((index) => {
            const row = BODY.querySelector(`[data-row-index="${index}"]`);
            if (row) {
                row.classList.add("table-data-selected");
                rows.push(row);
            }
        });
        return rows;
    };
    // ## Column
    const setColumnHidden = (column, value = true) => {
        const index = OPTIONS.headers.findIndex((_header) => _header.name == column);
        if (index < 0) {
            throw new Error(`Column "${typeof column == "string" ? column : ""}" not found`);
        }
        OPTIONS.headers[index].hidden = value;
        STATE.headers.hidden = true;
    };
    const sortColumn = (column) => {
        STATE.sort.operator =
            STATE.sort.column == `${column}`
                ? STATE.sort.operator == "ASC"
                    ? "DESC"
                    : "ASC"
                : "ASC";
        STATE.sort.column = `${column}`;
        DATA = DATA.sort((a, b) => {
            // ASC
            if (STATE.sort.operator == "ASC") {
                if (!isNaN(Number(a[column])) && !isNaN(Number(b[column]))) {
                    return parseInt(`${a[column]}`) - parseInt(`${b[column]}`);
                }
                return `${a[column]}`.localeCompare(`${b[column]}`);
            }
            // DESC
            if (!isNaN(Number(a[column])) && !isNaN(Number(b[column]))) {
                return parseInt(`${b[column]}`) - parseInt(`${a[column]}`);
            }
            return `${b[column]}`.localeCompare(`${a[column]}`);
        });
        loadData({ data: DATA });
    };
    // ## Data
    const updateDataSelected = (indexes, isMaintain) => {
        indexes.forEach((index) => {
            const indexAlreadySelected = STATE.dataSelected.findIndex((data) => data == `${index}`);
            !isMaintain && clearDataSelected();
            if (indexAlreadySelected < 0) {
                STATE.dataSelected.push(`${index}`);
            }
            else {
                STATE.dataSelected.splice(indexAlreadySelected, 1);
            }
        });
        const rows = loadDataSelected(STATE.dataSelected);
        observer.emit("row/select", { data: { values: STATE.dataSelected, rows } });
    };
    const clearDataSelected = () => {
        STATE.dataSelected.splice(0, STATE.dataSelected.length);
        loadDataSelected(STATE.dataSelected);
    };
    // ## Page
    const getRangePageIndex = (pagination = STATE.pagination) => {
        const initial = pagination.page * pagination.size;
        const final = initial + pagination.size;
        return { initial, final };
    };
    const getRangePageData = ({ data = DATA, pagination = STATE.pagination, }) => {
        const { final, initial } = getRangePageIndex(pagination);
        return data.filter((_, i) => i >= initial && i < final);
    };
    const setPage = (page) => {
        if (page <= 0 || page > getPages()) {
            return;
        }
        loadComponents({
            pagination: { page: page - 1, size: STATE.pagination.size },
        });
    };
    const setSize = (size) => {
        if (size >= 0) {
            STATE.pagination.size = size;
        }
        loadComponents();
    };
    const getPages = () => {
        return Math.ceil(DATA.length / STATE.pagination.size);
    };
    const getSize = () => STATE.pagination.size;
    const getCurrentPage = () => STATE.pagination.page + 1;
    setup(options);
    observer.clearListeners(false);
    return {
        load,
        setColumnHidden,
        sortColumn,
        setPage,
        setSize,
        getPages,
        getCurrentPage,
        getSize,
        on: (evt, data) => observer.on(evt, data),
        clearListeners: () => observer.clearListeners(false),
        removeListener: (code) => observer.removeListener(code),
    };
}
