// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import TreeLevel2Taxonomy from './TreeLevel2Taxonomy'
import TreeLevel2Rc from './TreeLevel2Rc'
import TreeLevel2Pc from './TreeLevel2Pc'
import level1FromProps from '../modules/nodes/level1FromProps'

const enhance = compose(inject('store'), observer)

const TreeLevel1 = ({ store }: { store: Object }) =>
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeLevel1Query {
        allPropertyCollections {
          totalCount
        }
        allRelationCollections {
          totalCount
        }
        allCategories {
          totalCount
        }
      }
    `}
    render={({ error, props }) => {
      console.log('TreeLevel1: environment:', environment)
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        if (store.activeNodeArray.length === 0) {
          store.tree.setNodes(level1FromProps(store, props))
          return <Tree nodes={store.tree.nodes} />
        }
        switch (store.activeNodeArray[0]) {
          case 'Taxonomien': {
            store.tree.setActiveLevel1({ name: 'Taxonomien', sort: 1 })
            return <TreeLevel2Taxonomy level1Props={props} />
          }
          case 'Eigenschaften-Sammlungen': {
            store.tree.setActiveLevel1({
              name: 'Eigenschaften-Sammlungen',
              sort: 2,
            })
            return <TreeLevel2Rc level1Props={props} />
          }
          case 'Beziehungs-Sammlungen': {
            store.tree.setActiveLevel1({
              name: 'Beziehungs-Sammlungen',
              sort: 3,
            })
            return <TreeLevel2Pc level1Props={props} />
          }
          default:
            return <Tree nodes={store.tree.nodes} />
        }
      }
      return <div>Lade Daten</div>
    }}
  />

export default enhance(TreeLevel1)
