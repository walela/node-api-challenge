import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Box,
  Button,
  Text,
  Input,
  Stack,
  Flex
} from '@chakra-ui/core'

import { customTheme } from './theme'

const App = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/projects/')
      .then(res => {
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <React.Fragment>
      <Heading ml='45vw' mt='2vh'>
        API Client
      </Heading>
      {projects && (
        <Flex ml='10vw' w='80vw' align='center'>
          {projects.map(({ name, id }) => (
            <Box w='30vw' borderWidth='2px' rounded='sm' key={id}>
              <Text>{name}</Text>
            </Box>
          ))}
        </Flex>
      )}
    </React.Fragment>
  )
}

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
