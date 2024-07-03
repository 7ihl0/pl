import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, CssBaseline, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#ff5722',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const generateCode = async () => {
    const response = await fetch('http://localhost:5000/generate-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setResult(data.choices[0].text);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <CodeIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI Code Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            AI Code Generator
          </Typography>
          <TextField
            label="Enter your requirements"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            margin="normal"
          />
          <Box my={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={generateCode}>
              Generate Code
            </Button>
          </Box>
          {result && (
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="body1" component="pre">
                  {result}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
