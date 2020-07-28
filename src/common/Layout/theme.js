import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

function pxToRem(value) {
  return `${value / 16}rem`;
}


const breakpoints = createBreakpoints({});
const main =
  // responsiveFontSizes(
  createMuiTheme({

    typography: {
      fontFamily: [
        '"Open Snas"',
        'sans-serif'
      ].join(',')
    },
    palette: {
      background: {
        default: '#0000'
      },
      secondary: {
        main: '#4B6171',
        contrastText: '#fff'
      },

      // primary: '#4D4D4D',
      // secondary: '#4D4D4D'
    },

    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Snas'],
        },
      },
      // MuiCssBaseline: {
      //   '@global': {
      //     '@font-face': [raleway],
      //   },
      // },
      MuiInputBase: { root: { backgroundColor: '#fff' } },
      MuiOutlinedInput: { root: { borderRadius: 8 } },
      MuiButton: {
        label: {
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(16)
          }
        }
      },
      MuiTypography: {
        body2: {
          // fontSize: pxToRem(24),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(20)
          }
        },
        h6: {
          // fontSize: pxToRem(24),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(24)
          }
        },
        h5: {
          // fontSize: pxToRem(24),
          [breakpoints.up('sm')]: {
            fontSize: pxToRem(26)
          }
        },
        caption: {
          fontSize: pxToRem(10),
          [breakpoints.up('sm')]: {
            color: 'grey',
            fontSize: pxToRem(14)
          }
        }
      }
    },

  });
// );

const login = {
  ...main,
  ...createMuiTheme({
    typography: {
      fontFamily: [
        'Open Snas',
        'sans-serif',
      ].join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Snas'],
        },
      },
    },
    palette: {
      background: {
        default: '#9FC9D9'
      }
    }
  })
};

const dashboard = {
  ...main,
  ...createMuiTheme({
    typography: {
      fontFamily: [
        'Open Snas',
        'sans-serif',
      ].join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Snas'],
        },
      }
    },
    palette: {
      background: {
        default: '#F8F8F8'
      }
    }
  })
};

export default {
  main,
  login,
  dashboard
};
