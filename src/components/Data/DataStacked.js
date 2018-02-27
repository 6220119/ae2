// @flow
import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import SwipeableViews from 'react-swipeable-views'

import Tree from '../Tree'
import DataType from '../DataType'

const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledTabs = styled(Tabs)`
  .indicator {
    height: 3px;
  }
`
const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const enhance = compose(
  withState('tab', 'setTab', 0),
  withHandlers({
    onChangeTab: ({ setTab }) => (event, value) => {
      setTab(value)
    },
  })
)

const DataStacked = ({
  tab,
  setTab,
  onChangeTab,
}: {
  tab: Number,
  setTab: () => void,
  onChangeTab: () => void,
}) => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth

  return (
    <Fragment>
      <StyledPaper>
        <StyledTabs
          centered
          value={tab}
          onChange={onChangeTab}
          indicatorColor="#E65100"
          indicatorClassName="indicator"
        >
          <Tab label="Strukturbaum" />
          <Tab label="Formular" />
        </StyledTabs>
      </StyledPaper>
      <StyledSwipeableViews axis="x" index={tab} onChangeIndex={i => setTab(i)}>
        <Tree dimensions={{ width: windowWidth }} />
        <DataType stacked={true} dimensions={{ width: windowWidth }} />
      </StyledSwipeableViews>
    </Fragment>
  )
}

export default enhance(DataStacked)
