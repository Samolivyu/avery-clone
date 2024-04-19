import React from "react"
import { Route } from "react-router-dom";

const Home = () => 
{
  return (
<>
  <title>AEA LIMITED - Weigh Above The Rest</title>
  <meta
    name="description"
    content="AEA Limited is a Pan African company that was incorporated 1970. The company was initially established primarily with a focus on the supply,
    manufacture and maintenance of industrial and domestic weighing equipment.AEA has consistently remained as the largest supplier of weighing solutions
    in East Africa to date. Over the years, the company has continuously diversified its activities and product offering due to the
    strong aftermarket support.AEA has footprints in Kenya, Uganda and Tanzania with an extension to Zambia. We provide key market solutions in Weighing, Power, Industrial,
    Infrastructure, Agriculture, Software, Construction and After Sale Support with an innovative approach into the future."
  />
  <div className="contact-info">
    <div className="info-title">Contact us</div>
    <div className="info-des">34 Factory Street, Nairobi</div>
  </div>
  <div className="contact-part">
    <div className="info-icon">
      <i className="fi fi-rr-envelope-open" />
    </div>
    <div className="contact-info">
      <div className="info-title">Email us</div>
      <div className="info-des">
        <Route path="/src/Home.jsx">mailto:"aea@aealimited.com</Route>
      </div>
    </div>
  </div>
  <div className="contact-part margin-no">
    <div className="info-icon">
      <i className="fi fi-rr-phone-call" />
    </div>
    <div className="contact-info">
      <div className="info-title">Call Us</div>
      <div className="info-des">
        <Route path="tel:(+0885)-23456789"> +254 724 259815</Route>
      </div>
    </div>
  </div>
  <div className="offcanvas-text">
    <p>
      AEA provides key market solutions in Weighing, Power, Industrial,
      Infrastructure, Agriculture, Software, Construction and After Sale Support
      with an innovative approach into the future.
    </p>
  </div>
  <ul className="nav-menu">
    <li className="menu-item-has-children current-menu-item">
      <Route path="/src/Home.jsx">Home</Route>
    </li>
    <br />
    <li className="menu-item-has-children">
      <Route path="/public/About.jsx">About</Route>
    </li>
    <br />
    <li className="menu-item-has-children">
      <Route path="/public/Services.jsx">Services</Route>
    </li>
    <br />
    <li className="menu-item-has-children">
      <Route path="/public/Projects.jsx">Projects</Route>
    </li>
    <br />
    <li className="menu-item-has-children">
      <Route path="/public/Blog.jsx">Blog</Route>
    </li>
    <br />
    <li className="menu-item-has-children">
      <Route path="/public/Career.jsx">Careers</Route>
    </li>
    <br />
    <li>
      <Route path="/public/Contact.jsx">Contact</Route>
    </li>
  </ul>
  <div className="rs-banner banner-main-home">
    <div className="container">
      <div className="content-wrap">
        <h1>Professional</h1>
        <h2>Engineering Services</h2>
        <p>
          AEA provides key market solutions in Weighing, Power, <br />
          Industrial, Infrastructure, Agriculture, Software, Construction and{" "}
          <br />
          After Sale Support with an innovative approach into the future.
        </p>
      </div>
    </div>
  </div>
  <span className="sub-text">About company</span>
  <h2 className="title pb-35">For Africa by Africans</h2>
  <div className="desc pb-25">
    AEA Limited is a Pan African company that was incorporated 1970. The company
    was initially established primarily with a focus on the supply, manufacture
    and maintenance of industrial and domestic weighing equipment.
    <br />
    <br />
    AEA has consistently remained as the largest supplier of weighing solutions
    in East Africa to date. Over the years, the company has continuously
    diversified its activities and product offering due to the strong
    aftermarket support.
    <br />
    <br />
    AEA has footprints in Kenya, Uganda and Tanzania with an extension to
    Zambia. We provide key market solutions in Weighing, Power, Industrial,
    Infrastructure, Agriculture, Software, Construction and After Sale Support
    with an innovative approach into the future.
    <br />
  </div>
</>
  );
};

export default Home