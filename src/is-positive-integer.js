export default arg =>
  "number" == typeof arg && 0 == arg % 1 && -1 < arg && arg == arg;
