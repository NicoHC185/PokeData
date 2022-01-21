import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

import ButtonRef from '../../Components/ButtonRef';

const Mapa = ({data,pokemon_encounters})=>{
    const router = useRouter()
    if (router.isFallback){
        return(
            <h1>Cargando...</h1>
        )
    }
    
    return(
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{mt:'5%'}}
        >
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"  
                    >
                        <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"               
                    >
                        {/* <ImageCard data={data}></ImageCard> */}
                        <Grid
                            container
                            direction="column"
                            sx={{width:500, mt:0}}
                        >
                            <Typography variant="h5" component="column" sx={{mt:'2.5%'}}>
                                Region: <Typography variant='h8'>{data.region.name}</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Generation: <Typography variant='h8'>{data.game_indices[0].generation.name.split('-')[1]}</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Pokemon encounters:
                                {pokemon_encounters.map(el => <ButtonRef folder={'pokemones'} data={el.pokemon} key={el.pokemon.name}/>)}
                            </Typography>
                            
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        p={0.5}            
                    >
                        <Button href='/maps'>
                            Back
                        </Button>
                    </Grid>
                    
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Mapa

export const getStaticProps = async({params})=>{
    const response = await fetch(`https://pokeapi.co/api/v2/location/${params.id}`)
    const data = await response.json()
    const response2 = await fetch(`${data.areas[0].url}`)
    const data2 =  await response2.json()
    return {
        props: {data, pokemon_encounters: data2.pokemon_encounters}
    }
}

export const getStaticPaths = async()=>{
    const paths = [
        {params: {id:'1'}}
    ]
    return{
        paths,
        fallback: 'blocking'
    }
}
