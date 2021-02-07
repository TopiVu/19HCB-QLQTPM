5
exports.seed = async function (knex) {
  await knex('feedback').del();

  const tourist_package1 = await knex('tourist_package').where({ name: 'Package 001' }).first();
  const tourist_package2 = await knex('tourist_package').where({ name: 'Package 002' }).first();
  const tourist_package3 = await knex('tourist_package').where({ name: 'Package 003' }).first();
  const user1 = await knex('user').where({ username: 'user001'}).first();
  const user2 = await knex('user').where({ username: 'user002'}).first();
  const user3 = await knex('user').where({ username: 'user003'}).first();

  return await knex('feedback').insert([
    {
      tourist_package_id: tourist_package1.tourist_package_id,
      user_id: user1.user_id,
      feedback: "This place so great !!!!",
      rate: 5
    },
    {
      tourist_package_id: tourist_package2.tourist_package_id,
      user_id: user2.user_id,
      feedback: "Very cool !!!!",
      rate: 3
    },
    {
      tourist_package_id: tourist_package3.tourist_package_id,
      user_id: user3.user_id,
      feedback: "Wonder trip for my summer vacation",
      rate: 4
    }
  ])

};