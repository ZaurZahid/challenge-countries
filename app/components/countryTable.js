import React, { useEffect } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'

const countryTable = ({ countries }) => {

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    useEffect(() => {
        setPage(0)
    }, [countries])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '16%' }}>
                                Name
                            </TableCell>
                            <TableCell style={{ width: '16%' }} align="right">
                                Capital
                            </TableCell>
                            <TableCell style={{ width: '16%' }} align="right">
                                Region
                            </TableCell>
                            <TableCell style={{ width: '16%' }} align="right">
                                Population
                            </TableCell>
                            <TableCell style={{ width: '20%' }} align="right">
                                Languages
                            </TableCell>
                            <TableCell style={{ width: '16%' }} align="right">
                                Timezones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((country, index) => (
                                <TableRow key={country.name}>
                                    <TableCell>
                                        {country.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {country.capital}
                                    </TableCell>
                                    <TableCell align="right">
                                        {country.region}
                                    </TableCell>
                                    <TableCell align="right">
                                        {country.population}
                                    </TableCell>
                                    <TableCell align="right">
                                        {country.languages.join(', ')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {country.timezones.join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={countries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}

export default countryTable