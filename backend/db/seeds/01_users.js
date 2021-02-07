
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  const customerRole = await knex('user_role').where({ code: 'CUSTOMER' }).first();
  // // Inserts seed entries
  return await knex('user').insert([
    {
      user_role_id: customerRole.user_role_id,
      username: 'user001',
      password: '123456',
      fullname: 'user001',
      email: 'user001@gmail.com',
      address: '272 nguyen van cu',
      phone: '0123456001',
    },
    {
      user_role_id: customerRole.user_role_id,
      username: 'user002',
      password: '123456',
      fullname: 'user002',
      email: 'user002@gmail.com',
      address: '272 nguyen van cu',
      phone: '0123456002',
    },
    {
      user_role_id: customerRole.user_role_id,
      username: 'user003',
      password: '123456',
      fullname: 'user003',
      email: 'user003@gmail.com',
      address: '272 nguyen van cu',
      phone: '0123456003',
    }
  ]);
};
