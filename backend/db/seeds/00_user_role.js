
exports.seed = async function (knex) {
  // Inserts seed entries
  await knex('booking').del();
  await knex('feedback').del();
  await knex('tourist_package').del();
  await knex('company').del();
  await knex('user').del();
  await knex('user_role').del();

  await knex('user_role').del();
  return await knex('user_role').insert([
    { code: 'ADMIN', name: 'admin', description: 'admin' },
    { code: 'CUSTOMER', name: 'customer', description: 'customer' },
  ]);
};
