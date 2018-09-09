import React, { Component, Fragment } from 'react'
import { Modal, CloseButton, Overlay } from '../modal'
import { Heading, Text, Link } from '@hackclub/design-system'
import groupDescriptions from '../../lib/group-descriptions.json'

export default class GroupInfo extends Component {
  state = {
    active: false
  }

  toggleDisplay = () => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const { groupName } = this.props
    return (
      <>
        {groupDescriptions[groupName] && (
          <>
            <Link onClick={this.toggleDisplay} style={{ cursor: 'pointer' }}>
              (Who?)
            </Link>
            {this.state.active && (
              <>
                <Modal align="left" p={[3, 4]}>
                  <CloseButton onClick={this.toggleDisplay} />
                  <Heading.h2>{groupName}</Heading.h2>
                  <Text f={3} my={3}>
                    {groupDescriptions[groupName]}
                  </Text>
                </Modal>
                <Overlay onClick={this.toggleDisplay} />
              </>
            )}
          </>
        )}
      </>
    )
  }
}
