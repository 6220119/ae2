// @flow

import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import getActiveNodeArrayFromPathname from '../../modules/getActiveNodeArrayFromPathname'

export default {
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'activeNodeArray@client': value } })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        app.history.push(`/${value.join('/')}`)
      }
      return null
    },
  },
}
