import React from "react";
import styles from "./TableTextInput.module.css";
import TableTextInput from "./TableTextInput";
import TableTextOutput from "./TableTextOutput";

// Note: Give PRONOUN SELECTION an ALTERNATE checkbox.

const TableContainer = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>NAME</th>
          <th>AGE</th>
          <th>GENDER</th>
          <th>PRONOUN SELECTION</th>
          <th>PRONOUNS</th>
          <th>PRONOUN USAGE #</th>
          <th>PRONOUN USAGE</th>
          <th>CASTE</th>
          <th>LUNAR SWAY</th>
          <th>CLASS</th>
          <th>ASPECT</th>
          <th>EXTENDED ZODIAC</th>
          <th>TREE</th>
          <th>TEMPLATE(S)</th>
          <th>MOVES</th>
          <th>TROLLTAG</th>
          <th>TYPING QUIRK(S)</th>
          <th>QUIRK USAGE #</th>
          <th>QUIRK USAGE</th>
          <th>MATESPRIT(S)</th>
          <th>MOIRAIL(S)</th>
          <th>AUSPISTICE(S)</th>
          <th>KISMESIS(ES)</th>
          <th>LUSUS</th>
          <th>OTHER INFORMATION</th>
          <th>SUMMARY</th>
        </tr>
        <tr>
          <td>
            <TableTextInput placeholder={"NAME:"} />
          </td>
          <td>
            <TableTextInput placeholder={"AGE:"} />
          </td>
          <td>
            <TableTextInput placeholder={"GENDER:"} />
          </td>
          <td>PRONOUN SELECTION dropdown</td>
          <td>
            <TableTextOutput placeholder={"PRONOUNS:"} />
          </td>
          <td>PRONOUN USAGE # dropdown</td>
          <td>
            <TableTextOutput placeholder={"PRONOUN USAGE:"} />
          </td>
          <td>CASTE dropdown</td>
          <td>LUNAR SWAY dropdown</td>
          <td>CLASS dropdown</td>
          <td>ASPECT dropdown</td>
          <td>
            <TableTextOutput placeholder={"EXTENDED ZODIAC:"} />
          </td>
          <td>TREE dropdown</td>
          <td>TEMPLATE(S) dropdown</td>
          <td>MOVES dropdown</td>
          <td>
            <TableTextInput placeholder={"TROLLTAG:"} />
          </td>
          <td>TYPING QUIRK(S) dropdown</td>
          <td>QUIRK USAGE # dropdown</td>
          <td>
            <TableTextOutput placeholder={"QUIRK USAGE:"} />
          </td>
          <td>
            <TableTextInput placeholder={"MATESPRIT(S):"} />
          </td>
          <td>
            <TableTextInput placeholder={"MOIRAIL(S):"} />
          </td>
          <td>
            <TableTextInput placeholder={"AUSPISTICE(S):"} />
          </td>
          <td>
            <TableTextInput placeholder={"KISMESIS(ES):"} />
          </td>
          <td>
            <TableTextInput placeholder={"LUSUS:"} />
          </td>
          <td>
            <TableTextInput placeholder={"OTHER INFORMATION:"} />
          </td>
          <td>
            <TableTextInput placeholder={"SUMMARY:"} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableContainer;
