// @flow
/**
 * if no fields were passed: return standard fields
 * else: return passed fields added to standard fields
 *
 * use a paremeterized query to avoid sql injection:
 * http://vitaly-t.github.io/pg-promise/ParameterizedQuery.html
 * Uups: that is really hard because of the objects!
 */
const app = require(`ampersand-app`)
//const PQ = require('pg-promise').ParameterizedQuery

module.exports = async (request, h) => {
  const { fields } = request.query
  if (fields === undefined) {
    // No fields passed - returning standard fields
    return await app.db.any('select * from ae.alt_standard')
  }
  /**
   * fields should have this form:
   * Array of object:
   * {
   *    ctype: 'tax', 'pco' or 'rco'
   *    cname
   *    property
   * }
   *
   * TODO: build sql from array of fields
   */
  //const taxFields = fields.filter(f => f.t === 'tax')
  const pcoFields = JSON.parse(fields).filter(f => f.t === 'pco')
  //const rcoFields = fields.filter(f => f.t === 'rco')
  const sql1 = `select
                  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
                  (ae.object.properties->>'Taxonomie ID')::integer as "ref",
                  substring(ae.property_collection_object.properties->>'GIS-Layer', 1, 50) as "gisLayer",
                  (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer AS "distance",
                  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art'), '(kein Artname)'), 1, 255) as "nameLat",
                  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "nameDeu",
                  CASE
                    WHEN EXISTS(
                      SELECT
                        ae.property_collection_object.properties->>'Artwert'
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id = ae.object.id
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        -- make sure Artwert can be cast to integer
                        -- there exist values like this: 14?
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                    ) THEN (
                      SELECT
                        (ae.property_collection_object.properties->>'Artwert')::int
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id = ae.object.id
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                      LIMIT 1
                    )
                    WHEN EXISTS(
                      SELECT
                        ae.property_collection_object.properties->>'Artwert'
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                    ) THEN (
                      SELECT
                        (ae.property_collection_object.properties->>'Artwert')::int
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                      LIMIT 1
                    )
                    ELSE 0
                  END AS "artwert"`
  const sqlPco = pcoFields.map(
    f => `CASE
            WHEN EXISTS(
              SELECT
                ae.property_collection_object.properties->>'${f.p}'
              FROM
                ae.property_collection_object
                inner join ae.property_collection
                on ae.property_collection_object.property_collection_id = ae.property_collection.id
              WHERE
                ae.property_collection_object.object_id = ae.object.id
                and ae.property_collection.name = '${f.n}'
            ) THEN (
              SELECT
                ae.property_collection_object.properties->>'${f.p}'
              FROM
                ae.property_collection_object
                inner join ae.property_collection
                on ae.property_collection_object.property_collection_id = ae.property_collection.id
              WHERE
                ae.property_collection_object.object_id = ae.object.id
                and ae.property_collection.name = '${f.n}'
              LIMIT 1
            )
            WHEN EXISTS(
              SELECT
                ae.property_collection_object.properties->>'${f.p}'
              FROM
                ae.property_collection_object
                inner join ae.property_collection
                on ae.property_collection_object.property_collection_id = ae.property_collection.id
              WHERE
                ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                and ae.property_collection.name = '${f.n}'
            ) THEN (
              SELECT
                ae.property_collection_object.properties->>'${f.p}'
              FROM
                ae.property_collection_object
                inner join ae.property_collection
                on ae.property_collection_object.property_collection_id = ae.property_collection.id
              WHERE
                ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                and ae.property_collection.name = '${f.n}'
              LIMIT 1
            )
            ELSE null
          END AS "${f.p}"`
  )
  const sqlEnd = `from
                    ae.object
                    inner join ae.taxonomy
                    on ae.object.taxonomy_id = ae.taxonomy.id
                      inner join ae.property_collection_object
                      on ae.property_collection_object.object_id = ae.object.id
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                  where
                    ae.taxonomy.name in('CSCF (2009)', 'SISF Index 2 (2005)')
                    and ae.object.properties is not null
                    and ae.object.properties->>'Taxonomie ID' ~ E'^\\\\d+$'
                    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
                    and ae.property_collection.name = 'ZH GIS'
                    and ae.property_collection_object.properties->>'GIS-Layer' is not null
                    and ae.property_collection_object.properties->>'Betrachtungsdistanz (m)' ~ E'^\\\\\d+$'
                    and (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer < 2147483647;`
  //const query = new PQ('SELECT * FROM Users WHERE id = $1', fields)
  const sql = `${sql1},${sqlPco.join()} ${sqlEnd}`
  console.log('sql:', sql)
  return await app.db.any(sql)
}
