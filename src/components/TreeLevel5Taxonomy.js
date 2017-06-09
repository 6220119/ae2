// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel6Taxonomy from './TreeLevel6Taxonomy'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel5Taxonomy = ({
  store,
  level1Props,
  level2Props,
  level3Props,
  level4Props,
}: {
  store: Object,
  level1Props: Object,
  level2Props: Object,
  level3Props: Object,
  level4Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel5TaxonomyQuery($level4: Uuid!) {
        taxonomyObjectById(id: $level4) {
          taxonomyObjectsByParentId {
            totalCount
            nodes {
              id
              name
              taxonomyObjectsByParentId {
                totalCount
              }
            }
          }
        }
      }
    `}
    variables={{ level4: store.activeNodeArray[3] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 4) {
          store.tree.setNodes([
            ...level1FromProps(store, level1Props),
            ...level2TaxonomyFromProps(store, level2Props),
            ...level3TaxonomyFromProps(store, level3Props),
            ...level4TaxonomyFromProps(store, level4Props),
            ...level5TaxonomyFromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeDataType={store.tree.activeDataType}
              activeCategory={store.tree.activeCategory}
              activeTaxonomy={store.tree.activeTaxonomy}
              activeLevel5Taxonomy={store.tree.activeLevel5Taxonomy}
              activeLevel6Taxonomy={store.tree.activeLevel6Taxonomy}
              activeLevel7Taxonomy={store.tree.activeLevel7Taxonomy}
              activeLevel8Taxonomy={store.tree.activeLevel8Taxonomy}
              activeLevel9Taxonomy={store.tree.activeLevel9Taxonomy}
              activeLevel10Taxonomy={store.tree.activeLevel10Taxonomy}
            />
          )
        } else if (store.activeNodeArray.length > 4) {
          return (
            <TreeLevel6Taxonomy
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={level3Props}
              level4Props={level4Props}
              level5Props={props}
            />
          )
        }
      }
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeLevel5Taxonomy)