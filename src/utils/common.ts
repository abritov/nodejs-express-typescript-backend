export function groupBy<T>(xs: T[], key: any) {
  return xs.reduce(function(rv: any, x: T) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
