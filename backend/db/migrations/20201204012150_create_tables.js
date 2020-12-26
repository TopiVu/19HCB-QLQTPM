
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists('user_role', function(table){
            table.increments('user_role_id');
            table.string('code', 10).unique().notNullable();
            table.string('name', 50).notNullable();
            table.text('description');
        }),
        knex.schema.createTableIfNotExists('user', function(table) {
            table.increments('user_id');
            table.string('username', 20).notNullable().unique();
            table.string('password', 255).notNullable();
            table.string('email', 50);
            table.string('address', 255);
            table.string('phone', 12).notNullable().unique();
            table.integer('user_role_id').notNullable().unsigned().index().references('user_role_id').inTable('user_role');
        }),
        knex.schema.createTableIfNotExists('refresh_token', function(table) {
            table.increments('refresh_token_id');
            table.string('token', 64).notNullable();
            table.integer('user_id').notNullable().unsigned().index().references('user_id').inTable('user');
        }),
        knex.schema.createTableIfNotExists('company', function(table) {
            table.increments('company_id');
            table.string('name', 50).notNullable();
            table.string('address', 255).notNullable();
            table.string('phone', 12).notNullable();
            table.integer('user_id').notNullable().unsigned().index().references('user_id').inTable('user');
        }),
        knex.schema.createTableIfNotExists('tourist_package', function(table) {
            table.increments('tourist_package_id');
            table.string('name', 50).notNullable();
            table.text('content');
            table.string('image_path', 255);
            table.decimal('price').notNullable();
            table.timestamp('start_date').notNullable();
            table.timestamp('end_date').notNullable();
            table.timestamp('expired_date');
            table.integer('status').notNullable().default(1);
            table.integer('min_capacity');
            table.integer('max_capacity');
            table.integer('company_id').notNullable().unsigned().index().references('company_id').inTable('company');
        }),
        knex.schema.createTableIfNotExists('booking', function(table) {
            table.increments('booking_id');
            table.integer('status').notNullable().default(1);
            table.integer('user_id').notNullable().unsigned().index().references('user_id').inTable('user');
            table.integer('tourist_package_id').notNullable().unsigned().index().references('tourist_package_id').inTable('tourist_package');
        }),
        knex.schema.createTableIfNotExists('feedback', function(table) {
            table.increments('feedback_id');
            table.text('feedback');
            table.integer('rate').notNullable();
            table.integer('user_id').notNullable().unsigned().index().references('user_id').inTable('user');
            table.integer('tourist_package_id').notNullable().unsigned().index().references('tourist_package_id').inTable('tourist_package');
        }),
        knex.schema.createTableIfNotExists('tourist_area', function(table) {
            table.increments('tourist_area_id');
            table.string('name', 50).notNullable();
            table.text('content');
            table.string('image_path', 255);
        }),
        knex.schema.createTableIfNotExists('tourist_package_area', function(table) {
            table.increments('tourist_package_area_id');
            table.integer('tourist_area_id').notNullable().unsigned().index().references('tourist_area_id').inTable('tourist_area');
            table.integer('tourist_package_id').notNullable().unsigned().index().references('tourist_package_id').inTable('tourist_package');
        }),
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('refresh_token'),
        knex.schema.dropTableIfExists('booking'),
        knex.schema.dropTableIfExists('tourist_package_area'),
        knex.schema.dropTableIfExists('tourist_area'),
        knex.schema.dropTableIfExists('feedback'),
        knex.schema.dropTableIfExists('tourist_package'),
        knex.schema.dropTableIfExists('company'),
        knex.schema.dropTableIfExists('user'),
        knex.schema.dropTableIfExists('user_role'),
    ]);
};
