// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import booleanToJaNein from '../../modules/booleanToJaNein'
import taxData from './taxData'
import PropertyReadOnly from '../shared/PropertyReadOnly'

const enhance = compose(activeNodeArrayData, taxData)

const Container = styled.div`
  padding: 10px;
`

const Taxonomy = ({ taxData }: { taxData: Object }) => {
  const { loading } = taxData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const tax = get(taxData, 'taxonomyById', {})
  const importedByName = get(tax, 'userByImportedBy.name')
  const organizationName = get(tax, 'organizationByOrganizationId.name')

  return (
    <Container>
      {!!tax.name && (
        <PropertyReadOnly key="name" value={tax.name} label="Name" />
      )}
      {!!tax.description && (
        <PropertyReadOnly
          key="description"
          value={tax.description}
          label="Beschreibung"
        />
      )}
      {!!tax.links && (
        <PropertyReadOnly
          key="links"
          value={tax.links.join(', ')}
          label="Links"
        />
      )}
      {!!tax.lastUpdated && (
        <PropertyReadOnly
          key="lastUpdated"
          value={format(new Date(tax.lastUpdated), 'DD.MM.YYYY')}
          label="Zuletzt aktualisiert"
        />
      )}
      {!!tax.termsOfUse && (
        <PropertyReadOnly
          key="termsOfUse"
          value={tax.termsOfUse}
          label="Nutzungsbedingungen"
        />
      )}
      {!!importedByName && (
        <PropertyReadOnly
          key="userByImportedBy"
          value={importedByName}
          label="Importiert von"
        />
      )}
      {!!organizationName && (
        <PropertyReadOnly
          key="organizationByOrganizationId"
          value={organizationName}
          label="Zuständige Organisation"
        />
      )}
      {!!tax.isCategoryStandard && (
        <PropertyReadOnly
          key="isCategoryStandard"
          value={booleanToJaNein(tax.isCategoryStandard)}
          label="Ist Standard-Taxonomie für Gruppe"
        />
      )}
      {!!tax.habitatLabel && (
        <PropertyReadOnly
          key="habitatLabel"
          value={tax.habitatLabel}
          label="Label"
        />
      )}
      {!!tax.habitatNrFnsMin && (
        <PropertyReadOnly
          key="habitatNrFnsMin"
          value={tax.habitatNrFnsMin}
          label="FNS-Nr. von"
        />
      )}
      {!!tax.habitatNrFnsMax && (
        <PropertyReadOnly
          key="habitatNrFnsMax"
          value={tax.habitatNrFnsMax}
          label="FNS-Nr. bis"
        />
      )}
      {!!tax.habitatComments && (
        <PropertyReadOnly
          key="habitatComments"
          value={tax.habitatComments}
          label="Bemerkungen"
        />
      )}
    </Container>
  )
}

export default enhance(Taxonomy)