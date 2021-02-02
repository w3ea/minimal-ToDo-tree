module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    purge: [
        './src/**/*.jsx'
    ],
    prefix: '',
    important: false,
    separator: ':',
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: '1.5rem' }
        },
        spacing: {
            0: '0',
            '.25': '0.0625rem',
            '.5': '0.125rem',
            '.75': '0.1875rem',
            1: '0.25rem',
            1.25: '0.3125rem',
            1.5: '0.375rem',
            1.75: '0.4375rem',
            2: '0.5rem',
            2.25: '0.5625rem',
            2.5: '0.625rem',
            3: '0.75rem',
            3.25: '0.8125rem',
            3.5: '0.875rem',
            3.75: '0.9375rem',
            4: '1rem',
            4.25: '1.0625rem',
            4.5: '1.125rem',
            4.75: '1.1875rem',
            5: '1.25rem',
            5.5: '1.375rem',
            6: '1.5rem',
            6.5: '1.625rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            13: '3.25rem',
            14: '3.5rem',
            16: '4rem',
            17: '4.25rem',
            18: '4.5rem',
            20: '5rem',
            24: '6rem',
            28: '7rem',
            32: '8rem',
            36: '9rem',
            40: '10rem',
            44: '11rem',
            48: '12rem',
            52: '13rem',
            56: '14rem',
            60: '15rem',
            64: '16rem',
            68: '17rem',
            72: '18rem',
            84: '21rem',
            '3/4': '75%'
        },
        fontSize: {
            2: '0.5rem',
            3: '0.75rem',
            3.5: '0.875rem',
            3.25: '0.8125rem',
            3.75: '0.9375rem',
            4: '1rem',
            4.25: '1.0625rem',
            4.5: '1.125rem',
            4.75: '1.1875rem',
            5: '1.25rem',
            5.5: '1.375rem',
            5.75: '1.4375rem',
            6: '1.5rem',
            7: '1.75rem',
            7.5: '1.875rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            13: '3.25rem',
            14: '3.5rem',
            16: '4rem',
            17: '4.25rem',
            18: '4.5rem',
            32: '8rem'
        },
        extend: {
            colors: {
                teal: {
                    600: '#319795',
                    700: '#2c7a7b'
                }
            },
            zIndex: { '-10': '-10' }
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'even'],
        margin: ['responsive', 'first']
    },
    corePlugins: {},
    plugins: []
};