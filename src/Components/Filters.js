import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import {Stack, List, ListItem, Typography, Checkbox, FormControlLabel} from '@mui/material'
import { useTranslation } from "react-i18next";
function Filters() {
    const { t } = useTranslation();
  return (
   
        <List>
            <ListItem>
            <Stack direction="column">
                <Typography>{t('price')}</Typography>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="1000-2000"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="2000-3000" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="3000-4000"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="4000-5000"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="5000-6000"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="7000-8000" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="8000-9000"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="9000+" />
                </FormGroup>
                </Stack>
            </ListItem>
            <ListItem>
            <Stack direction="column">
                <Typography>{t('brand')}</Typography>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="apple"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="huawei" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="samsung"/>
                </FormGroup>   
                </Stack>
            </ListItem>
            <ListItem>
            <Stack direction="column">
                <Typography>{t('color')}</Typography>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="deep purple"/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="gold" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  />}label="space black"/>
                </FormGroup>   
                </Stack>
            </ListItem>
        </List>
    
  )
}

export default Filters