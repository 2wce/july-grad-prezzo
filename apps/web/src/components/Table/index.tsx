import { Flex, Spinner, useMediaQuery, Text, Heading } from '@chakra-ui/react'
import React, { ReactNode, useMemo } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp
} from 'react-feather'
import {
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import Card from '../Card'
import BottomSection from '../Card/CardFooter'
import EmptyListHandler from '../EmptyListHandler'
import SearchBar from '../SearchBar'
import { StyledTable, TableCell, TableHead, TableIconButton, TableRow } from './styles'

// use declaration merging to extend types, example file:
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
// caveat - these interfaces are global

declare module 'react-table' {
  export interface TableOptions<D extends object>
    extends UsePaginationOptions<D>,
      UseFiltersOptions<D> {}

  export interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D> {}

  export interface TableState<D extends object = {}> extends UsePaginationState<D> {}

  export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {}
}

type TableProps<D extends object = {}> = {
  data: any
  pageSize?: number
  tableHeading: ReactNode
  columns: Column<D>[]
  onRowClick?: (row: Row<D>) => void
  isLoading?: boolean
  tableActions?: () => ReactNode
  onSearch?: (text: string) => void
  onClickNext: () => Promise<any>
}

const Table = <D extends {}>({
  columns,
  data,
  tableHeading,
  pageSize: initialPageSize,
  onRowClick,
  isLoading,
  tableActions,
  onSearch,
  onClickNext
}: TableProps<D>): JSX.Element => {
  const tableColumns = useMemo(() => columns, [columns])

  const [isTabletOrMobile] = useMediaQuery('(max-width: 40em)')

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable<D>(
    {
      columns: tableColumns,
      data: data,
      initialState: { pageIndex: 0, pageSize: initialPageSize }
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <Flex pb={4} width="100%" justifyContent="space-between" alignItems="center">
        <Flex alignItems="inherit">
          <Heading as="h5" fontWeight="bold" mr={4}>
            {tableHeading}
          </Heading>
        </Flex>
        <Flex align="center">
          {isLoading && <Spinner color="brand.300" />}
          {!!onSearch && <SearchBar onSearch={onSearch} />}
          {tableActions && tableActions()}
        </Flex>
      </Flex>
      {data?.length === 0 ? (
        <EmptyListHandler />
      ) : (
        <Card flexDirection="column" flex={1} maxWidth="100%" width="100%">
          <StyledTable {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup: HeaderGroup<D>) => (
                <Flex
                  flex={1}
                  flexDirection="row"
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((column: ColumnInstance<D>) => (
                    <TableCell
                      p={4}
                      {...column.getHeaderProps()}
                      justifyContent="space-between"
                      {...column.getSortByToggleProps()}
                      key={column.id}
                    >
                      <Text fontWeight="bold">{column.render('Header')}</Text>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronUp size={20} />
                        )
                      ) : (
                        ''
                      )}
                    </TableCell>
                  ))}
                </Flex>
              ))}
            </TableHead>
            <Flex flexDirection="column">
              {page.map((row, key) => {
                prepareRow(row)
                return (
                  <TableRow
                    onClick={() => onRowClick && onRowClick(row)}
                    flexDirection="row"
                    {...row.getRowProps()}
                    key={key}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          justifyContent="flex-start"
                          p={4}
                          {...cell.getCellProps()}
                          key={cell.row.index}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </Flex>
          </StyledTable>
          <BottomSection justifyContent="space-between" flexDirection="row">
            <Flex flexDirection="row">
              <TableIconButton
                mr={2}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={() => <ChevronsLeft size={20} />}
              />
              <TableIconButton
                mr={2}
                isDisabled={!canPreviousPage}
                onClick={() => previousPage()}
                icon={() => <ChevronLeft size={20} />}
              />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Text mr={4}>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </Text>
              {!isTabletOrMobile && (
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                  }}
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              )}
            </Flex>
            <Flex flexDirection="row">
              <TableIconButton
                ml={2}
                isDisabled={!canNextPage}
                onClick={async () => {
                  await onClickNext()
                  nextPage()
                }}
                icon={() => <ChevronRight size={20} />}
              />
              <TableIconButton
                ml={2}
                onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
                isDisabled={!canNextPage}
                icon={() => <ChevronsRight size={20} />}
              />
            </Flex>
          </BottomSection>
        </Card>
      )}
    </>
  )
}

export default Table

Table.defaultProps = {
  pageSize: 10
}
