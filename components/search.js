import React, { Component } from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import { trim, isEmpty, map, keys } from 'lodash'
import axios from 'axios'
import { Box, Button, Flex, Label } from '@hackclub/design-system'
import Icon from '@hackclub/icons'
import SearchInput from '../components/searchInput'
import Group from './profile/group'
import Spinner from 'respin'

const SearchButton = styled(Button.button).attrs({
  px: 0,
  py: 0,
  ml: 3,
  children: props =>
    props.loading ? <Spinner /> : <Icon glyph="search" size={48} />
})`
  flex-shrink: 0;
  line-height: 0 !important;
  background: ${theme.colors.white};
  color: ${theme.colors.brand};
  border-radius: 32px;
  width: 64px;
  height: 64px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: ${theme.transition} box-shadow;
  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.125), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  &:active {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`

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
          <SearchButton
            glyph="search"
            circle
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
