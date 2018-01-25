import React from 'react'
import IconButton from 'material-ui-next/IconButton'
import Menu, { MenuItem } from 'material-ui-next/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import styled from 'styled-components'

const StyledMoreVertIcon = styled(MoreVertIcon)`
  color: white !important;
`

const ITEM_HEIGHT = 48

class MoreMenu extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <StyledMoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem
            key="ueber"
            onClick={() => window.open('https://github.com/barbalex/ae2')}
          >
            über arteigenschaften.ch
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default MoreMenu