type TDataProps<T extends object> = Partial<T> & {};

type TData<T extends object> = {
  [x in keyof TDataProps<T>]: any;
};

type THeader<T extends object> = {
  content: string;
  name: keyof T extends string ? string : string;
  hidden?: boolean;
  index?: boolean;
};

export interface TableLiphOption<T extends object> {
  headers: THeader<T>[];
  data: TData<T>[];
}

export interface TableLiphFilter {

}

export type TableLiphModel = {};

export function TableLiph<U extends object>(
  classTable: string,
  options: TableLiphOption<U>
) {
  const TABLE = document.querySelector(`${classTable}`) as HTMLElement;
  let HEADER: HTMLElement;
  let BODY: HTMLElement;
  let FOOTER: HTMLElement;
  let OPTIONS: TableLiphOption<U>;

  const STATE = {
    headers: {
      hidden: false
    },
    filters: {

    }
  }

  if (!TABLE) {
    throw new Error(`Element table not found`);
  }

  const setup = () => {
    OPTIONS = options;

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

    loadHeaders();
    loadData(OPTIONS.data);
  };

  // # Util

  const getHeaders = (args?: Partial<THeader<U>>) => {
    // @ts-expect-error
    const headers = args || Object.keys(args).length > 0 ? options.headers.filter(_header => Object.keys(args).find(key => _header[`${key}`] && _header[`${key}`] === args[`${key}`])) : options.headers

    return headers
  }

  // # Use Case

  const reload = (data?: TData<U>[], forceHeader?: boolean) => {
    forceHeader && loadHeaders()
    data && loadData(data)
  }

  const loadHeaders = () => {
    // # Add Row Header
    const rowHeader = document.createElement("div");
    rowHeader.classList.add("table-row", "header");

    HEADER.innerHTML = ""

    const headers = getHeaders({ hidden: false })

    headers.forEach((_header) => {
      // # Add Header
      const cellHeader = document.createElement("div");
      cellHeader.classList.add("table-header", "cell");

      cellHeader.setAttribute("data-table-header-name", `${_header.name}`);

      cellHeader.innerHTML = _header.content || "";

      rowHeader.appendChild(cellHeader);
    });

    HEADER.appendChild(rowHeader);

    STATE.headers.hidden = false
  };

  const load = (data: TData<U>[]) => {
    reload(data, STATE.headers.hidden)
  }

  const loadData = (data: TData<U>[]) => {
    const headers = getHeaders({ hidden: false })
    BODY.innerHTML = ""

    data.forEach((_data) => {
      // # Add Row
      const rowData = document.createElement("div");
      rowData.classList.add("table-row", "body");

      for (const key in _data) {
        if (!headers.find(_header => _header.name == key)) { continue }

        // ## Add Data Value
        const cellData = document.createElement("div");
        cellData.classList.add("table-data", "cell");
        cellData.innerHTML = _data[key] || "";
        rowData.appendChild(cellData);
      }

      BODY.appendChild(rowData);
    });
  };

  const setHidden = (name: keyof U, value = true) => {
    const index = OPTIONS.headers.findIndex(_header => _header.name == name)

    if (index < 0) {
      throw new Error(`Column "${typeof name == "string" ? name : ""}" not found`)
    }

    OPTIONS.headers[index].hidden = value

    STATE.headers.hidden = true
  }

  setup();

  return {
    load,
    setHidden,
    reload
  };
}
