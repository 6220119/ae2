-- this one first because of references to it
DROP TABLE IF EXISTS ae.user CASCADE;
CREATE TABLE ae.user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE,
  email text UNIQUE,
  -- is this still used?
  role name NOT NULL DEFAULT 'org_writer' check (length(role) < 512),
  pass text NOT NULL DEFAULT 'secret' check (length(pass) > 5),
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
  
-- data_type is used for root nodes in app's tree
-- actually: is not used in app, values are directly set :-(
DROP TABLE IF EXISTS ae.data_type CASCADE;
CREATE TABLE ae.data_type (
  name text PRIMARY KEY
);
INSERT INTO ae.data_type VALUES ('Taxonomien'), ('Eigenschaften-Sammlungen');

DROP TABLE IF EXISTS ae.category CASCADE;
CREATE TABLE ae.category (
  name text PRIMARY KEY,
  -- data_type is used to attach categories to root node in app's tree
  data_type text DEFAULT 'Taxonomien' REFERENCES ae.data_type (name) ON DELETE SET NULL ON UPDATE CASCADE,
  id UUID DEFAULT uuid_generate_v1mc()
);

DROP TABLE IF EXISTS ae.organization CASCADE;
CREATE TABLE ae.organization (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE NOT NULL,
  links text[] DEFAULT NULL,
  contact UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX ON ae.organization USING btree (name);

-- once: ALTER TABLE ae.organization ADD CONSTRAINT fk_contact FOREIGN KEY (contact) REFERENCES ae.user (id)

DROP TABLE IF EXISTS ae.taxonomy CASCADE;
CREATE TABLE ae.taxonomy (
  -- gets existing guids
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE DEFAULT NULL,
  description text DEFAULT NULL,
  links text[] DEFAULT NULL,
  last_updated date DEFAULT NULL,
  organization_id UUID DEFAULT NULL REFERENCES ae.organization (id) ON DELETE SET NULL ON UPDATE CASCADE,
  is_category_standard boolean DEFAULT FALSE,
  imported_by UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  terms_of_use text DEFAULT NULL,
  habitat_label varchar(50) DEFAULT NULL,
  habitat_comments text DEFAULT NULL,
  habitat_nr_fns_min integer DEFAULT NULL,
  habitat_nr_fns_max integer DEFAULT NULL,
  CONSTRAINT proper_links CHECK (length(regexp_replace(array_to_string(links, ''),'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)',''))=0)
);

CREATE INDEX ON ae.taxonomy USING btree (name);
CREATE INDEX ON ae.taxonomy USING btree (category);

DROP TABLE IF EXISTS ae.object CASCADE;
CREATE TABLE ae.object (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  taxonomy_id UUID NOT NULL REFERENCES ae.taxonomy (id) ON DELETE CASCADE ON UPDATE CASCADE,
  -- need to temporarily turn off this reference because it is violated during import
  parent_id UUID DEFAULT NULL,-- REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  name text,
  properties jsonb DEFAULT NULL,
  category text DEFAULT NULL REFERENCES ae.category (name) ON UPDATE CASCADE,
  -- UUID's are by definition lowercase
  -- postgresql converts them to it
  -- see: https://www.postgresql.org/docs/9.6/static/datatype-uuid.html
  -- but UUID's generated by Access are uppercase!!!!
  -- so keep them around in the original form
  id_old text DEFAULT NULL
);
--once: ALTER TABLE ae.object ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES ae.object (id);
-- once: ALTER TABLE ae.object ALTER COLUMN name DROP NOT NULL
CREATE INDEX ON ae.object USING btree (name);


-- ae.object to ae.object relationship
-- best to add every relationship twice, see: https://stackoverflow.com/a/17128606/712005
DROP TABLE IF EXISTS ae.synonym CASCADE;
CREATE TABLE ae.synonym (
  object_id UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id_synonym UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (object_id, object_id_synonym)
);

DROP TABLE IF EXISTS ae.property_collection CASCADE;
CREATE TABLE ae.property_collection (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  data_type text DEFAULT 'Eigenschaften-Sammlungen' REFERENCES ae.data_type (name) ON DELETE SET NULL ON UPDATE CASCADE,
  -- later add UNIQUE
  name text NOT NULL,
  description text DEFAULT NULL,
  links text[] DEFAULT NULL,
  combining boolean DEFAULT FALSE,
  organization_id UUID NOT NULL REFERENCES ae.organization (id) ON DELETE SET NULL ON UPDATE CASCADE,
  last_updated date DEFAULT NULL,
  terms_of_use text DEFAULT NULL,
  imported_by UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE
  --CONSTRAINT proper_links CHECK (length(regexp_replace(array_to_string(links, ''),'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)',''))=0)
);
-- once: ALTER TABLE ae.property_collection ADD UNIQUE (name);
CREATE INDEX ON ae.property_collection USING btree (name);
CREATE INDEX ON ae.property_collection USING btree (combining);

DROP TABLE IF EXISTS ae.property_collection_object CASCADE;
CREATE TABLE ae.property_collection_object (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  object_id UUID REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  property_collection_id UUID REFERENCES ae.property_collection (id) ON DELETE CASCADE ON UPDATE CASCADE,
  properties jsonb DEFAULT NULL,
  UNIQUE (object_id, property_collection_id)
);

DROP TABLE IF EXISTS ae.relation CASCADE;
CREATE TABLE ae.relation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  property_collection_id UUID NOT NULL REFERENCES ae.property_collection (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id_relation UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  relation_type text NOT NULL,
  properties jsonb DEFAULT NULL,
  UNIQUE (property_collection_id, object_id, object_id_relation, relation_type)
);
CREATE INDEX ON ae.relation USING btree (relation_type);

DROP TABLE IF EXISTS ae.role CASCADE;
CREATE TABLE ae.role (
  name text PRIMARY KEY
);

DROP TABLE IF EXISTS ae.organization_user;
CREATE TABLE ae.organization_user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  organization_id UUID REFERENCES ae.organization (id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id UUID REFERENCES ae.user (id) ON DELETE CASCADE ON UPDATE CASCADE,
  role text REFERENCES ae.role (name) ON DELETE CASCADE ON UPDATE CASCADE,
  unique(organization_id, user_id, role)
);

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.tax_properties_by_taxonomy CASCADE;
CREATE TABLE ae.tax_properties_by_taxonomy (
  taxonomy_name text,
  property_name text,
  jsontype text,
  count bigint
);

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.pco_properties_by_taxonomy CASCADE;
CREATE TABLE ae.pco_properties_by_taxonomy (
  property_collection_name text,
  property_name text,
  jsontype text,
  count bigint
);

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.rco_properties_by_taxonomy CASCADE;
CREATE TABLE ae.rco_properties_by_taxonomy (
  property_collection_name text,
  relation_type text,
  property_name text,
  jsontype text,
  count bigint
);

DROP TABLE IF EXISTS ae.rco_count_by_taxonomy_relation_type CASCADE;
CREATE TABLE ae.rco_count_by_taxonomy_relation_type(
  property_collection_name text,
  relation_type text,
  count bigint
);

DROP TABLE IF EXISTS ae.categories_of_taxonomies_count CASCADE;
CREATE TABLE ae.categories_of_taxonomies_count (
  name text,
  id uuid,
  count bigint
);

DROP TABLE IF EXISTS ae.categories_of_taxonomies CASCADE;
CREATE TABLE ae.categories_of_taxonomies (
  taxonomy_id uuid,
  category_name text
);

DROP TABLE IF EXISTS ae.taxonomies_of_category CASCADE;
CREATE TABLE ae.taxonomies_of_category (
  category_name text,
  category_id uuid,
  taxonomy_name text,
  taxonomy_id uuid,
  object_count bigint
);

DROP TABLE IF EXISTS ae.prop_value CASCADE;
CREATE TABLE ae.prop_value (
  value text
);
