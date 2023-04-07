import React from "react";
import { Typography, Grid, Stack } from "@mui/material";
const Footer = () => {
    return(
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Stack direction="row" spacing={2} sx={{display:'flex', justifyContent:"center"}}>
                    <Typography variant="h6">Customer Support </Typography>
                    <Typography variant="h6">Customer Support </Typography>
                    <Typography variant="h6">Customer Support </Typography>
                    <Typography variant="h6">Customer Support </Typography>

                </Stack>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}

export default Footer;