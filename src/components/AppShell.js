// @flow
/**
 * This compoents job is to rerender App
 * every time one of the passed values changes
 * Result: data is requeried.
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import App from './App'

const enhance = compose(inject('store'), observer)

const AppShell = ({ store }: { store: Object }) => (
  <App
    activeNodeArrayString={store.activeNodeArray.join()}
    treeFilterText={store.treeFilter.text}
    treeFilterId={store.treeFilter.id}
  />
)

export default enhance(AppShell)
