import { capitalize } from "lodash";
import React, { Component } from "react";
import { everywhereKeys, presentationKeys } from "../constants.js";
import "./KeyboardHelp.css";

const keyLabelMap = {
  left: "\u2190",
  right: "\u2192",
  delete: "Del",
  meta: /Mac/.test(window.navigator.platform) ? "Cmd" : "Ctrl"
};

function Or() {
  return <span className="key-join">or</span>;
}

function Plus() {
  return <span className="key-join">+</span>;
}

function KeyCombo({ keys }) {
  const parts = keys.split(" ");
  let combo = parts.reduce((acc, curr) => {
    acc.push(<Key name={curr} />);
    acc.push(<Plus />);
    return acc;
  }, []);
  combo.pop();
  return combo;
}

function MultiKeys({ keys }) {
  const parts = keys.split(",");
  let combo = parts.reduce((acc, curr) => {
    acc.push(<Key key={curr} name={curr} />);
    acc.push(<Or />);
    return acc;
  }, []);
  combo.pop();
  return combo;
}

function Key({ name }) {
  let label = keyLabelMap[name] || capitalize(name);
  return <kbd>{label}</kbd>;
}

function Keyset({ keys }) {
  if (keys.split(" ").length > 1) return <KeyCombo keys={keys} />;

  if (keys.split(",").length > 1) return <MultiKeys keys={keys} />;

  return <Key name={keys} />;
}

function KeyList({ title, keys }) {
  return (
    <table className="key-list">
      <caption>{title}</caption>
      <tbody>
        {keys.map(([keyset, desc], index) => {
          return (
            <tr key={index}>
              <td className="keys-desc">{desc}</td>
              <td className="keyset">{<Keyset keys={keyset} />}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

class KeyboardHelp extends Component {
  render() {
    return (
      <section className="keyboard-help">
        <h2>Keyboard shortcuts</h2>
        <KeyList title="Everywhere" keys={everywhereKeys} />
        <KeyList title="Presentation" keys={presentationKeys} />
      </section>
    );
  }
}

export default KeyboardHelp;
