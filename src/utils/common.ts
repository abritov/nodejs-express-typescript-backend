export function groupBy<T>(xs: T[], key: any) {
  return xs.reduce((rv: any, x: T) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
