const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

module.exports = {
  stableSort: (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  },
  getSorting: (order, orderBy) => {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }
};

/*

-1> stableSort() higher order function to sort by a table heading
A> the argument 'comparisonCB' is the getSorting() defined below.
B> The sort() method takes a single compareFunction as a callback and compares each pair of successive elements.

 - 2> getSorting() to be passed as a callback to the above sableSort(). The argument 'orderBy' will initially start (as a state) its value with 'location' (which is the first table header label) and then will take on whichever table header label the user clicks on.

A> First the 'orderBy' value will be set by handleRequestSort() with its argument 'property'
B> Then this function will be passed down as a prop 'onRequestSort' to UnidentifiedTableHead child component.
C> In UnidentifiedTableHead, it will be called within createSortHandler() function and will be invoked on onClick and passed row.tableHeaderProp (which is the Table-header field value)

 */
