import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const WallboardItem = ({ title, agentsAvailable, totalAgents, waitingNow, longestWaiting, abandonedToday }) => (
  <Paper style={{ padding: 16, marginBottom: 16 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="caption">PULL REPORT: 5 MIN AGO</Typography>
    <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={2}>
        <Typography variant="h4">{agentsAvailable}</Typography>
        <Typography variant="caption">Agents Available</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h4">{totalAgents}</Typography>
        <Typography variant="caption">Total Agents</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h4">{waitingNow}</Typography>
        <Typography variant="caption">Waiting Now</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h4">{longestWaiting}</Typography>
        <Typography variant="caption">Longest Waiting</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h4">{abandonedToday}</Typography>
        <Typography variant="caption">Abandoned Today</Typography>
      </Grid>
    </Grid>
  </Paper>
);

const Wallboard = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <WallboardItem
        title="QUEUE NAME"
        agentsAvailable={12}
        totalAgents={23}
        waitingNow={3}
        longestWaiting={2}
        abandonedToday={4}
      />
    </Grid>
    <Grid item xs={12}>
      <WallboardItem
        title="QUEUE NAME"
        agentsAvailable={12}
        totalAgents={23}
        waitingNow={3}
        longestWaiting={2}
        abandonedToday={4}
      />
    </Grid>
    <Grid item xs={12}>
      <WallboardItem
        title="QUEUE NAME"
        agentsAvailable={12}
        totalAgents={23}
        waitingNow={3}
        longestWaiting={2}
        abandonedToday={4}
      />
    </Grid>
  </Grid>
);

export default Wallboard;
