import { Link, useParams } from "react-router-dom";
import { DraftIcon, InboxIcon, SentIcon, StarredIcon, TrashIcon } from "../../../assets/icons/icons";

const list = [
    { name: "inbox", title: "Inbox", url: "inbox", icon: <InboxIcon /> },
    { name: "sent", title: "Sent", url: "sent", icon: <SentIcon /> },
    { name: "draft", title: "Draft", url: "draft", icon: <DraftIcon /> },
    { name: "starred", title: "Starred", url: "starred", icon: <StarredIcon /> },
    { name: "trash", title: "Trash", url: "trash", icon: <TrashIcon /> },
]

const EmailFilter = ({ labelFilter, setLabelFilter }) => {
    const { type } = useParams();
    return (
        <>
            <ul className="tabs">
                {
                    list.map((item) => {
                        return (
                            <li className={item.name === type ? "active" : ""} key={item.name}>
                                <Link to={item.url}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="labels">
                <h4 className="labelTitle">Labels</h4>
                <ul className="labelList">
                    <li className={`all ${labelFilter === "" && 'active'}`} onClick={() => setLabelFilter("")}>All</li>
                    <li className={`personal ${labelFilter === "Personal" && 'active'}`} onClick={() => setLabelFilter("Personal")}>Personal</li>
                    <li className={`important ${labelFilter === "Important" && 'active'}`} onClick={() => setLabelFilter("Important")}>Important</li>
                    <li className={`private ${labelFilter === "Private" && 'active'}`} onClick={() => setLabelFilter("Private")}>Private</li>
                    <li className={`company ${labelFilter === "Company" && 'active'}`} onClick={() => setLabelFilter("Company")}>Company</li>
                </ul>
            </div>
        </>
    )
}
export default EmailFilter;

{/* <li><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 17v.01m0-3.51a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"></path></g></svg> Spam</Link></li> */ }