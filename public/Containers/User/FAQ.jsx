import React, { Component } from 'react';
import FAQEntry from '../../Components/User/FAQEntry'
class FAQ extends Component {
  render() {
    return (
    <div className="scroll-point" id="faq">
    <section className="faq py-4 bg-white">
        <div className="container">
            <h2 className="mb-4">Frequently asked questions</h2>
            <div className="row">
                <div>
                    <p className="h4">Quesion 1</p>
                    <p>
                        Answer 1
                    </p>
                </div>
                <div>
                    <hr className="hidden-md-up" />
                    <p className="h4">Question 2</p>
                    <p>
                        Answer 2
                    </p>
                </div>
                <div>
                    <hr className="hidden-lg-up" />
                    <p className="h4">Question 3</p>
                    <p>
                        Answer 3
                    </p>
                </div>
                <div>
                    <hr />
                    <p className="h4">Question 4</p>
                    <p>
                        Answer 4
                    </p>
                </div>
                <div>
                    <hr />
                    <p className="h4">Question 5</p>
                    <p>
                      Answer 5
                    </p>
                </div>
                <div>
                    <hr />
                    <p className="h4">Question 6</p>
                    <p>
                      Answer 6
                    </p>
                </div>
            </div>
        </div>
    </section>
    </div>
    )
  }
}

export default FAQ;