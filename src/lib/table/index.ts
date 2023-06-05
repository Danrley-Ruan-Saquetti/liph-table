type TDataProps<T extends object> = Partial<T> & {};

type TData<T extends object> = {
  [x in keyof TDataProps<T>]: any;
};

type THeader<T extends object> = {
  content: string;
  name: keyof T;
  visible?: boolean;
  index?: boolean;
};

export interface TableLipthOption<T extends object> {
  headers: THeader<T>[];
  data: TData<T>[];
}

export type TableLiphModel = {};

export function TableLiph<U extends object>(
  classTable: string,
  options: TableLipthOption<U>
): TableLiphModel {
  const TABLE = document.querySelector(`${classTable}`) as HTMLElement;
  let HEADER: HTMLElement;
  let BODY: HTMLElement;
  let FOOTER: HTMLElement;

  let OPTIONS: TableLipthOption<U>;

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
  
  const getData = () => {
    options.data.find(_data => {})
  }

  // # Use Case
  
  const loadHeaders = () => {
    // # Add Row Header
    const rowHeaderb = document.createElement("div");
    rowHeaderb.classList.add("table-row", "header");

    OPTIONS.headers.forEach((_header) => {
      if (typeof _header.visible != "undefined" || _header.visible) {
        return;
      }

      // # Add Header
      const cellHeader = document.createElement("div");
      cellHeader.classList.add("table-header", "cell");

      cellHeader.setAttribute("data-table-header-name", `${_header.name}`);

      cellHeader.innerHTML = _header.content;

      rowHeaderb.appendChild(cellHeader);
    });

    HEADER.appendChild(rowHeaderb);
  };

  const loadData = (data: TData<U>[]) => {
    data.forEach((_data) => {
      // # Add Row
      const rowData = document.createElement("div");
      rowData.classList.add("table-row", "body");

      for (const key in _data) {
        // ## Add Data Value
        const cellData = document.createElement("div");
        cellData.classList.add("table-data", "cell");

        cellData.innerHTML = _data[key] || "";

        rowData.appendChild(cellData);
      }

      BODY.appendChild(rowData);
    });
  };

  setup();

  return {};
}
