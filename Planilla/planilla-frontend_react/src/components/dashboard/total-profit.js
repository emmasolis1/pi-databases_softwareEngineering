import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TotalProfit = ({ totalProjectsCost, ...props }) => {
  function getTotalCost() {
    let total_sum = 0.0;
    totalProjectsCost.forEach(element => {
      total_sum += parseFloat(element.totalCost);
    });
    return total_sum;
  }

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              TOTAL COST FOR ALL YOUR PROJECTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              $ {getTotalCost()}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
