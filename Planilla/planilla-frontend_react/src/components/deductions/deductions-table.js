import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React, { useState, useEffect } from 'react';

export function VoluntaryDeductionsTable() {
    const [deductions, setDeductions] = useState(null);
    useEffect(() => {
        const getDeductions = async () => {
            const response = await fetch('https://localhost:7150/api/deductions');
            const data = await response.json();
            setDeductions(data);
        };
        getDeductions();
    }, []);
    if (deductions) {
        return (
            <Card>
                <CardHeader title="Deducciones" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Proyecto
                                </TableCell>
                                <TableCell>
                                    Descripcion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deductions.map((deduction) => (
                                <TableRow>
                                    <TableCell>
                                        {deduction.VoluntaryDeductionName}
                                    </TableCell>
                                    <TableCell>
                                        {deduction.ProjectName}
                                    </TableCell>
                                    <TableCell>
                                        {deduction.Description}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
            </Card>
        );
    }
    return (
        <Card>
            <CardHeader title="Deducciones" />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nombre
                            </TableCell>
                            <TableCell>
                                Proyecto
                            </TableCell>
                            <TableCell>
                                Descripcion
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
            }}
        >
            <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="small" />}
                size="small"
                variant="text"
            >
                View all
            </Button>
        </Box>
        </Card>
    );
}

