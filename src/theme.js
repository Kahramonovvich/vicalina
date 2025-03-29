import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                rail: {
                    backgroundColor: '#E6E6E6',
                    height: 6,
                },
                track: {
                    backgroundColor: '#000066',
                    height: 6,
                    border: 'none',
                },
                thumb: {
                    height: 18,
                    width: 18,
                    border: '2px solid #000066',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    '&::before': {
                        display: 'none',
                    },
                    '&::after': {
                        display: 'none',
                    },
                },
                valueLabel: {
                    display: 'none',
                },
            },
        },
    },
});

export default theme;