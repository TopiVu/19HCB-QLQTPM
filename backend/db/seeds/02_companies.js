
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('company').del()
  const user001 = await knex('user').where({ username: 'user001' }).first();
  const user002 = await knex('user').where({ username: 'user002' }).first();
  const user003 = await knex('user').where({ username: 'user003' }).first();

  return await knex('company').insert([
    {
      company_id: 1,
      name: 'Highland',
      address: '272 nguyen van cu',
      phone: '012345001',
      user_id: user001.user_id
    },
    {
      company_id: 2,
      name: 'The coffee house',
      address: '272 nguyen van cu',
      phone: '012345001',
      user_id: user002.user_id
    },
    {
      company_id: 3,
      name: 'Phuc long',
      address: '272 nguyen van cu',
      phone: '012345001',
      user_id: user003.user_id
    },
    {
      company_id: 4,
      name: 'Ong Bau',
      address: '272 nam ky khoi nghia',
      phone: '01234005',
      user_id: user003.user_id
    }
  ])
};
