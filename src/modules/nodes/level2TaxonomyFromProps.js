// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.categoryByDataType) return []
  if (!props.categoryByDataType.nodes) return []

  return props.categoryByDataType.nodes.map(node => {
    const childrenCount = node.taxonomyByCategory.totalCount
    // const taxonomyText = childrenCount !== 1 ? 'Taxonomien' : 'Taxonomie'
    // const labelCount = ` (${childrenCount} ${taxonomyText})`
    const labelCount = ` (${childrenCount})`
    if (store.activeNodeArray[1] === node.name) {
      store.tree.setActiveLevel2Taxonomy(node)
    }

    return {
      id: node.id,
      url: [store.tree.activeLevel1.name, node.name],
      sort: [store.tree.activeLevel1.sort, node.name],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
