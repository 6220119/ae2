// @flow
import gql from 'graphql-tag'

export default gql`
  query pCQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      dataType
      name
      description
      links
      combining
      organizationId
      lastUpdated
      organizationByOrganizationId {
        id
        name
      }
      userByImportedBy {
        name
      }
    }
  }
`