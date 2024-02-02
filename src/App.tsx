import './App.css'
import { Fragment, useEffect, useState, useMemo } from 'react'
import { JsonForms } from '@jsonforms/react'
import schema from './schema.json'
import uischema from './uischema.json'

import Grid from '@mui/material/Grid'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'

// Importing Zustand Store
import { usePatientStore } from './store/PatientStore'

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
    width: '100%',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
})

const renderers = [...materialRenderers]

const App = () => {
  const classes = useStyles()
  const initialPatientData = usePatientStore((state) => state.patient)
  const allPatients = usePatientStore((state) => state.patients)
  const submitPatientData = usePatientStore((state) => state.addPatientData)
  const [data, setData] = useState<any>(initialPatientData)

  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data])

  useEffect(() => {
    console.log('Zustand All Patients', allPatients)
  }, [allPatients])

  const submitData = () => {
    submitPatientData(data)
  }

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Nitor Tebra</h1>
          <p className='App-intro'>Complete Patient Intake Form</p>
        </header>
      </div>
      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={5}>
          <img
            width='100%'
            height='90%'
            src='https://media.istockphoto.com/id/1052317764/vector/old-man-in-hospital-room-vector-flat-illustration.jpg?s=612x612&w=0&k=20&c=OyYfpYLZVwuFhXFM2RSt5H6cinnbrdZRckEOMOiIWLU='
            alt='logo'
          />
        </Grid>
        <Grid item sm={7}>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        </Grid>
        <Grid
          item
          sm={12}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          <Button variant='contained' onClick={submitData}>
            Submit
          </Button>
        </Grid>

        <Grid
          item
          sm={12}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'centers',
          }}
        >
          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default App
