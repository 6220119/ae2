// @flow
import get from 'lodash/get'

export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  const pcCount = get(props, 'allPropertyCollections.totalCount', 0)
  const rcCount = get(props, 'allRelationCollections.totalCount', 0)
  const taxCount = get(props, 'allCategories.totalCount', 0)

  return [
    {
      id: 'Eigenschaften-Sammlungen',
      url: ['Eigenschaften-Sammlungen'],
      sort: [2],
      label: `Eigenschaften-Sammlungen (${pcCount})`,
      childrenCount: pcCount,
    },
    {
      id: 'Beziehungs-Sammlungen',
      url: ['Beziehungs-Sammlungen'],
      sort: [3],
      label: `Beziehungs-Sammlungen (${rcCount})`,
      childrenCount: rcCount,
    },
    {
      id: 'Taxonomien',
      url: ['Taxonomien'],
      sort: [1],
      label: `Taxonomien (${taxCount} Gruppen)`,
      childrenCount: taxCount,
    },
  ]
}
