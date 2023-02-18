const Chat = () => {
    return (
        <>
            <div className="chatArea contentArea">
                <div className="leftSide">
                    <div className="header">
                        <div className="userThumb active">
                            <img src="images/user.png" alt="user" />
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Search" id="search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                    <div className="chatList">
                        <h3 className="title">Chats</h3>
                        <ul>
                            <li>
                                <div className="userThumb offline">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="chatDetails">
                                    <h4 className="userName">John Doe</h4>
                                    <p className="lastMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                                </div>
                                <div className="chatTime">
                                    <p className="time">12:30</p>
                                    <div className="unreadCount">2</div>
                                </div>
                            </li>
                            <li>
                                <div className="userThumb">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="chatDetails">
                                    <h4 className="userName">John Doe</h4>
                                    <p className="lastMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                                </div>
                                <div className="chatTime">
                                    <p className="time">12:30</p>
                                    <div className="unreadCount">2</div>
                                </div>
                            </li>
                            <li>
                                <div className="userThumb">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="chatDetails">
                                    <h4 className="userName">John Doe</h4>
                                    <p className="lastMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                                </div>
                                <div className="chatTime">
                                    <p className="time">12:30</p>
                                    <div className="unreadCount">2</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="contactList">
                        <h3 className="title">Contacts</h3>
                        <ul>
                            <li>
                                <div className="userThumb">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="contactDetails">
                                    <h4 className="userName">John Doe</h4>
                                    <p className="designation">Admin</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="header">
                        <div className="userDetails">
                            <button className="backButton button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <div className="userThumb">
                                <img src="images/user.png" alt="user" />
                            </div>
                            <h4 className="userName">John Doe</h4>
                        </div>
                        <div className="Actions">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </div>
                            <div className="dropdown">
                                <ul>
                                    <li><a href="#">View Profile</a></li>
                                    <li><a href="#">Clear Chat</a></li>
                                    <li><a href="#">Delete Chat</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="chat">
                            <div className="message sender">
                                <div className="thumb">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="messageDetails">
                                    <p className="messageText">Hi</p>
                                    <p className="messageTime">12:30</p>
                                </div>
                            </div>
                            <div className="message reciver">
                                <div className="thumb">
                                    <img src="images/user.png" alt="user" />
                                </div>
                                <div className="messageDetails">
                                    <p className="messageText">Hello</p>
                                    <p className="messageTime">11:30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="inputBox">
                            <input type="text" placeholder="Type a message" id="message" />
                        </div>
                        <div className="sendButton">
                            <button className="button primaryButton"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;