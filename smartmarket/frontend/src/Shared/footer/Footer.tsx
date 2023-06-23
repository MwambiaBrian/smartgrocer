
import './Footer.css'
function Footer() {
  return (
   <>
   <footer className="text-center text-white mt-4 footer" >
  
  {/* <!--Call to action--> */}
    <div className="pt-4 pb-2">
      <a className="btn btn-outline-white footer-cta mx-2" href="https://mdbootstrap.com/docs/jquery/getting-started/download/" target="_blank" role="button">Partner with Smartmarket
        <i className="fas fa-download ms-2"></i>
      </a>
      <a className="btn btn-outline-white footer-cta mx-2" href="https://mdbootstrap.com/education/bootstrap/" target="_blank" role="button">Sell on Smartmarket
        <i className="fas fa-graduation-cap ms-2"></i>
      </a>
    </div>
    {/* <!--/.Call to action--> */}
  
  <hr className="text-dark" />
  
  <div className="container">
    {/* <!-- Section: Social media --> */}
    <section className="mb-3">
      
      {/* <!-- Facebook --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-facebook-f"></i></a>

      {/* <!-- Twitter --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-twitter"></i></a>

      {/* <!-- Google --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-google"></i></a>

      {/* <!-- Instagram --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-instagram"></i></a>

      {/* <!-- YouTube --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-youtube"></i></a>
      {/* <!-- Github --> */}
      <a
        className="btn-link btn-floating btn-lg text-white"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fab fa-github"></i></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="text-center p-3 c_right" >
    © 2023 Copyright:
    <a className="text-white" href="">DigitalMarket.com</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
   </>
  )
}

export default Footer