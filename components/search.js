import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import styled from 'styled-components'
import theme from '../theme/config'
import { trim, isEmpty, map, keys, debounce } from 'lodash'
import axios from 'axios'
import { DropdownContainer, DropdownMenu, DropdownMenuOption } from './dropdown'
import SearchInput from './searchInput'
import { Box, Button, Flex, Label, Text } from '@hackclub/design-system'
import Icon from '@hackclub/icons'
import Spinner from 'respin'
import Location from './location'
import Group from './profile/group'

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
    pollingLocations: [],
    contests: [],
    error: null
  }

  handleChange = value => {
    this.setState({ address: value }, () => {
      this.debounceFetchData()
    })
  }

  debounceFetchData = debounce(this.fetchData, 250)

  fetchData() {
    const { address } = this.state
    console.log('Address', address)
    this.setState({ loading: true })
    const payload = { address }
    const query = keys(payload)
      .map(key => map([key, payload[key]], encodeURIComponent).join('='))
      .join('&')
    const url = `/locate?${query}`
    axios
      .get(url)
      .then(res => res.data)
      .then(data => {
        const { pollingLocations, contests } = data
        this.setState({ loading: false, pollingLocations, contests })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loading: false, error: 'error' })
      })
  }

  render() {
    const { loading, address, pollingLocations, contests, error } = this.state
    return (
      <Box my={3}>
        <Label htmlFor="address" mb={2} fontSize={2} color="muted" caps>
          Enter your home (U.S.) address
        </Label>
        <Searcher align="flex-end" width={1}>
          <PlacesAutocomplete value={address} onChange={this.handleChange}>
            {({
              getInputProps,
              getSuggestionItemProps,
              suggestions,
              ...props
            }) => (
              <Box>
                <SearchInput
                  name="address"
                  id="address"
                  placeholder="1 Infinite Loop, Cupertino, CA"
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
          <SearchButton
            loading={loading}
            onClick={e => !isEmpty(trim(address)) && this.fetchData()}
          />
        </Searcher>
        {error && (
          <Text
            color="error"
            bold
            fontSize={3}
            py={3}
            width={1}
            center
            children={error}
          />
        )}
        {pollingLocations
          ? pollingLocations.map(location => (
              <Location
                address={location}
                key={`polling-${location.locationName}`}
              />
            ))
          : null}
        {contests.map(group => (
          <Group
            profiles={group.candidates}
            label={group.office}
            key={`group-${group.district.id}-${group.office || group.referendumTitle}`}
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
