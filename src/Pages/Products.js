import React, {useState, useEffect} from "react"
import {Grid, Typography} from "@mui/material"
function Products() {
    const [backendData, setBackendData] = useState([{}])
    useEffect(()=>{
      fetch("/products").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])
  
    return (
      <Grid container sx={{m:2}}>

      <Grid item xs={1}></Grid>
      <Grid item xs={10} >
        <Typography variant="h6">Products</Typography>
        {/* {(typeof backendData.products === 'undefined')?(
          <p>Loading...</p>
        ):(
          backendData.products.map((product, i)=>(
            <p key={i}>{product}</p>
          ))
        )} */}

  {(typeof backendData.products === 'undefined')?(
          <p>Loading...</p>
        ):(
          backendData.products.map((product, i)=>(
            <p key={i}>{product}</p>
          ))
        )}  
         </Grid>
      </Grid>
     
    );
  }
  
  export default Products;