import localFont from 'next/font/local'

export const sfProDisplay = localFont({
  src: [
    {
      path: '../fonts/SF-Pro-Display-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-sf-pro-display'
})