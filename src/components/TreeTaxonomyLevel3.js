// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeTaxonomyLevel4 from './TreeTaxonomyLevel4'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'

const enhance = compose(inject('store'), observer)

const TreeTaxonomyLevel3 = ({
  store,
  level0Props,
  level1Props,
  level2Props,
}: {
  store: Object,
  level0Props: Object,
  level1Props: Object,
  level2Props: Object,
}) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel3Query($taxonomyId: Uuid!) {
        taxonomyById(id: $taxonomyId) {
          taxonomyObjectLevel1 {
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
    variables={{ taxonomyId: store.activeNodeArray[2] }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 3) {
          store.tree.setNodes([
            ...level0FromProps(store, level0Props),
            ...taxonomyLevel1FromProps(store, level1Props),
            ...taxonomyLevel2FromProps(store, level2Props),
            ...taxonomyLevel3FromProps(store, props),
          ])
          return (
            <Tree
              nodes={store.tree.nodes}
              activeNodeArray={store.activeNodeArray}
              activeDataType={store.tree.activeDataType}
              activeCategory={store.tree.activeCategory}
              activeTaxonomy={store.tree.activeTaxonomy}
              activeLevel3={store.tree.activeLevel3}
              activeLevel4={store.tree.activeLevel4}
              activeLevel5={store.tree.activeLevel5}
              activeLevel6={store.tree.activeLevel6}
              activeLevel7={store.tree.activeLevel7}
              activeLevel8={store.tree.activeLevel8}
              activeLevel9={store.tree.activeLevel9}
              activeLevel10={store.tree.activeLevel10}
            />
          )
        } else if (store.activeNodeArray.length > 3) {
          return (
            <TreeTaxonomyLevel4
              level0Props={level0Props}
              level1Props={level1Props}
              level2Props={level2Props}
              level3Props={props}
            />
          )
        }
      }
      const level0Nodes = level0FromProps(store, level0Props)
      const level1Nodes = taxonomyLevel1FromProps(store, level1Props)
      const level2Nodes = taxonomyLevel2FromProps(store, level2Props)
      const loadingLevel3Node = {
        loadingNode: true,
        id: 'level3Loading',
        url: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.id,
          'level3Loading',
        ],
        sort: [
          store.tree.activeDataType,
          store.tree.activeCategory.name,
          store.tree.activeTaxonomy.name,
          'aaa',
        ],
        label: 'lade Daten',
        childrenCount: 0,
      }
      store.tree.setActiveLevel3(loadingLevel3Node)
      store.tree.setNodes([
        ...level0Nodes,
        ...level1Nodes,
        ...level2Nodes,
        loadingLevel3Node,
      ])
      return <Tree nodes={store.tree.nodes} />
    }}
  />

export default enhance(TreeTaxonomyLevel3)
