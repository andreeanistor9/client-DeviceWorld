import React, {useState,useEffect} from 'react'
import FormGroup from '@mui/material/FormGroup';
import {Stack, List, ListItem, Typography, Checkbox, FormControlLabel,Slider} from '@mui/material'
import { useTranslation } from "react-i18next";
function Filters() {
    const { t } = useTranslation();
    const [, setProducts] = useState([{}]);
    const [price, setPrice]= useState(0)
  const [checked, setChecked]= useState(false)
    const getProducts = async () => {
        try {
        const response = await fetch("/products");
        const jsonData = await response.json();

        setProducts(jsonData);
        } catch (err) {
        console.error(err.message);
        }
    };
  useEffect(() => {
    getProducts();
  }, []);

  const handleChangePrice = async (event) => {
    setChecked(event.target.checked)
    const response = await fetch("/products");
    const jsonData = await response.json();
    if (price === 0) {
      setProducts(jsonData);
      return;
    }
    const filterByPrice = jsonData.filter((item) => {
      if (item.price >= price) {
        return item;
      }
    });
    setProducts(filterByPrice);
    
  };

  return (
   
        <List>
            <ListItem>
            <Stack direction="column">
                <Typography>{t('price')}</Typography>
                <Stack direction="row" sx={{m:1}}>
            <Slider
            sx={{width:"300px"}}
              aria-label={t("price")}
              defaultValue={price}
              valueLabelDisplay="auto"
              step={100}
              min={0}
              max={10000}
              onChange={(e) => setPrice(e.target.value)}
            ></Slider>
            <Checkbox checked={checked} onChange={handleChangePrice} inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
                {/* <FormGroup>
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
                </FormGroup> */}
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