import './globals.css'
import { CartProvider } from '../components/CartProvider'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import Toast from '../components/Toast'
import ScrollReveal from '../components/ScrollReveal'
import BackToTop from '../components/BackToTop'

export const metadata = {
  title: 'DLD Dynamics — Premium Supplements Crafted for Real Life',
  description: 'Science-backed supplements formulated for the everyday high performer. Shop Magnesium Glycinate, Creatine, Beauty blends, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Schibsted+Grotesk:ital,wght@0,400;0,700;0,900;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <ScrollReveal />
          <div className="announcement-bar">
            Free shipping on orders over $50 &nbsp;·&nbsp; Use code <strong>DLD10</strong> for 10% off your first order
          </div>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  )
}
