const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const getPresentTime = () => {
  const now = new Date().toString().slice(0, 21).split(" ");
  const time = parseInt(now[4].slice(0, 2));

  return (
    now[3] +
    "-" +
    String(MONTHS.indexOf(now[1])).padStart(2, "0") +
    "-" +
    now[2] +
    " " +
    time +
    now[4].slice(2)
  );
};
