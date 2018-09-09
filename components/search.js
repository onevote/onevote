import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import styled from 'styled-components'
import { trim, isEmpty, map, keys } from 'lodash'
import axios from 'axios'
import { Box, LargeButton, Flex, Label, Text } from '@hackclub/design-system'
import { DropdownContainer, DropdownMenu, DropdownMenuOption } from './dropdown'
import SearchInput from './searchInput'
import Group from './profile/group'
import Spinner from 'respin'

class Search extends Component {
  state = {
    address: '',
    loading: false,
    contests: [],
    error: null
  }

  handleChange = value => {
    this.setState({ address: value })
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
          <PlacesAutocomplete
            value={address}
            onChange={this.handleChange}
          >
            {({ getInputProps, getSuggestionItemProps, suggestions, ...props }) => (
              <Box>
                <SearchInput
                  name="address"
                  id="address"
                  placeholder="1 Infinite Loop, Cupertino, CA"
                  onKeyDown={
                    e => {
                      if (e.which === 13) this.fetchData()
                    } // submit on enter key press
                  }
                  style={{ maxWidth: '100%' }}
                  {...getInputProps(props)}
                />
                <Box>
                  {suggestions.map(suggestion => (
                    <Box
                      key={suggestion.id}
                      active={suggestion.active}
                      children={suggestion.description}
                      {...getSuggestionItemProps(suggestion)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </PlacesAutocomplete>
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
