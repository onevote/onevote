import React, { Fragment } from 'react'
import styled from 'styled-components'
import theme from '../../theme/config'
import Profile from './profile'
import { Heading, Flex, Box } from '@hackclub/design-system'
import { isEmpty, first } from 'lodash'
import GroupInfo from './groupInfo'

const Grid = styled(Box)`
  ${theme.mediaQueries.lg} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.space[3]}px;
    > div {
      margin: 0;
      width: 100%;
    }
  }
`

const Group = ({ profiles, label, children }) =>
  isEmpty(first(profiles)) ? null : (
    <Fragment>
      <Flex justify={['space-between', 'center']} mt={4}>
        <Heading.h2
          caps
          fontSize={2}
          color={theme.colors.slate}
          mr={[null, 2]}
          // style={{ fontWeight: 'bold' }}
          children={label}
        />
        <GroupInfo groupName={label} />
      </Flex>
      <Grid mx={[null, 3, -4, -6]} mt={3}>
        {profiles.map(profile => (
          <Profile mt={2} mb={3} data={profile} key={profile.name.last} />
        ))}
      </Grid>
    </Fragment>
  )

export default Group
