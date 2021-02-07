
exports.seed = async function (knex) {
  await knex('booking').del();

  const tourist_package1 = await knex('tourist_package').where({ name: 'Package 001' }).first();
  const tourist_package2 = await knex('tourist_package').where({ name: 'Package 002' }).first();
  const tourist_package3 = await knex('tourist_package').where({ name: 'Package 003' }).first();
  const user1 = await knex('user').where({ username: 'user001'}).first();
  const user2 = await knex('user').where({ username: 'user002'}).first();
  const user3 = await knex('user').where({ username: 'user003'}).first();

  return await knex('booking').insert([
    {
      tourist_package_id: tourist_package1.tourist_package_id,
      user_id: user1.user_id
    },
    {
      tourist_package_id: tourist_package2.tourist_package_id,
      user_id: user2.user_id
    },
    {
      tourist_package_id: tourist_package3.tourist_package_id,
      user_id: user3.user_id
    }
  ])

};