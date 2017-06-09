// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.categoryByName) return []
  if (!props.categoryByName.taxonomiesByCategory) return []
  if (!props.categoryByName.taxonomiesByCategory.nodes) return []

  return props.categoryByName.taxonomiesByCategory.nodes.map(node => {
    const childrenCount = node.taxonomyObjectLevel1.totalCount
    const labelCount = ` (${childrenCount})`
    if (store.activeNodeArray[2] === node.id) {
      store.tree.setActiveLevel3Taxonomy(node)
    }

    return {
      id: node.id,
      url: [
        store.tree.activeLevel1.name,
        store.tree.activeLevel2Taxonomy.name,
        node.id,
      ],
      sort: [
        store.tree.activeLevel1.sort,
        store.tree.activeLevel2Taxonomy.name,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
