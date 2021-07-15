import React from 'react';


function TopMenu() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/about' component={About}/>
        </Switch>
      </Router>
    );
  }

export default TopMenu;
