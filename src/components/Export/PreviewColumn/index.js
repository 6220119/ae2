// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import get from 'lodash/get'

import exportData from './exportData'
import exportTaxonomiesData from '../exportTaxonomiesData'
import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportTaxPropertiesData from '../exportTaxPropertiesData'
import exportTaxFiltersData from '../exportTaxFiltersData'
import exportPcoFiltersData from '../exportPcoFiltersData'
import exportRcoFiltersData from '../exportRcoFiltersData'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'
import ErrorBoundary from '../../shared/ErrorBoundary'

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportWithSynonymDataData,
  exportData
)

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const Filter = ({
  exportData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportWithSynonymDataData,
}: {
  exportData: Object,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
  exportWithSynonymDataData: Object,
}) => {
  const objectsCount = get(exportData, 'exportObject.totalCount', 0)

  return (
    <ErrorBoundary>
      <Container>
        <OptionsChoosen />
        <Preview />
        {objectsCount === 0 && (
          <HowToDiv>
            Sobald eine Taxonomie gewählt ist, werden hier Daten angezeigt.
          </HowToDiv>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Filter)
