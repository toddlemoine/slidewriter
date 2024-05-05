export default function isOneOf(values = []) {
  return (val) => values.includes(val);
}

