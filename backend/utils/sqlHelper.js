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

const pagy = function ({ db, modelName, page, per_page, where = null }) {
  const offset = (page - 1) * per_page;

  let countPromsie = where && typeof(where) !== 'undefined'
    ? db.count('* as count').from(modelName).where(where).first()
    : db.count('* as count').from(modelName).first()

  let queryPromise = where && typeof(where) !== 'undefined'
    ? db.select("*").from(modelName).where(where).offset(offset).limit(per_page)
    : db.select("*").from(modelName).offset(offset).limit(per_page)

  return Promise.all([
    countPromsie,
    queryPromise
  ]).then(([total, rows]) => {
    const count = total.count;
    const firstPage = page === 1;
    const lastPage = offset + per_page >= count;
    const prevPage = firstPage ? -1 : page - 1;
    const nextPage = lastPage ? -1 : page + 1;
    const totalPage = Math.ceil(count / per_page);
    const records = rows
    return { count, firstPage, lastPage, prevPage, nextPage, totalPage, records }
  });
}

module.exports = {
  buildSearchQuery,
  pagy
}
