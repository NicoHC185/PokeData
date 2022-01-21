import Link from 'next/link'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { Avatar, Container } from '@mui/material'

// import Box from '@mui/material/Box'

import styled from 'styled-components'

// const DivCenter = styled.div`
//   text-align: center;
//   align-items: center;
//   margin-top:20%;
// `

export default function Menu({pokemones}) {
  return (
    <Container fixed maxWidth='s'>
      <div>
        <head>
          <title>PokeData test</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        </head>
      </div>
      <Box sx={{ width: '100%', maxWidth: 750, mt:15, mx:'auto'}}>
        <Image src={'/Icons/Logo.png'} width={750} height={300}/>
      </Box>
      
      {/* <ul>
        {pokemones.map(pokemon => 
            <Pokemon pokemon = {pokemon} key={pokemon.name}/>
          )}
      </ul> */}
      <Box sx={{ m: 10 }}>
        <Stack direction="row" spacing={3} alignItems='center' justifyContent="center">
          <Chip label="Items" avatar={<Avatar alt='items' src="/Icons/backpack.png" />} clickable/>
          <Chip color="default" label="Berries" avatar={<Avatar alt='berries' src="/Icons/berries.png" />} clickable/>
          <Chip label="Machines" avatar={<Avatar alt='machine' src="/Icons/machine.png" />} clickable/>
          <Chip label="Maps" avatar={<Avatar alt='map' src="/Icons/map.png" />} clickable/>
          <Chip label="Pokemon list" component="a" href="/pokemones" clickable avatar={<Avatar alt='poke' src="/Icons/poke.png" />} />
        </Stack>
      </Box>
    </Container>
  )
}

