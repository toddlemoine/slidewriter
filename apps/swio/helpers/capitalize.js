export default function capitalize(str = "") {
  const [firstLetter, ...rest] = str;
  return [firstLetter.toUpperCase(), ...rest].join("");
}
