import sortBy from "lodash.sortby";
import groupBy from "lodash.groupby";

export default groupBy(
  sortBy(
    [
      { id: "default", name: "Default", type: "light" },
      { id: "github", name: "GitHub", type: "light" },
      { id: "atom-one-dark", name: "Atom One (Dark)", type: "dark" },
      { id: "atom-one-light", name: "Atom One (Light)", type: "light" },
      { id: "darcula", name: "Darcula", type: "dark" },
      { id: "monokai", name: "Monokai", type: "dark" },
      { id: "obsidian", name: "Obsidian", type: "dark" },
      { id: "kimbie.light", name: "Kimbie Light", type: "light" },
      { id: "kimbie.dark", name: "Kimbie Dark", type: "dark" }
    ],
    "name"
  ),
  theme => theme.type
);
