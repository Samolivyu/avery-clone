import React from "react";

function Career() {
  return (
    <div>
      <div id="fb-root" /> 
      <nav className="navbar navbar-default navbar-fixed-top naviget" role="navigation">
        <div className="greybar">
          <div className="container">
            <p className="pull-right">
              <img src="/web/20200721094856im_/http://www.aealimited.com/kenya/img/flags/Kenya.png" alt="Kenya Flag" />
              <img src="/web/20200721094856im_/http://www.aealimited.com/kenya/img/flags/Tanzania.png" alt="Tanzania Flag" />
              <img src="/web/20200721094856im_/http://www.aealimited.com/kenya/img/flags/Uganda.png" alt="Uganda Flag" />
            </p>
          </div>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="indexke.php">
                <img src="/web/20200721094856im_/http://www.aealimited.com/kenya/img/AVERY_LOGO-01.png" className="img-responsive" alt="Avery Logo" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/src/Home.jsx">HOME</a></li>
                <li className="dropdown">
                  <ul className="dropdown-menu multi-column columns-2">
                    <li className="row">
                      <li className="col-sm-6">
                        <ul className="multi-column-dropdown">
                          <li className="ider"></li>
                          <li><a href="about.php">Overview</a></li>
                          <li className="ider"></li>
                        </ul>
                      </li>
                      <li className="col-sm-6">
                        <ul className="multi-column-dropdown">
                          <li className="ider"></li>
                          <li><a href="management.php">Management</a></li>
                          <li className="ider"></li>
                          <li><a href="board.php">Board Members</a></li>
                        </ul>
                      </li>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Career;