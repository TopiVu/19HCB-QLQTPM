
exports.seed = async function (knex) {
  await knex('tourist_package').del();

  const highlandCompany = await knex('company').where({ name: 'Highland' }).first();

  return await knex('tourist_package').insert([
    {
      company_id: highlandCompany.company_id,
      name: 'Package 001',
      content: 'Package 001 content',
      image_path: null,
      price: 1000,
      start_date: "2020-12-15",
      end_date: "2020-12-30",
      expired_date: "2020-12-20",
      min_capacity: 10,
      max_capacity: 35,
    },
    {
      company_id: highlandCompany.company_id,
      name: 'Package 002',
      content: 'Package 002 content',
      image_path: null,
      price: 1500,
      start_date: "2020-12-15",
      end_date: "2020-12-30",
      expired_date: "2020-12-20",
      min_capacity: 10,
      max_capacity: 35,
    },
    {
      company_id: highlandCompany.company_id,
      name: 'Package 003',
      content: 'Package 003 content',
      image_path: null,
      price: 2000,
      start_date: "2020-12-15",
      end_date: "2020-12-30",
      expired_date: "2020-12-20",
      min_capacity: 5,
      max_capacity: 10,
    }
  ])

};
