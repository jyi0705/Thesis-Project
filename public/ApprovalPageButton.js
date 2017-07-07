import React from 'react';
import { BrowserRouter as Router, Link, Route, History} from 'react-router-dom';

const ApprovalPageButton = () => (
  <Router>
    <div>
      <Link to="/approval">
        <button>Get Approved!</button>
      </Link>
    </div>
  </Router>
)



export default ApprovalPageButton;