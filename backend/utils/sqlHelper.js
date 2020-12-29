const buildSearchQuery = function (attributes, tableName) {
  let queryStr = `SELECT * FROM ${tableName}`;

  for (attrKey in attributes) {
    const additionalSyntax = queryStr.includes("WHERE") ? "OR" : "WHERE"
    if (attrKey && attributes[attrKey]) {
      queryStr = queryStr + ` ${additionalSyntax} LOWER(${tableName}.${attrKey}) like '%${attributes[attrKey]}%'`;
    }
  }

  return queryStr
}

module.exports = {
  buildSearchQuery
}
