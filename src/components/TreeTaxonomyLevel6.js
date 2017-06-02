// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { inject } from 'mobx-react'
import compose from 'recompose/compose'

import environment from '../modules/createRelayEnvironment'
import Tree from './Tree'
import sort from '../modules/nodes/sort'
import level0FromProps from '../modules/nodes/level0FromProps'
import taxonomyLevel1FromProps from '../modules/nodes/taxonomyLevel1FromProps'
import taxonomyLevel2FromProps from '../modules/nodes/taxonomyLevel2FromProps'
import taxonomyLevel3FromProps from '../modules/nodes/taxonomyLevel3FromProps'
import taxonomyLevel4FromProps from '../modules/nodes/taxonomyLevel4FromProps'
import taxonomyLevel5FromProps from '../modules/nodes/taxonomyLevel5FromProps'
import taxonomyLevel6FromProps from '../modules/nodes/taxonomyLevel6FromProps'

const enhance = compose(inject('store'))

const TreeTaxonomyLevel6 = ({ store }: { store: Object }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TreeTaxonomyLevel6Query {
        allDataTypes {
          nodes {
            nameGerman
            name
            propertyCollectionsByDataType {
              totalCount
            }
            relationCollectionsByDataType {
              totalCount
            }
            categoriesByDataType {
              totalCount
              nodes {
                id
                name
                taxonomiesByCategory {
                  totalCount
                  nodes {
                    id
                    name
                    isCategoryStandard
                    taxonomyObjectsByTaxonomyId(condition: {level: 1, taxonomyId: "5444e7eb-177f-4faf-ba44-0e3da1b391e0"}) {
                      totalCount
                      nodes {
                        id
                        name
                        taxonomyObjectsByParentId(condition: {parentId: "5f8f6fac-fe63-49c5-a143-f2e6e2174602"}) {
                          totalCount
                          nodes {
                            id
                            name
                            taxonomyObjectsByParentId(condition: {parentId: "75839957-4706-40d6-bf72-7ad13906ab5f"}) {
                              totalCount
                              nodes {
                                id
                                name
                                taxonomyObjectsByParentId(condition: {parentId: "a011dc29-dc05-4540-a791-1a4976905290"}) {
                                  totalCount
                                  nodes {
                                    id
                                    name
                                    taxonomyObjectsByParentId {
                                      totalCount
                                      nodes {
                                        id
                                        name
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ error, props }) => (
      <Tree
        nodes={sort([
          ...level0FromProps(props),
          ...taxonomyLevel1FromProps(store, props),
          ...taxonomyLevel2FromProps(store, props),
          ...taxonomyLevel3FromProps(store, props),
          ...taxonomyLevel4FromProps(store, props),
          ...taxonomyLevel5FromProps(store, props),
          ...taxonomyLevel6FromProps(store, props),
        ])}
      />
    )}
  />
)

export default enhance(TreeTaxonomyLevel6)
