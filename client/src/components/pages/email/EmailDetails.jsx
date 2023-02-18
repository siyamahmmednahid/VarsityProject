const EmailDetails = () => {
    return (
        <>
            <div className="emailDetailArea">
                <div className="detailHeader">
                    <div className="detailHeaderLeft">
                        <button className="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <h4 className="emailSubject">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                    </div>
                    <div className="detailHeaderRight">
                        <div className="emailActions">
                            <button className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </button>
                            <div className="dropdown">
                                <button className="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </button>
                                <ul>
                                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Draft</a></li>
                                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> Spam</a></li>
                                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Trash</a></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <button className="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                </button>
                                <ul className="labelList">
                                    <li><a href="#">Personal</a></li>
                                    <li><a href="#">Important</a></li>
                                    <li><a href="#">Private</a></li>
                                    <li><a href="#">Company</a></li>
                                </ul>
                            </div>
                            <button className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </button>
                            <button className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                            <div className="controls">
                                <button className="button"><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                                <button className="button"><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="labelsArea">
                    <a href="#" className="personal">Personal</a>
                    <a href="#" className="important">Important</a>
                    <a href="#" className="private">Private</a>
                    <a href="#" className="company">Company</a>
                </div>
                <div className="emailDetail">
                    <div className="header">
                        <div className="senderInfo">
                            <img src="images/user.png" alt="user" className="thumb" />
                            <div className="details">
                                <h3 className="name">John Doe</h3>
                                <p className="email">example@email.com</p>
                            </div>
                        </div>
                        <div className="emailDate">
                            <p>Dec 10, 2022</p>
                        </div>
                    </div>
                    <div className="emailBody">
                        <p>Hi John,</p>
                        <p>Thank you for your order. We will send you the product as soon as possible.</p>
                        <p>Thanks</p>
                        <p>John Doe</p>
                    </div>
                </div>
                <div className="emailDetail">
                    <div className="header">
                        <div className="senderInfo">
                            <img src="images/user.png" alt="user" className="thumb" />
                            <div className="details">
                                <h3 className="name">John Doe</h3>
                                <p className="email">example@email.com</p>
                            </div>
                        </div>
                        <div className="emailDate">
                            <p>Dec 10, 2022</p>
                        </div>
                    </div>
                    <div className="emailBody">
                        <p>Hi John,</p>
                        <p>Thank you for your order. We will send you the product as soon as possible. Thank you for your order. We will send you the product as soon as possible. Thank you for your order. We will send you the product as soon as possible.</p>
                        <p>Thanks</p>
                        <p>John Doe</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EmailDetails;