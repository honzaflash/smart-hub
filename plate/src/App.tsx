import { Box, Paper, Typography } from '@mui/material'
import './App.css'
import { trpc } from './trpc'

const App = () => {
  const { data } = trpc.getWeatherReport.useQuery()

  return (
    <Paper>
      <Box>
        <Typography>
          Current temperature: {data?.temperature}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Current humidity: {data?.humidity}
        </Typography>
      </Box>
    </Paper>
  )}

export default App
