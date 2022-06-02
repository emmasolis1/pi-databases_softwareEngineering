import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BenefitListResults } from '../components/benefit/benefit-list-results';
import { BenefitListToolbar } from '../components/benefit/benefit-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { benefits } from '../__mocks__/benefits';

const Benefits = () => (
    <>
        <Head>
            <title>
                Benefits | Material Kit
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <BenefitListToolbar />
                <Box sx={{ mt: 3 }}>
                    
                </Box>
            </Container>
        </Box>
    </>
);

Benefits.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Benefits;
