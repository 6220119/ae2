// @flow
import { extendObservable, autorun, autorunAsync, reaction, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import getActiveNodeArrayFromPathname from '../action/getActiveNodeArrayFromPathname'
import buildNodesFromAppQuery from '../../modules/buildNodesFromAppQuery'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorun('manipulateActiveNodeArray', () => {
      const activeNodeArray = toJS(store.activeNodeArray)
      // forward root to taxonomy
      if (activeNodeArray.length === 0) {
        return store.setActiveNodeArray(['Taxonomien'])
      }
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, activeNodeArray)) {
        store.history.push(`/${activeNodeArray.join('/')}`)
      }
      // set activeTreeLevel
      store.activeTreeLevel = activeNodeArray.length
    }),
    buildNodes: reaction(
      () => store.props,
      () => buildNodesFromAppQuery(store)
    ),
    onChangeObject: reaction(
      () => get(store.props, 'taxonomyObjectById.objectByObjectId', null),
      () =>
        store.setActiveTaxonomyObject(
          get(store.props, 'taxonomyObjectById.objectByObjectId', null)
        )
    ),
    onChangeCategories: reaction(
      () => get(store.props, 'allCategories.nodes', []),
      (categoryNodes: Array<Object>) => {
        const categoryNames = categoryNodes.map(c => c.name)
        const storeCategories = toJS(store.categories)
        if (!isEqual(storeCategories, categoryNames)) {
          store.setCategories(categoryNames)
        }
      }
    ),
    onChangePcoPropertiesByCategories: reaction(
      () => get(store.props, 'pcoPropertiesByCategoriesFunction.nodes', []),
      (pcoProperties: Array<Object>) =>
        store.export.setPcoProperties(pcoProperties)
    ),
  })
}
