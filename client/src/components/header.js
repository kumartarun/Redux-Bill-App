import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedBill.error && nextProps.deletedBill.error.message) {//delete failure
      alert(nextProps.deletedBill.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedBill.bill && !nextProps.deletedBill.error) {//delete success
      this.context.router.push('/');
    } else if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.context.router.push('/');
    }
  }

  renderSignInLinks(authenticatedUser) {
    if(authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/profile">
              {authenticatedUser.name}
              </Link>
            </li>
            <li style={{paddingRight: '10px'}} role="presentation">      
              <a style={{color:'#996633',  fontSize: '17px'}}  onClick={this.props.logout} href="javascript:void(0)">
              Log out
              </a>
            </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right">
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link  role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/signup">
            Sign up
            </Link>
          </li>
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link style={{color:'#996633',  fontSize: '17px'}} to="/signin">
            Sign in
            </Link>
          </li>
      </ul>
   );
  }
  
  renderLinks() {
    const { type, authenticatedUser } = this.props;
    if(type === 'bills_index') {
       return (
        <div className="container">
          <ul className="nav  nav-pills navbar-right">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link style={{color:'#337ab7',  fontSize: '17px'}} to="/bills/new">
              Add new  Bill
              </Link>
            </li>
          </ul>
         {this.renderSignInLinks(authenticatedUser)}

        </div>
       );
    } else if(type === 'bills_new') {
       return (
        <div className="container">
          {this.renderSignInLinks(authenticatedUser)}
          <ul className="nav  nav-pills navbar-left">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link className="text-xs-right"  style={{color:'#337ab7',  fontSize: '17px'}}  to="/">Back To Index</Link>
            </li>
          </ul>
        </div>
       );     
    } else if(type === 'bills_show') {
        return (
         <div className="container">
          <ul className="nav  nav-pills navbar-left">
            <li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
          </ul>
         
          <div className="navbar-form navbar-right" style={{paddingRight: '50px'}}>
            <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>Delete Post</button>
          </div>
           {this.renderSignInLinks(authenticatedUser)}
         </div>
      );
    }
  };

  render() {
      return (
       <nav className="navbar navbar-default navbar-static-top">
            <div id="navbar" className="navbar-collapse collapse">
            {this.renderLinks()}
            </div>     
       </nav>       
      );
  }
}

export default Header