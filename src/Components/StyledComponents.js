import { styled } from "@mui/system";
import {
  AppBar,
  IconButton,
  Link,
  Select,
  Button,
  ListItem,
  List,
  Input,
} from "@mui/material";

export const StyledIconButton = styled(IconButton)({
  "&:hover, &:focus, &:active": {
    backgroundColor: "white",
  },
});
export const AddCartButton = styled(Button)({
  backgroundColor: "#537ec5",
  color: "#ffffff",
  "&:hover, &:focus, &:active": {
    backgroundColor: "#315ea8",
  },
});
export const Navbar = styled(AppBar)({
  backgroundColor: "#537ec5",
});

export const StyledLink = styled(Link)({
  color: "inherit",
  "&:hover, &:focus, &:active": {
    color: "inherit",
  },
});

export const StyledSelect = styled(Select)({
  "&:hover, &:focus, &:active": {
    borderColor: "red",
  },
});

export const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledList = styled(List)({
  backgroundColor: "#f0f4fa",

  "&:hover, &:focus, &:active": {
    outline: "#b1cefa groove 2px",
  },
});
export const StyledFormInput = styled(Input)({
  // borderRadius: "5px",
  // border: "1px solid grey",
});
