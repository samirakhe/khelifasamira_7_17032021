import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#f5d3c6',
      darker: '#053e85',
    },
    secondary:{
      main:'#1f1f1f',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
 
  },
});

export default theme;