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
        <Image src={data.sprites.front_default} width={500} height={500}/>
    )
}



const Pokemon = ({data,id})=>{
    const router = useRouter()
    if (router.isFallback){
        return(
            <h1>Cargando...</h1>
        )
    }
    
    const Types = (data)=>{
        console.log(data.types);
        if(data.types.length===1){
            // print(data.types)
            console.log(data.types[0].type.name)
            return(data.types[0].type.name)
        }else{
            return(
                <ul>
                    {data.types.map(el => <li key={el.type.name}><Typography variant='h8'>{el.type.name}</Typography></li>)}
                </ul>
            )
        }
    }
    return(
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            p={0.5}
            sx={{mt:'5%'}}
        >
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        p={0.5}            
                        sx={{width:800}}      
                    >
                        <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        p={0.5}                        
                    >
                        <ImageCard data={data}></ImageCard>
                        <Grid
                            container
                            direction="column"
                            p={0.5}               
                            sx={{width:300}}         
                        >
                            <Typography variant="h5" component="column" sx={{mt:12}}>
                                Number: <Typography variant='h8'>#{id}</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Height: <Typography variant='h8'>{data.height} ft</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Weight: <Typography variant='h8'>{data.weight} lb</Typography>
                            </Typography>
                            <Typography variant="h5" component="column">
                                Type: {Types(data)}     
                            </Typography>
                            <Typography variant="h5" component="column">
                                Abilities:
                                <ul>
                                    {data.abilities.map(el => <li key={el.ability.name}><Typography variant='h8'>{el.ability.name}</Typography></li>)}
                                </ul>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        p={0.5}            
                        sx={{width:800}}      
                    >
                        <Button href='/pokemones'>
                            Volver
                        </Button>
                    </Grid>
                    
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Pokemon

export const getStaticProps = async({params})=>{
    console.log(params.id);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    
    const data = await response.json()
    // const response2 = await fetch(data.species.url)
    // const species =  await response2.json()
    // console.log('aaaaaaaaaaaaaaaaaaaaa',data);
    return {
        props: {data, id: params.id}
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