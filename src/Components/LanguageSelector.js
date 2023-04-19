import React, { useState } from "react";
import i18n from "../i18n";
import MenuItem from "@mui/material/MenuItem";
import { StyledSelect } from "./StyledComponents";
import { Typography } from "@mui/material";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const chooseLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };
  return (
    <StyledSelect
      size="small"
      autoWidth
      value={selectedLanguage}
      onChange={chooseLanguage}
      sx={{ mt: 1 }}
    >
      <MenuItem value={"en"}>
        <Typography>en</Typography>
      </MenuItem>
      <MenuItem value={"ro"}>
        <Typography>ro</Typography>
      </MenuItem>
    </StyledSelect>
  );
};
export default LanguageSelector;
