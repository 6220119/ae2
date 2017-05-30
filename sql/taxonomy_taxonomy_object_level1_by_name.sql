-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.taxonomy_taxonomy_object_level1_by_name(taxonomy ae.taxonomy, name text)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT ae.taxonomy_object.*
    FROM ae.taxonomy_object
      INNER JOIN ae.taxonomy
      ON ae.taxonomy.id = ae.taxonomy_object.taxonomy_id
    WHERE parent_id IS NULL AND
    1 = CASE
      WHEN $2 IS NULL THEN 1
      WHEN ae.taxonomy_object.name = $2 THEN 1
      ELSE 2
    END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_taxonomy_object_level1_by_name(taxonomy ae.taxonomy, name text)
  OWNER TO postgres;
