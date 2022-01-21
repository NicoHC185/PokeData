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



const ImageCard = ({data})=>{
    return(    
        <Image src={data.sprites.default} width={200} height={200}/>
    )
}



const Berries = ({data,id})=>{
    const router = useRouter()
    console.log(data)
    if (router.isFallback){
        return(
            <h1>Cargando...</h1>
        )
    }
    return(
        <Grid
            sx={{width:600, mx:'auto', mt:'5%'}}  
        >
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        p={0.5}            
                        // sx={{width:400}}      
                    >
                        <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                    >
                        <Grid 
                            xs={6}
                            item
                            container
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <ImageCard data={data}></ImageCard>
                        </Grid>
                        
                        <Grid
                            container
                            direction="column"
                            // p={0.5}            
                            item   
                            xs={6} 
                        >
                            <Typography variant="h5" component="column" sx={{mt:'5%'}}>
                                Category: <Typography variant='h8'>{data.category.name}</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Effects: <Typography variant='h8'>{data.effect_entries[0].effect}</Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        pt={3}              
                    >
                        <Button href='/berries'>
                            Volver
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Berries

export const getStaticProps = async({params})=>{
    const response = await fetch(`https://pokeapi.co/api/v2/berry/${params.id}`)
    const data = await response.json()
    const res = await fetch(`${data.item.url}`)
    const data2 = await res.json()
    return {
        props: {data: data2, id: params.id}
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

// export const getStaticPaths