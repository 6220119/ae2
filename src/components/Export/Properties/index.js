// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
//import { withWindowSize } from 'react-fns'

import HowTo from './HowTo'
import constants from '../../../modules/constants'

const enhance = compose(
  withApollo,
  //withWindowSize,
  withHandlers({
    onCheck: () => (event, isChecked) => {},
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Level1Card = styled(Card)`
  margin: 10px 0;
  padding: 0;
  > div {
    padding-bottom: 0 !important;
  }
`
const FieldsContainer = styled.div`
  margin: 16px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level2CardStyle = { margin: 0, padding: 0 }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level2CardHeaderStyle = {
  backgroundColor: '#FFF3E0',
  borderBottom: '1px solid #ebebeb',
}
const level1CardTextStyle = { padding: 0 }
const level2CardTextStyle = { padding: 0 }

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: //width,
{
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
  //width: number,
}) => {
  const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  const pcoPropertiesByPropertyCollection = groupBy(
    pcoProperties,
    'propertyCollectionName'
  )
  const pcoPropertiesFields = groupBy(pcoProperties, 'propertyName')
  console.log(
    'Export: pcoPropertiesByPropertyCollection:',
    pcoPropertiesByPropertyCollection
  )
  const pcTitle = `Eigenschaftensammlungen (${
    Object.keys(pcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(pcoPropertiesFields).length} ${
    Object.keys(pcoPropertiesFields).lengt === 1 ? 'Feld' : 'Felder'
  })`

  const rcoPropertiesByPropertyCollection = groupBy(rcoProperties, x => {
    if (x.propertyCollectionName.includes(x.relationType)) {
      return x.propertyCollectionName
    }
    return `${x.propertyCollectionName}: ${x.relationType}`
  })
  const rcoPropertiesFields = groupBy(rcoProperties, 'propertyName')
  //console.log('Export: pcoPropertiesFields:', pcoPropertiesFields)
  const rcTitle = `Beziehungssammlungen (${
    Object.keys(rcoPropertiesByPropertyCollection).length
  } Sammlungen, ${Object.keys(rcoPropertiesFields).length} ${
    Object.keys(rcoPropertiesFields).length === 1 ? 'Feld' : 'Felder'
  })`
  console.log(
    'Export: rcoPropertiesByPropertyCollection:',
    rcoPropertiesByPropertyCollection
  )

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxTitle = `Taxonomien (${
    Object.keys(taxPropertiesByTaxonomy).length
  } Taxonomien, ${Object.keys(taxPropertiesFields).length} ${
    Object.keys(taxPropertiesFields).length === 1 ? 'Feld' : 'Felder'
  })`
  console.log('Export: taxPropertiesByTaxonomy:', taxPropertiesByTaxonomy)

  return (
    <Container>
      <HowTo />
      <Level1Card>
        <CardHeader
          title={taxTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          {Object.keys(taxPropertiesByTaxonomy).map(pc => (
            <Card style={level2CardStyle} key={pc}>
              <CardHeader
                title={`${pc} (${taxPropertiesByTaxonomy[pc].length} ${
                  taxPropertiesByTaxonomy[pc].length === 1 ? 'Feld' : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
                style={level2CardHeaderStyle}
              />
              <CardText expandable={true} style={level2CardTextStyle}>
                <FieldsContainer data-width={window.innerWidth - 84}>
                  {taxPropertiesByTaxonomy[pc].map(field => (
                    <Checkbox
                      key={`${field.propertyName}${field.jsontype}`}
                      label={field.propertyName}
                      checked={false}
                      onCheck={() => console.log('todo')}
                    />
                  ))}
                </FieldsContainer>
              </CardText>
            </Card>
          ))}
        </CardText>
      </Level1Card>
      <Level1Card>
        <CardHeader
          title={pcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level2CardTextStyle}>
          {Object.keys(pcoPropertiesByPropertyCollection).map(pc => (
            <Card style={level2CardStyle} key={pc}>
              <CardHeader
                title={`${pc} (${
                  pcoPropertiesByPropertyCollection[pc].length
                } ${
                  pcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
                style={level2CardHeaderStyle}
              />
              <CardText expandable={true} style={level2CardTextStyle}>
                <FieldsContainer data-width={window.innerWidth - 84}>
                  {pcoPropertiesByPropertyCollection[pc].map(field => (
                    <Checkbox
                      key={`${field.propertyName}${field.jsontype}`}
                      label={field.propertyName}
                      checked={false}
                      onCheck={() => console.log('todo')}
                    />
                  ))}
                </FieldsContainer>
              </CardText>
            </Card>
          ))}
        </CardText>
      </Level1Card>
      <Level1Card>
        <CardHeader
          title={rcTitle}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          {Object.keys(rcoPropertiesByPropertyCollection).map(pc => (
            <Card style={level2CardStyle} key={pc}>
              <CardHeader
                title={`${pc} (${
                  rcoPropertiesByPropertyCollection[pc].length
                } ${
                  rcoPropertiesByPropertyCollection[pc].length === 1
                    ? 'Feld'
                    : 'Felder'
                })`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={level1CardTitleStyle}
                style={level2CardHeaderStyle}
              />
              <CardText expandable={true} style={level2CardTextStyle}>
                <FieldsContainer data-width={window.innerWidth - 84}>
                  {rcoPropertiesByPropertyCollection[pc].map(field => (
                    <Checkbox
                      key={`${field.propertyName}${field.jsontype}`}
                      label={field.propertyName}
                      checked={false}
                      onCheck={() => console.log('todo')}
                    />
                  ))}
                </FieldsContainer>
              </CardText>
            </Card>
          ))}
        </CardText>
      </Level1Card>
    </Container>
  )
}

export default enhance(Properties)
