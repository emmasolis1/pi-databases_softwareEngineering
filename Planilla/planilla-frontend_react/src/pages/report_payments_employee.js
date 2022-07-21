import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useEffect } from 'react';

export const EmployeePaymentsHistory = () => {
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        const getPaymentInfo = async () => {
            const response = await fetch('http://localhost:7150/api/paymentsHistory');
            const data = await response.json();
            setPaymentInfo(data);
        };
        getPaymentInfo();
    }, []);
    const table =
    <body>
        Loading...
    </body>
    if (paymentInfo != null) {
        table =
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentInfo.map((pay) => (
                        <TableRow
                            hover
                        >
                            <TableCell>
                                
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>;
    }

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    {table}
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};
export default EmployeePaymentsHistory;
//ReportListResults.propTypes = {
//    reports: PropTypes.array.isRequired
//};
