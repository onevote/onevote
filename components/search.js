import React, { Component } from 'react'
import styled from 'styled-components'
import { trim, isEmpty, map, keys } from 'lodash'
import axios from 'axios'
import { Box, LargeButton, Flex, Label } from '@hackclub/design-system'
import SearchInput from '../components/searchInput'
import Group from './profile/group'
import Spinner from 'respin'

class Search extends Component {
  state = {
    address: '',
    loading: false,
    contests: [],
    error: null
  }

  handleChange = e => {
    const address = trim(e.target.value)
    this.setState({ address })
  }

  fetchData() {
    const { address } = this.state
    console.log('Address', address)
    this.setState({ loading: true })
    const payload = {
      address
    }
    const query = keys(payload)
      .map(key => map([key, payload[key]], encodeURIComponent).join('='))
      .join('&')
    const url = `/locate?${query}`
    axios
      .get(url)
      .then(res => res.data.contests)
      .then(contests => {
        console.log('Res', contests)
        this.setState({ loading: false, contests })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loading: false, error: 'error' })
      })
  }

  render() {
    const { loading, address, contests, error } = this.state
    return (
      <Box my={3}>
        <Label htmlFor="address" mb={2} fontSize={2} color="muted" caps>
          Enter your home (U.S.) address
        </Label>
        <Searcher align="flex-end" width={1}>
          <SearchInput
            name="address"
            id="address"
            placeholder="1 Infinite Loop, Cupertino, CA"
            onKeyDown={
              e => {
                if (e.which === 13) this.fetchData()
              } /* submit on enter key press */
            }
            onChange={this.handleChange}
            style={{ maxWidth: '100%' }}
          />
          <LargeButton
            ml={2}
            bg="info"
            children={loading ? <Spinner /> : 'Search'}
            onClick={e => !isEmpty(trim(address)) && this.fetchData()}
          />
        </Searcher>
        {error && (
          <Text
            color="error"
            bold
            fontSize={3}
            py={3}
            center
            children={error}
          />
        )}
        {contests.map(group => (
          <Group
            profiles={group.candidates}
            label={group.office}
            key={`group-${group.district.id}`}
          />
        ))}
      </Box>
    )
  }
}

const Searcher = styled(Flex)`
  input,
  button {
    height: 64px;
  }
`

export default Search
