import { Grid, Button } from "@mui/material"
import Link from 'next/link'

const ButtonRef = ({data, folder})=>{
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
          <Link href={`/${folder}/${id}`}>{`${data.name}`}</Link>
        </Button> 
      </Grid>   
    )
  }
export default ButtonRef  