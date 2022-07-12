import { Input, InputGroup, InputProps, InputRightElement, Spinner } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'

type SearchBarProps = InputProps & {
  onSearch: (text: string) => void
  isLoading?: boolean
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, isLoading, ...rest }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>()

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, onSearch])

  return (
    <InputGroup>
      <Input
        {...rest}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
      <InputRightElement>{isLoading && <Spinner />}</InputRightElement>
    </InputGroup>
  )
}

export default SearchBar

SearchBar.defaultProps = {
  width: '220px',
  type: 'text',
  placeholder: 'Search...'
}
