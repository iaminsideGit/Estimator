import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./styles.css";
import WrapperFormatter from "./WrapperFormatter";
import { Editors } from "react-data-grid-addons";
import createRowData from "./Rowdata";

const defaultColumnProperties = {
  sortable: true,
  editable: true,
  resizable: true
};

const { DropDownEditor } = Editors;
const issueTypes = [
  { id: "bug", value: "Bug" },
  { id: "epic", value: "Epic" },
  { id: "story", value: "Story" }
];
const Desctypes = [
  {
    id: "BT",
    value:
      "Cutting open BT road surface including water bound macadam including labour charges all leads , lifts and conveyance of all materials etc complete as directed by the departmental officers for pipeline trenches."
  },
  {
    id: "CC",
    value:
      "Cutting open CC road surface including labour charges, all leads and other incidental and operational charges , tools and plants etc complete for pipeline trenches."
  },
  {
    id: "EW",
    value:
      "Earth work excavation in all available soils such as red earth, hard gravelly soils but excluding soft and hard disintegrated rock, depositing on bank with an initial lead of 10m. and lift of 2m etc complete."
  }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
const Desctypeseditor = <DropDownEditor options={Desctypes} />;
const columns = [
  { key: "SlNo", name: "Sl.No.", editable: false },
  {
    key: "Description",
    name: "Description",
    editable: false,
    width: 350,
    editor: Desctypeseditor

    //formatter: WrapperFormatter
  },
  { key: "item", name: "", editable: true },
  { key: "Nos", name: "Nos.", editable: true },
  { key: "L", name: "L", editable: true },
  { key: "B", name: "B", editable: true },
  { key: "D", name: "D", editable: true },
  { key: "Qty", name: "Qty", editable: true },
  { key: "unit", name: "unit", editable: true },
  { key: "Rate", name: "Rate", editable: false },
  { key: "unit_rate", name: "unit", editable: true },
  { key: "Amount", name: "Amount", editable: true }
].map((c) => ({ ...c, ...defaultColumnProperties }));

console.log(createRowData());
const rows1 = createRowData();
const rows2 = createRowData();
const rows3 = createRowData();

const keys = Object.keys(rows1[0]);
console.log(keys);
for (const key of keys) {
  if (key !== "SlNo" && key !== "Description") {
    rows1[0][key] = "";
  }
}
for (let i = 0; i < rows1.length; i++) {
  console.log(rows1[i]["Description"].length);
}

class Example extends React.Component {
  state = { rows1, rows2, rows3 };

  onGridRowsUpdated1 = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows1 = state.rows1.slice();

      rows1[0]["Nos"] = "";

      for (let i = fromRow; i <= toRow; i++) {
        rows1[i] = { ...rows1[i], ...updated };
      }

      for (let i = 1; i <= 7; i++) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows1[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows1[i][key] = createRowData()[i][key];
          }
        }
      }

      console.log(rows1[0]["Description"]);

      if (rows1[0]["Description"].includes("Cutting open CC")) {
        rows1[8]["Rate"] = 2793.0;
        rows1[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows2[i][key] = "Cum";
            }
          }
        }
      }
      if (rows1[0]["Description"].includes("Earth work excavation")) {
        rows1[8]["Rate"] = 343.0;
        rows1[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows1[i][key] = "Cum";
            }
          }
        }
      }
      if (rows1[0]["Description"].includes("Cutting open BT")) {
        for (let i = 1; i <= 7; i++) {
          rows1[i]["unit"] = "Sqm";
        }
      }

      return { rows1 };
    });
  };
  onGridRowsUpdated2 = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows2 = state.rows2.slice();

      rows2[0]["Nos"] = "";

      for (let i = fromRow; i <= toRow; i++) {
        rows2[i] = { ...rows2[i], ...updated };
      }

      for (let i = 1; i <= 7; i++) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows2[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows2[i][key] = createRowData()[i][key];
          }
        }
      }

      console.log(rows2[0]["Description"]);

      if (rows2[0]["Description"].includes("Cutting open CC")) {
        rows2[8]["Rate"] = 2793.0;
        rows2[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows2[i][key] = "Cum";
            }
          }
        }
      }
      if (rows2[0]["Description"].includes("Earth work excavation")) {
        rows2[8]["Rate"] = 343.0;
        rows2[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows2[i][key] = "Cum";
            }
          }
        }
      }
      if (rows2[0]["Description"].includes("Cutting open BT")) {
        for (let i = 1; i <= 7; i++) {
          rows2[i]["unit"] = "Sqm";
        }
      }

      return { rows2 };
    });
  };

  changeText1 = (event) => {
    this.setState((state) => {
      const rows1 = state.rows1.slice();
      for (let i = 1; i <= 7; i++) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows1[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows1[i][key] = createRowData()[i][key];
          }
        }
      }
    });
  };

  onGridRowsUpdated1 = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows1 = state.rows1.slice();

      rows1[0]["Nos"] = "";

      for (let i = fromRow; i <= toRow; i++) {
        rows1[i] = { ...rows1[i], ...updated };
      }

      for (let i = 1; i <= 7; i++) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows1[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows1[i][key] = createRowData()[i][key];
          }
        }
      }

      console.log(rows1[0]["Description"]);

      if (rows1[0]["Description"].includes("Cutting open CC")) {
        rows1[8]["Rate"] = 2793.0;
        rows1[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows2[i][key] = "Cum";
            }
          }
        }
      }
      if (rows1[0]["Description"].includes("Earth work excavation")) {
        rows1[8]["Rate"] = 343.0;
        rows1[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows1[i][key] = "Cum";
            }
          }
        }
      }
      if (rows1[0]["Description"].includes("Cutting open BT")) {
        for (let i = 1; i <= 7; i++) {
          rows1[i]["unit"] = "Sqm";
        }
      }

      return { rows1 };
    });
  };
  onGridRowsUpdated3 = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows3 = state.rows3.slice();

      rows3[0]["Nos"] = "";

      for (let i = fromRow; i <= toRow; i++) {
        rows3[i] = { ...rows3[i], ...updated };
      }

      for (let i = 1; i <= 7; i++) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows3[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows3[i][key] = createRowData()[i][key];
          }
        }
      }

      console.log(rows3[0]["Description"]);

      if (rows3[0]["Description"].includes("Cutting open CC")) {
        rows3[8]["Rate"] = 2793.0;
        rows3[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows2[i][key] = "Cum";
            }
          }
        }
      }
      if (rows3[0]["Description"].includes("Earth work excavation")) {
        rows3[8]["Rate"] = 343.0;
        rows3[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows3[i][key] = "Cum";
            }
          }
        }
      }
      if (rows3[0]["Description"].includes("Cutting open BT")) {
        for (let i = 1; i <= 7; i++) {
          rows3[i]["unit"] = "Sqm";
        }
      }

      return { rows3 };
    });
  };

  render() {
    return (
      <div>
        <div id="div1" onChange={this.changeText1.bind(this)}>
          <ReactDataGrid
            columns={columns}
            rowGetter={(i) => this.state.rows1[i]}
            idProperty="id"
            //rowHeight={(i) => rows[i]['Description'].length}
            rowHeight={30}
            rowsCount={this.state.rows1.length}
            onGridRowsUpdated={this.onGridRowsUpdated1}
            //  rowRenderer={RowRenderer}
            // enableRowSelect={true}
            enableCellSelect={true}
            enableCellAutoFocus={true}
          />
        </div>
        <div>
          <ReactDataGrid
            columns={columns}
            rowGetter={(i) => this.state.rows2[i]}
            idProperty="id"
            //rowHeight={(i) => rows[i]['Description'].length}
            rowHeight={30}
            rowsCount={this.state.rows2.length}
            onGridRowsUpdated={this.onGridRowsUpdated2}
            //  rowRenderer={RowRenderer}
            // enableRowSelect={true}
            enableCellSelect={true}
            enableCellAutoFocus={true}
          />
        </div>
        <div>
          <ReactDataGrid
            columns={columns}
            rowGetter={(i) => this.state.rows3[i]}
            idProperty="id"
            //rowHeight={(i) => rows[i]['Description'].length}
            rowHeight={30}
            rowsCount={this.state.rows2.length}
            onGridRowsUpdated={this.onGridRowsUpdated3}
            //  rowRenderer={RowRenderer}
            // enableRowSelect={true}
            enableCellSelect={true}
            enableCellAutoFocus={true}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
