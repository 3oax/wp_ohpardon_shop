const plugin = require('tailwindcss/plugin');
const configTheme = require('../../config-theme.json');

const themeSpecificColors = configTheme.colors;

module.exports = {
  // important: '',
  darkMode: false,
  theme: {
    screens: {
      'sm': '754px',
      'md': '992px',
      'lg': '1200px',
    },
    
    colors: {...{
      'transparent' : 'transparent',
      
      'white'       : '#FFFFFF',
      'black'       : '#000000',

      'lighten'     : 'rgba(255,255,255,0.6)',
      'darken'      : 'rgba(0,0,0,0.6)',

      'success'     : '#1dc617',
      'warning'     : '#fca207',
      'danger'      : '#e53232',

    }, ...themeSpecificColors},

    spacing: {
      '0': '0',
      '025': '0.25rem',
      '05': '0.5rem',
      '075': '0.75rem',
      '1': '1rem',
      '15': '1.5rem',
      '2': '2rem',
      '3': '3rem',   
      '4': '4rem',    
      '5': '5rem', 
      '75' : '7.5rem',
      '10' : '10rem',
      'lg' : '15rem',
      'xl' : '20rem',      
    },

    fontFamily: {
      sans: [
        'Roboto Mono',
        'Helvetica Neue',
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: [
        'Raisonne Pro',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif',
      ]
    },

    minHeight: {
      '1': '1px',
      'screen': '100vh'
    },

    fontSize: {
      xs        : '0.75rem',
      sm        : '0.875rem',
      base      : '1rem',
      lead      : '1.25rem',
      'lead-lg' : '1.4rem',
      'h6'      : '1.85rem',
      'h5'      : '2rem',
      'h4'      : '2.25rem',
      'h3'      : '2.5rem',
      'h2'      : '3rem',
      'h1'      : '4.3rem',
    },

    opacity: {
      '0': '0',
      '50': '.5',
      '100': '1',
    },

    width: theme => ({
      auto: 'auto',
      '05': '0.5rem',
      '1': '1rem',
      '15': '1.5rem',
      '2': '2rem',
      '3': '3rem',
      '4': '4rem',
      '5': '5rem',
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      'full': '100%',
      'screen': '100vw'
    }),

    height: theme => ({
      auto: 'auto',
      '05': '0.5rem',
      '1': '1rem',
      '15': '1.5rem',
      '2': '2rem',
      '3': '3rem',
      '4': '4rem',
      '5': '5rem',
      '1/2': '50%',
      'full': '100%',
      'screen': '100vh'
    }),

    inset: {
      '0' : 0
    },

    cursor: {
      'auto': 'auto',
      'default': 'default',
      'pointer': 'pointer'
    },

    maxWidth: {
      'min': 'min-content',
      'max': 'max-content',
      'full': '100%' 
    },

    zIndex: {
      'auto': 'auto',
      '0': 0,
      'bg': 1,
      'content': 10,
      'content-1': 15,
      'nav': 9000,
      'overlay': 9999,
    },
  },
  variants: {
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: [],
    backgroundColor: ['responsive'],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderColor: [],
    borderRadius: [],
    borderStyle: [],
    borderWidth: [],
    boxShadow: [],
    cursor: [],
    display: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: [],
    fontSize: ['responsive'],
    fontSmoothing: [],
    fontStyle: [],
    fontWeight: [],
    height: ['responsive'],
    inset: [],
    isolation: [],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: [],
    listStyleType: [],
    margin: ['responsive'],
    maxHeight: [],
    maxWidth: [],
    minHeight: ['responsive'],
    minWidth: [],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive'],
    order: ['responsive'],
    outline: [],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: [],
    position: ['responsive'],
    resize: ['responsive'],
    stroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover'],
    textDecoration: ['responsive'],
    textTransform: [],
    userSelect: [],
    verticalAlign: [],
    visibility: ['responsive'],
    whitespace: [],
    width: ['responsive'],
    wordBreak: [],
    zIndex: [],
  },
  corePlugins: {
    animation: false,
    appearance: false,
    
    boxSizing: false,
    boxDecorationBreak: false,

    // Background
    backgroundBlendMode: false,
    backgroundAttachment: false,
    backgroundClip: false,
    backgroundOrigin: false,
    backgroundRepeat: false,    
    backgroundPosition: false,
    backgroundOpacity: false,
    backgroundImage: false,
    
    // Border
    borderCollapse: false,
    borderColor: false,
    borderRadius: false,
    borderOpacity: false,
    borderWidth: false,
    borderStyle: false,
    boxShadow: false,

    // Devide
    divideWidth: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,

    // Backdrop
    backdropBlur: false,
    backdropFilter: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,

    container: false,
    fontSmoothing: false,
    gradientColorStops: false,

    // Filter
    filter: false,
    blur: false,
    brightness: false,
    contrast: false,
    dropShadow: false,
    grayscale: false,
    hueRotate: false,
    invert: false,
    saturate: false,
    sepia: false,

    // Grid
    gridAutoFlow: false,
    gridRow: false,
    gridRowEnd: false,
    gridRowStart: false,
    gridAutoRows: false,
    gridTemplateRows: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
    gridAutoColumns: false,
    gridTemplateColumns: false,
    gap: false,
    placeItems: false,
    placeContent: false,
    placeSelf: false,
    
    mixBlendMode: false,

    overscrollBehavior: false,

    space: false,

    outline: false,
    maxHeight: false,
    tableLayout: false,
    textOpacity: false,
    
    // Transition
    transitionDelay: false,
    transitionTimingFunction: false,
    transitionProperty: false,
    transitionDuration: false,
    
    // Translate
    translate: false,
    transform: false,
    transformOrigin: false,
    rotate: false,
    scale: false,
    skew: false,

    userSelect: false,
    fontVariantNumeric: false,
    resize: false,

    placeholderColor: false,
    placeholderOpacity: false,

    // Ring
    ringWidth: false,
    ringColor: false,
    ringOpacity: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.ratio-square': { paddingBottom: '100%' },
        '.ratio-16-9': { paddingBottom: '56.25%' },
        '.ratio-rect': { paddingBottom: '50%' },      
        '.ratio-rect-tall': { paddingBottom: '150%' },
        '.ratio-rect-lg': { paddingBottom: '66.6667%' },
        '.ratio-rect-xl': { paddingBottom: '75%' },
        '.ratio-rect-xxl': { paddingBottom: '85%' },
      };
  
      addUtilities(newUtilities, ['responsive'])
    }) 
  ],
}