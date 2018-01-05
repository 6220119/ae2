// @flow
import gql from 'graphql-tag'

export default gql`
  query orgTCsQuery($name: String!) {
    categoriesOfTaxonomiesFunction {
      nodes {
        taxonomyId
        categoryName
      }
    }
    organizationByName(name: $name) {
      id
      taxonomiesByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`