import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./styles.css";
//import WrapperFormatter from "./WrapperFormatter";
//import { Editors } from "react-data-grid-addons";
import createRowData from "./Rowdata";

const defaultColumnProperties = {
  sortable: false,
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

//console.log(createRowData());
const rows1 = createRowData();
//const rows2 = createRowData();
//const rows3 = createRowData();
const keys = Object.keys(rows1[0]);
//console.log(keys);

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

function calculate_row(rows) {
  var qty_sum_bt = 0;
  var qty_sum_cc = 0;
  var qty_sum_ew = 0;
  var qty_sum_mh = 0;
  var qty_sum_bc = 0;
  var qty_sum_pc = 0;
  var qty_sum_bd = 0;
  var qty_sum_lc = 0;
  for (let i = 1; i <= 113; i++) {
    ///BT
    if (i > 0 && i < 8) {
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]);
      qty_sum_bt = qty_sum_bt + rows[i]["Qty"];
    }
    rows[8]["Qty"] = qty_sum_bt;
    rows[8]["Amount"] = qty_sum_bt * rows[8]["Rate"] * 0.1;
    ///CC
    if (i > 9 && i < 17) {
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]) *
        parseFloat(rows[i]["D"]);
      qty_sum_cc = qty_sum_cc + rows[i]["Qty"];
    }
    rows[17]["Qty"] = qty_sum_cc;
    rows[17]["Amount"] = qty_sum_cc * rows[26]["Rate"];
    //EW
    if (i > 18 && i < 26) {
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]) *
        parseFloat(rows[i]["D"]);
      qty_sum_ew = qty_sum_ew + rows[i]["Qty"];
    }
    rows[26]["Qty"] = qty_sum_ew;
    rows[26]["Amount"] = qty_sum_ew * rows[26]["Rate"];
    /// sheet rock
    if (i > 27 && i < 29) {
      rows[i]["Qty"] = 0.15 * rows[26]["Qty"]; // 15 % qty from ew
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    /// cutting of pipe
    if (i > 29 && i <= 34) {
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    //laying of pipes
    if (i > 35 && i <= 40) {
      rows[i]["L"] = rows[i - 17]["L"];
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]) * rows[i]["L"];
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    //jointing of pipes
    if (i > 41 && i <= 46) {
      rows[i]["L"] = Math.ceil(rows[i - 23]["L"] / 5.5);
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]) * rows[i]["L"];
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    // lowering valves
    if (i > 47 && i <= 52) {
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    // join pipe and valve
    if (i > 53 && i <= 58) {
      rows[i]["Nos"] = rows[i - 6]["Nos"];
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    // redoing 15 mm dia ppc connection & 100mm sewerage
    if (i > 58 && i < 61) {
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }

    // rcc man hole

    if (i > 61 && i < 67) {
      rows[i]["Nos"] = rows[i - 14]["Nos"];
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      qty_sum_mh = qty_sum_mh + rows[i]["Qty"];
    }
    rows[67]["Qty"] = qty_sum_mh;
    rows[67]["Amount"] = rows[67]["Qty"] * rows[67]["Rate"];

    //barricading
    if (i > 68 && i < 74) {
      rows[i]["L"] = rows[i - 50]["L"];
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]) * rows[i]["L"];
      qty_sum_bc = qty_sum_bc + rows[i]["Qty"];
    }
    rows[74]["Qty"] = qty_sum_bc;
    rows[74]["Amount"] = rows[74]["Qty"] * rows[74]["Rate"];

    // conveyance of pipe
    if (i > 75 && i < 81) {
      rows[i]["L"] = rows[i - 57]["L"];
      rows[i]["Qty"] =
        (parseFloat(rows[i]["item"]) *
          parseFloat(rows[i]["Nos"]) *
          rows[i]["L"] *
          rows[i]["B"]) /
        1000;
      qty_sum_pc = qty_sum_pc + rows[i]["Qty"];
    }
    rows[81]["Qty"] = qty_sum_bc;
    rows[81]["Amount"] = rows[81]["Qty"] * rows[81]["Rate"];

    // making dummy
    if (i > 82 && i < 85) {
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }

    // bailing of water
    if (i > 85 && i < 87) {
      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    // air valve

    if (i > 87 && i < 89) {
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }

    // air valve cabin
    if (i > 89 && i < 91) {
      rows[i]["Qty"] = parseFloat(rows[i]["item"]) * parseFloat(rows[i]["Nos"]);
      rows[i]["Amount"] = rows[i]["Qty"] * rows[i]["Rate"];
    }
    // bedding to tenches

    if (i > 91 && i < 97) {
      rows[i]["L"] = rows[i - 82]["L"];
      rows[i]["B"] = rows[i - 82]["B"];
      rows[i]["D"] = rows[i - 82]["D"];

      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]) *
        parseFloat(rows[i]["D"]);
      qty_sum_bd = qty_sum_bd + rows[i]["Qty"];
    }
    rows[97]["Qty"] = qty_sum_bd;
    rows[97]["Amount"] = rows[97]["Qty"] * rows[97]["Rate"];

    // laying cc prop
    if (i > 98 && i < 104) {
      rows[i]["L"] = rows[i - 89]["L"];
      rows[i]["B"] = rows[i - 89]["B"];
      rows[i]["D"] = rows[i - 89]["D"];

      rows[i]["Qty"] =
        parseFloat(rows[i]["item"]) *
        parseFloat(rows[i]["Nos"]) *
        parseFloat(rows[i]["L"]) *
        parseFloat(rows[i]["B"]) *
        parseFloat(rows[i]["D"]);
      qty_sum_bd = qty_sum_bd + rows[i]["Qty"];
    }
    rows[104]["Qty"] = qty_sum_bd;
    rows[104]["Amount"] = rows[104]["Qty"] * rows[104]["Rate"];
  }
  return rows;
}

// for (let i = 0; i < rows1.length; i++) {
//   console.log(rows1[i]["Description"].length);
// }

class Example extends React.Component {
  state = { rows1 };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      var rows1 = state.rows1;

      //rows1[0]["Nos"] = "";
      // console.log(fromRow);
      //console.log(toRow);

      if (!descrows.includes(fromRow)) {
        for (let i = fromRow; i <= toRow; i++) {
          rows1[i] = { ...rows1[i], ...updated };
        }
      }
      // console.log(rows1);

      rows1 = calculate_row(rows1);

      for (let i = 0; i <= 119; i++) {
        if (!descrows.includes(i)) {
          rows1[i] = { ...rows1[i] };
        }
      }

      // console.log(rows1);

      // // BT Calcs

      // const bt_qtynamt = calculate_row(1, 7, 8, "BT", rows1, 0.1);
      // rows1[8]["Qty"] = parseFloat(bt_qtynamt[0]).toFixed(2);
      // rows1[8]["Amount"] = parseFloat(bt_qtynamt[1]).toFixed(2);

      // // CC Calcs
      // var cc_qtynamt = calculate_row(10, 17, 18, "CC", rows1, 1);
      // rows1[18]["Qty"] = parseFloat(cc_qtynamt[0]).toFixed(2);
      // rows1[18]["Amount"] = parseFloat(cc_qtynamt[1]).toFixed(2);

      // for (var i in descrows) {
      //   for (const key of keys) {
      //     if (key === "SlNo") {
      //       rows1[i][key] = createRowData()[i][key];
      //     }
      //     if (key === "Description") {
      //       rows1[i][key] = createRowData()[i][key];
      //     }
      //   }
      // }

      // formatrow(rows1);
      // this.setState({
      //   refresh: true
      // });
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
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        enableCellAutoFocus={true}
        minHeight={this.state.rows1.length * 30}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
