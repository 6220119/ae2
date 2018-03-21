//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './RcoComparator'
import RcoFieldValue from './RcoFieldValue'
import exportRcoFiltersData from '../../exportRcoFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const enhance = compose(exportRcoFiltersData)

const RcoField = ({
  pcname,
  relationType,
  pname,
  jsontype,
  count,
  exportRcoFiltersData,
}: {
  pcname: String,
  relationType: String,
  pname: String,
  jsontype: String,
  count: Number,
  exportRcoFiltersData: Object,
}) => {
  const { exportRcoFilters } = exportRcoFiltersData
  const exportRcoFilter = exportRcoFilters.find(
    x =>
      x.pcname === pcname &&
      x.relationType === relationType &&
      x.pname === pname
  ) || { comparator: null, value: null }
  const { comparator, value } = exportRcoFilter

  return (
    <Container>
      <RcoFieldValue
        pcname={pcname}
        relationType={relationType}
        pname={pname}
        value={value}
        comparator={comparator}
        jsontype={jsontype}
      />
      {value !== undefined &&
        value !== null && (
          <Comparator
            pcname={pcname}
            relationType={relationType}
            pname={pname}
            comparator={comparator}
            value={value}
          />
        )}
    </Container>
  )
}

export default enhance(RcoField)
