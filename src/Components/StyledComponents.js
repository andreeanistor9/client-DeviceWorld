import {styled} from "@mui/system";
import { AppBar, IconButton, Link, Typography } from '@mui/material';

export const StyledIconButton = styled(IconButton)({
    '&:hover, &:focus, &:active':{
        backgroundColor: 'white' ,
              
    }
})

export const Navbar = styled(AppBar)({
    backgroundColor:"#537ec5"
}) 

export const StyledLink = styled(Link)({
    color:'inherit',
    '&:hover, &:focus, &:active':{
        color:'inherit',
        
    }
}) 

export const appName = styled(Typography)({
   
})
