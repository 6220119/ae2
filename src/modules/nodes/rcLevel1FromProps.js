// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.allRelationCollections) return []
  if (!props.allRelationCollections.nodes) return []

  return props.allRelationCollections.nodes.map(rc => {
    return {
      id: rc.id,
      url: [store.activeDataType, rc.id],
      sort: [store.activeDataType, rc.name],
      label: `${rc.name}: ${rc.relationCollectionObjectsByRelationCollectionId
        .totalCount} Objekte mit Beziehungen`,
      childrenCount: 0,
    }
  })
}
