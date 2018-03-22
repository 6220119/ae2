//@flow
import React from 'react'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../../addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../removeExportRcoPropertyMutation'
import exportRcoPropertiesData from '../../../../exportRcoPropertiesData'

const Container = styled.div`
  margin-bottom: 16px;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  exportRcoPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const relationType = p.relationType
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { pcname, relationType, pname },
        })
      })
    },
  })
)

const AllRcoChooser = ({
  onCheck,
  properties,
  exportRcoPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportRcoPropertiesData: Object,
}) => {
  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportRcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName &&
          x.relationType === p.relationType &&
          x.pname === p.propertyName
      ).length > 0
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label="alle"
      />
    </Container>
  )
}

export default enhance(AllRcoChooser)
