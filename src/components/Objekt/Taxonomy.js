// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Linkify from 'react-linkify'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`
const Row = styled.div`display: flex;`
const Label = styled.p`
  flex-basis: 230px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: right;
  padding-right: 5px;
  margin: 2px 0;
  color: grey;
`
const Value = styled.p`margin: 2px 0;`
const linkifyProperties = {
  target: '_blank',
  style: {
    color: 'inherit',
    fontWeight: 100,
    cursor: 'pointer',
  },
}

const Taxonomy = ({ taxonomy }: { taxonomy: Object }) => {
  const organizationName = get(taxonomy, 'organizationByOrganizationId.name')

  return (
    <Linkify properties={linkifyProperties}>
      <Container>
        {taxonomy.lastUpdated &&
          <Row>
            <Label>
              {'Stand:'}
            </Label>
            <Value>
              {taxonomy.lastUpdated}
            </Value>
          </Row>}
        {taxonomy.links &&
          taxonomy.links.length > 0 &&
          <Row>
            <Label>
              {'Link:'}
            </Label>
            <Value>
              {taxonomy.links}
            </Value>
          </Row>}
        {organizationName &&
          <Row>
            <Label>
              {'Organisation mit Schreibrecht:'}
            </Label>
            <Value>
              {organizationName}
            </Value>
          </Row>}
      </Container>
    </Linkify>
  )
}

export default Taxonomy
