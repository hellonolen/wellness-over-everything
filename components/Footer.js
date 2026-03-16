import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">DLD<br/>DYNAMICS</div>
          <p className="footer-brand-sub">Premium supplements crafted for real life.</p>
          <p style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:'12px',color:'var(--pink)',marginTop:'16px',letterSpacing:'0.06em'}}>
            © 2026 DLD Dynamics
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Shop</p>
          <ul>
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/shop#wellness">Wellness</Link></li>
            <li><Link href="/shop#performance">Performance</Link></li>
            <li><Link href="/shop#beauty">Beauty</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Company</p>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="#">Wholesale</Link></li>
            <li><Link href="#">Affiliates</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Support</p>
          <ul>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Returns</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-mega-logo" aria-hidden="true">DLD DYNAMICS</div>
      <div className="footer-bottom">
        <span>© 2026 DLD Dynamics. All rights reserved.</span>
        <span>Made for real life.</span>
      </div>
    </footer>
  )
}
