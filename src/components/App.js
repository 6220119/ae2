// @flow
import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { graphql, withApollo } from 'react-apollo'
//import { toJS } from 'mobx'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import treeFilterTextGql from '../modules/treeFilterTextGql'
import treeFilterIdGql from '../modules/treeFilterIdGql'
import appQuery from '../modules/appQuery'
import variablesFromStore from '../modules/variablesFromStore'
import getUrlForObject from '../modules/getUrlForObject'
import activeNodeArrayMutation from '../modules/activeNodeArrayMutation'
import treeFilterIdMutation from '../modules/treeFilterIdMutation'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})
const treeFilterTextData = graphql(treeFilterTextGql, {
  name: 'treeFilterTextData',
})
const treeFilterIdData = graphql(treeFilterIdGql, {
  name: 'treeFilterIdData',
})
const appData = graphql(appQuery, {
  options: ({
    store,
    activeNodeArrayData,
    treeFilterTextData,
    treeFilterIdData,
  }: {
    store: Object,
    activeNodeArrayData: Object,
    treeFilterTextData: Object,
    treeFilterIdData: Object,
  }) => ({
    variables: variablesFromStore({
      store,
      activeNodeArrayData,
      treeFilterTextData,
      treeFilterIdData,
    }),
    name: 'appData',
  }),
})

const enhance = compose(
  inject('store'),
  withApollo,
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData,
  appData,
  observer
)

const App = ({
  store,
  client,
  appData,
  data,
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData,
}: {
  store: Object,
  client: Object,
  appData: Object,
  data: Object,
  activeNodeArrayData: Object,
  treeFilterTextData: Object,
  treeFilterIdData: Object,
}) => {
  /**
   * TODO
   * wtf appData is undefined!?
   * instead data arrives in variable data!
   */
  //console.log('App: appData:', appData)
  //console.log('App: data:', data)
  const { error, loading, objectUrlData } = data
  const { activeNodeArray } = activeNodeArrayData
  const { treeFilterId } = treeFilterIdData
  store.setProps(data)

  const url0 =
    activeNodeArray && activeNodeArray[0] && activeNodeArray[0].toLowerCase()
      ? activeNodeArray[0].toLowerCase()
      : null
  const url1 =
    activeNodeArray && activeNodeArray[1] && activeNodeArray[1].toLowerCase()
  const show404 =
    ![
      'taxonomien',
      'eigenschaften-sammlungen',
      'organisationen',
      'export',
      'import',
      'login',
    ].includes(url0) ||
    (url0 === 'import' &&
      !['eigenschaften-sammlungen', 'beziehungs-sammlungen'].includes(url1))
  const showData = ['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
  const showExport = url0 === 'export'
  const showOrganisation = url0 === 'organisationen'
  const showLogin = url0 === 'login'
  const showImportPc = url0 === 'import' && url1 === 'eigenschaften-sammlungen'
  const showImportRc = url0 === 'import' && url1 === 'beziehungs-sammlungen'

  /**
   * TODO
   * check if treeFilterId exists
   * if true:
   * pass query result for objectUrlData to getUrlForObject()
   * then update activeNodeArray with that result
   * and reset treeFilterId
   */
  if (treeFilterId) {
    console.log('App: treeFilterId:', treeFilterId)
    console.log('App: data:', data)
    console.log('App: objectUrlData:', objectUrlData)
    const url = getUrlForObject(objectUrlData)
    console.log('App: url:', url)
    client.mutate({
      mutation: activeNodeArrayMutation,
      variables: { value: url },
    })
    client.mutate({
      mutation: treeFilterIdMutation,
      variables: { value: null },
    })
  }

  return (
    <Container>
      <AppBar />
      <Snackbar
        open={loading}
        message="lade Daten..."
        bodyStyle={{
          maxWidth: 100,
          minWidth: 100,
          backgroundColor: 'rgb(217, 78, 0)',
        }}
      />
      {error && <div> {error.message} </div>}
      {showData && <Data data={data} />}
      {showExport && <Export />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
