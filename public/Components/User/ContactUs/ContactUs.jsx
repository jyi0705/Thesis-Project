import React, { Component } from 'react';
import './contactus.css';

// const ContactUs = () => (
//   <div className="bg10">
//       <form>
//         <input type="text" className="cont" id="name" name="firstname" placeholder="Name" required><span className="fa fa-user user"></span> <br/>
        
//         <input type="text" id="email" className="cont" name="email" placeholder="Email" required>
//         <span className="fa fa-envelope-o email_icon"></span>
//         <br/>
        
//         <input type="text" id="subjecting" className="cont" name="subject" placeholder="Subject" required> <span className="fa fa fa-pencil subject"></span> <br/>
        
//         <textarea rows="10" cols="40" id="boxing"  className="cont" placeholder="Message"></textarea> <span className="fa fa-comment-o comment"></span><br/>
        
//         <input type="submit" value="Send a message" id="submit_button">
//       </form>
//   </div>
// )

class ContactUs extends Component {
  render(){
    return(
  <div className="container">
    <section id="content">      
        <form>
          <h1>Contact Us</h1>
          <div>
            <input type="text" name="name" placeholder="Name" required/>
          </div>
          <div>
            <input  type="email" name="email" placeholder="Email" required/>
          </div>
          <div>
            <textarea type="text" name="comments" placeholder="Message" required style={{marginTop: 0 + 'em', height: 22 + 'em'}}></textarea>
          </div>
          <button type="submit" className="submit">Submit</button>
        </form>
    </section>
  </div>
    )
  }
}

        // <div className="name">
        //   <input placeholder="Name" />
        //   <span className="fa fa-user user"></span>
        // </div>

        // <div className="email">
        //   <input placeholder="Email" />
        //   <span className="fa fa-envelope-o email_icon"></span>
        // </div>

        // <div className="comment">
        //   <input placeholder="Message" />
        //   <span className="fa fa-comment-o comment"></span>
        // </div>
export default ContactUs;