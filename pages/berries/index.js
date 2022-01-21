import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Pagination from '@mui/material/Pagination';
import Link from 'next/link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';

const Pokemon = ({data, page})=>{
  console.log(data)
  const id = data.url.split('/').filter(x => x).pop()
  return(
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      p={0.5}
    >
      <Button variant='contained'>
        <Link href={`/berries/${id}`}>{`${data.name}`}</Link>
      </Button> 
    </Grid>   
  )
}


const PokemonesList=({data, count})=>{
  const [page, setPage] = useState(1);
  const itemsPerPage = 12
  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(count);
  const totalPage = Math.round(count/itemsPerPage)
  return(
    <Container>
      <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      p={0.5}
      >
        <Typography variant="h4" component="div" gutterBottom sx={{py:5}}>
          Berries List
        </Typography>
        {data.slice((page-1)*itemsPerPage, page*itemsPerPage)
          .map(el =>{
            return(
              <Pokemon key={el.name} data={el}/>
            )
          })}  
        <Box sx={{ mx: "auto", width:280, pt:2}} >
          <Pagination count={totalPage} page={page} onChange={handleChange}/>
        </Box>
        <Button href='/' startIcon={<ArrowBackIosIcon />} >
            back
        </Button>
      </Grid>
      </Container>
  )
}

export default PokemonesList

export const getStaticProps = async () =>{
  const response = await fetch(`https://pokeapi.co/api/v2/berry`)
  const data = await response.json()
  console.log(data)
  const count = data.count
  const response2 = await fetch(`https://pokeapi.co/api/v2/berry?limit=${count}`)
  const data2 = await response2.json()
  console.log(data2)
  return{
    props: {data: data2.results, count}
  }
}

