import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./styles.css";
//import WrapperFormatter from "./WrapperFormatter";
//import { Editors } from "react-data-grid-addons";
import createRowData from "./Rowdata";

const defaultColumnProperties = {
  sortable: true,
  editable: true,
  resizable: true
};
// };

// const { DropDownEditor } = Editors;
// const issueTypes = [
//   { id: "bug", value: "Bug" },
//   { id: "epic", value: "Epic" },
//   { id: "story", value: "Story" }
// ];
// const Desctypes = [
//   {
//     id: "BT",
//     value:
//       "Cutting open BT road surface including water bound macadam including labour charges all leads , lifts and conveyance of all materials etc complete as directed by the departmental officers for pipeline trenches."
//   },
//   {
//     id: "CC",
//     value:
//       "Cutting open CC road surface including labour charges, all leads and other incidental and operational charges , tools and plants etc complete for pipeline trenches."
//   },
//   {
//     id: "EW",
//     value:
//       "Earth work excavation in all available soils such as red earth, hard gravelly soils but excluding soft and hard disintegrated rock, depositing on bank with an initial lead of 10m. and lift of 2m etc complete."
//   }
// ];
//const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
//const Desctypeseditor = <DropDownEditor options={Desctypes} />;
const columns = [
  { key: "SlNo", name: "Sl.No.", editable: false },
  {
    key: "Description",
    name: "Description",
    editable: false,
    width: 350
    // editor: Desctypeseditor

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
//const rows2 = createRowData();
//const rows3 = createRowData();
const keys = Object.keys(rows1[0]);
console.log(keys);

function formatrow(rows) {
  for (const key of keys) {
    if (key !== "SlNo" && key !== "Description") {
      //BT
      rows[0][key] = "";
      rows[9][key] = "";
      //CC
      rows[18][key] = "";
      rows[27][key] = "";
      //EW
      rows[29][key] = "";
      rows[35][key] = "";
      rows[41][key] = "";
      rows[47][key] = "";
      rows[53][key] = "";
      rows[35][key] = "";
      rows[61][key] = "";
      rows[68][key] = "";
      rows[75][key] = "";
      rows[82][key] = "";
      rows[85][key] = "";
      rows[87][key] = "";
      rows[89][key] = "";
      rows[91][key] = "";
      rows[98][key] = "";
      rows[105][key] = "";
      rows[114][key] = "";

      if (
        key !== "Qty" &&
        key !== "Qty_unit" &&
        key !== "Rate" &&
        key !== "unit" &&
        key !== "Amount"
      ) {
        rows[8][key] = "";
        rows[17][key] = "";
        rows[26][key] = "";
        rows[67][key] = "";
        rows[74][key] = "";
        rows[81][key] = "";
        rows[97][key] = "";
        rows[104][key] = "";
        rows[113][key] = "";
        rows[117][key] = "";
      }
    }
  }
}

// for (let i = 0; i < rows1.length; i++) {
//   console.log(rows1[i]["Description"].length);
// }

class Example extends React.Component {
  state = { rows1 };

  onGridRowsUpdated1 = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows1 = state.rows1;

      //rows1[0]["Nos"] = "";

      for (let i = fromRow; i <= toRow; i++) {
        rows1[i] = { ...rows1[i], ...updated };
      }

      const descrows = [
        0,
        9,
        18,
        27,
        29,
        35,
        41,
        47,
        53,
        35,
        61,
        68,
        75,
        82,
        85,
        87,
        89,
        91,
        98,
        105,
        114
      ];
      for (var i in descrows) {
        for (const key of keys) {
          if (key === "SlNo") {
            rows1[i][key] = createRowData()[i][key];
          }
          if (key === "Description") {
            rows1[i][key] = createRowData()[i][key];
          }
        }
      }

      // BT Calcs
      var bt_qty_sum = 0;
      if (String(rows1[0]["Description"]).includes("Cutting open BT")) {
        for (let i = 1; i <= 7; i++) {
          rows1[i]["unit"] = "Sqm";

          var qty = parseFloat(rows1[i]["L"]) * parseFloat(rows1[i]["B"]);
          rows1[i]["Qty"] = qty;
          bt_qty_sum = bt_qty_sum + parseFloat(rows1[i]["Qty"]);
          rows1[8]["Qty"] = bt_qty_sum;
        }
      }
      // rows1[8]["Qty"] = bt_qty_sum;
      rows1[8]["Amount"] =
        (parseFloat(rows1[8]["Qty"]).toFixed(2) *
          parseFloat(rows1[8]["Rate"])) /
        10;

      if (String(rows1[0]["Description"]).includes("Cutting open CC")) {
        rows1[8]["Rate"] = 2793.0;
        rows1[8]["unit_rate"] = "Cum";
        for (let i = 1; i <= 7; i++) {
          for (const key of keys) {
            if (key === "unit") {
              rows1[i][key] = "Cum";
            }
          }
        }
      }
      if (String(rows1[9]["Description"]).includes("Earth work excavation")) {
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

      formatrow(rows1);

      return { rows1 };
    });
  };

  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => this.state.rows1[i]}
        idProperty="id"
        //rowHeight={(i) => rows[i]['Description'].length}
        rowHeight={30}
        rowsCount={this.state.rows1.length}
        onGridRowsUpdated={this.onGridRowsUpdated1}
        enableCellSelect={true}
        enableCellAutoFocus={true}
        minHeight={this.state.rows1.length * 30}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
