import React, { useMemo, useState } from 'react'
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { Jumbotron, Col, InputGroup, FormControl, Row, Table, Form, Container, Button } from 'react-bootstrap';
import { COLUMNS } from "./column";
import '../styles/table.css';
import { GlobalFilter } from "./GlobalFilter"
import Mail from './Mail';


// set up a component for the table that will take in and display the employee information
const FilteringTable = (props) => {


    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} /> Select All
                </>
            )
        }
    )
    const columns = useMemo(() => COLUMNS, [])
    const data = props.data;
    const tableInstance = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    // destructure table instance to get the required components
    const {
        getTableProps,
        setPageSize,
        gotoPage,
        state,
        setGlobalFilter,
        getTableBodyProps,
        canNextPage,
        canPreviousPage,
        headerGroups,
        page,
        nextPage,
        previousPage,
        pageOptions,
        pageCount,
        prepareRow,
        selectedFlatRows
    }
        = tableInstance

    const { globalFilter, pageSize, pageIndex, selectedRowIds } = state


    // Sets up the table JSX that will be displayed on the site, including a search filter functionality
    return (
        <>

            <div className="row d-flex table-header">
                <div className="col-md-4"><h5>Employee Lists</h5></div>
                <div className="col-md-4">
                    <Form>
                        <InputGroup className="">
                            <FormControl
                                placeholder="Search User"
                                // onChange={handleUserSerach}
                                // value={userSearch ? userSearch : ''}
                                name="userSearch"
                                id="userSearch"
                            />
                            <InputGroup.Append>
                                <button type="button" className="btn btn-outline-primary">Search</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
                <div className="col-md-4">
                    <Mail />
                </div>
            </div>
            <table {...getTableProps()} className="table table-striped table-hover">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-512.png" alt="desc" height="15px" width="15px" /> : <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png" height="15px" width="15px" alt="asc" />) : ""}
                                        </span>
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                        })
                                    }
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {/* Sets up the pagination feature for the table */}
            <div className="pagination justify-content-between pb-3">
                <div className="page">
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [5, 10, 25].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </select>
                    <span>
                        {' '}Go To Page: {' '}
                        <input type="number" defaultValue={pageIndex + 1} onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                            style={{ width: '50px' }} />
                    </span>

                </div>
                <div className="nextPrevious">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </div>
                <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
                <pre>
                    <code>
                        {/* {JSON.stringify(
                            {
                                selectedRowIds: selectedRowIds,
                                'selectedFlatRows[].original': selectedFlatRows.map(
                                    d => d.original
                                ),
                            },
                            null,
                            2
                        )} */}
                    </code>
                </pre>
            </div>

        </>
    )
}
export default FilteringTable;