import React, { Fragment } from 'react'
import theme from '../../theme/config'
import Profile from './profile'
import { Heading, Flex } from '@hackclub/design-system'
import { isEmpty, first } from 'lodash'
import GroupInfo from './groupInfo'

const Group = ({ profiles, label, children }) =>
  isEmpty(first(profiles)) ? null : (
    <Fragment>
      <Flex justify="space-between" mt={4}>
        <Heading.h2
          caps
          regular
          fontSize={2}
          color={theme.colors.muted}
          children={label}
        />
        <GroupInfo groupName={label} />
      </Flex>
      {profiles.map(
        profile =>
          !isEmpty(profile) && (
            <Profile mt={2} mb={3} data={profile} key={profile.name.last} />
          )
      )}
    </Fragment>
  )

export default Group
