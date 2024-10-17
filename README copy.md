# marsoul_backend
## Knex

---

### Migrations:

- `knex migrate:list`
- `knex migrate:up`
- `knex migrate:down`
- `knex migrate:latest`
- `knex migrate:rollback --all`
- `knex migrate:up 001_migration_name.ts`
- `knex migrate:make create_tablename_table`

---

### Seeders:

- `knex seed:make TableSeeder`
- `knex seed:run`
- `knex seed:run --specific=TableSeeder.ts`

---  
