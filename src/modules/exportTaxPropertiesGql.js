// @flow
import gql from 'graphql-tag'

export default gql`
  query exportTaxPropertiesQuery {
    exportTaxProperties @client {
      taxName
      pName
    }
  }
`
