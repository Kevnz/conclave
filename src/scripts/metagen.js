const fs = require('fs').promises
const Knex = require('knex')
require('../utils/logger')

const knexfile = require('../../knexfile')
const knex = Knex(knexfile[process.env.NODE_ENV || 'development'])
const Mapper = require('../utils/async/mapper')
const TABLE_QUERY = `SELECT
table_name
FROM
information_schema.TABLES
WHERE
table_schema = 'public'
AND
table_name not like 'knex_%';
`
const getQuery = table => {
  return `
  SELECT
    column_name, data_type, character_maximum_length, udt_name
  FROM
    information_schema.COLUMNS
  WHERE
    TABLE_NAME = '${table}';
  `
}

const getRelQuery = table => {
  return `
  SELECT
    n.nspname as schema,
    c.relname as table,
    f.attname as column,
    f.attnum as column_id,
    f.attnotnull as not_null,
    f.attislocal not_inherited,
    f.attinhcount inheritance_count,
    pg_catalog.format_type(f.atttypid,f.atttypmod) AS data_type_full,
    t.typname AS data_type_name,
    CASE
        WHEN f.atttypmod >= 0 AND t.typname <> 'numeric'THEN (f.atttypmod - 4) --first 4 bytes are for storing actual length of data
    END AS data_type_length,
    CASE
        WHEN t.typname = 'numeric' THEN (((f.atttypmod - 4) >> 16) & 65535)
    END AS numeric_precision,
    CASE
        WHEN t.typname = 'numeric' THEN ((f.atttypmod - 4)& 65535 )
    END AS numeric_scale,
    CASE
        WHEN p.contype = 'p' THEN true
        ELSE false
    END AS is_primary_key,
    CASE
        WHEN p.contype = 'p' THEN p.conname
    END AS primary_key_name,
    CASE
        WHEN p.contype = 'u' THEN true
        ELSE false
    END AS is_unique_key,
    CASE
        WHEN p.contype = 'u' THEN p.conname
    END AS unique_key_name,
    CASE
        WHEN p.contype = 'f' THEN true
        ELSE false
    END AS is_foreign_key,
    CASE
        WHEN p.contype = 'f' THEN p.conname
    END AS foreignkey_name,
    CASE
        WHEN p.contype = 'f' THEN p.confkey
    END AS foreign_key_columnid,
    CASE
        WHEN p.contype = 'f' THEN g.relname
    END AS foreign_key_table,
    CASE
        WHEN p.contype = 'f' THEN p.conkey
    END AS foreign_key_local_column_id,
    CASE
        WHEN f.atthasdef = 't' THEN d.adsrc
    END AS default_value
  FROM pg_attribute f
    JOIN pg_class c ON c.oid = f.attrelid
    JOIN pg_type t ON t.oid = f.atttypid
    LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = f.attnum
    LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
    LEFT JOIN pg_constraint p ON p.conrelid = c.oid AND f.attnum = ANY (p.conkey)
    LEFT JOIN pg_class AS g ON p.confrelid = g.oid
  WHERE c.relkind = 'r'::char
    AND f.attisdropped = false
    AND n.nspname = 'public'
    AND c.relname = '${table}'
    AND f.attnum > 0
  ORDER BY f.attnum;
`
}
const run = async () => {
  const tables = await knex.raw(TABLE_QUERY)
  const tableNames = tables.rows.map(t => t.table_name)

  const results = await Mapper(tableNames, async t => {
    const query = getQuery(t)
    const fullQuery = getRelQuery(t)
    const [results, full] = await Promise.all([
      knex.raw(query),
      knex.raw(fullQuery),
    ])
    console.info('full', full.rows)

    const props = full.rows.reduce((prs, row) => {
      if (row.is_foreign_key) return prs

      prs[row.column] = row.data_type_name
      return prs
    }, {})
    return {
      table: t,
      info: results.rows,
      fullInfo: full.rows,
      properties: props,
    }
  })
  console.log('results', results)
  await fs.writeFile('results.json', JSON.stringify(results, null, 2))
  return results
}

run().then(results => {
  console.log('DONE')
  process.exit(0)
})
