import useFetch from "../hooks/useFetch";
import { fetchUsers } from "../api/users";
import { DeleteIcon, EditIcon, ViewIcon } from "../assets/icons/icons";
import { UserForm } from "../components/pages/users/UserForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import useGetContext from "../hooks/useGetContext";
import placeholder from "../assets/images/placeholder.jpg";



const Users = () => {
    const { data, isFetched, error, fetchData } = useFetch(fetchUsers, {});
    const { userState } = useGetContext()
    const [isAddModalShow, setIsAddModalShow] = useState(false);

    const [search, setSearch] = useState('');

    const handleModalOpen = () => {
        setIsAddModalShow(true)
    }
    const handleModalClose = (isRefetch) => {
        if (isRefetch) fetchData();
        setIsAddModalShow(false);
    }

    const handleSearchFilter = (item) => {
        if (!search) return true;

        return (
            item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        );
    }
    return (
        <>
            {
                isAddModalShow && (
                    <UserForm
                        onClose={handleModalClose}
                        type="add"
                    />
                )
            }
            <div className="userList contentArea">
                <div className="userListHeader">
                    <div className="userSearch">
                        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {
                        (userState.data.is_superuser || userState.data.is_staff) && (
                            <div className="userListActions">
                                <button className="Button primaryButton" onClick={handleModalOpen}>Add teacher</button>
                            </div>
                        )
                    }
                </div>
                <div className="userListBody">
                    <table className="userListTable">
                        <thead>
                            <tr>
                                <th className="User">Teacher</th>
                                <th className="Designation">Designation</th>
                                <th className="Status">Status</th>
                                <th className="Actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isFetched && data.status && data.data.length && data.data.filter(handleSearchFilter).map((user) => (
                                    <UserRow
                                        key={user.id}
                                        id={user.id}
                                        name={`${user.first_name} ${user.last_name}`}
                                        email={user.email}
                                        designation={user.personal_info?.Designation || "N/A"}
                                        status={user.is_active}
                                        image={user.personal_info?.ProfilePic ? `${process.env.REACT_APP_SERVER_BASE_URL}${user.personal_info?.ProfilePic}` : placeholder}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Users;

const UserRow = ({ id, name, email, designation, status, image }) => {
    return (
        <tr>
            <td className="User">
                <img src={image} alt="user" />
                <div className="userDetails">
                    <Link to={`/teachers/${id}`}>
                        <h4 className="userName">{name}</h4>
                    </Link>
                    <p className="userEmail">{email}</p>
                </div>
            </td>
            <td className="Designation">{designation}</td>
            <td className={`Status ${status ? 'active' : 'deactive'}`}>
                <span>{status ? 'Active' : 'Inactive'}</span>
            </td>
            <td className="Actions">
                {/* <button className="Button secondaryButton">
                    <EditIcon />
                </button>
                <button className="Button secondaryButton">
                    <DeleteIcon />
                </button> */}
                <button className="Button secondaryButton">
                    <Link to={`/teachers/${id}`}>
                        <ViewIcon />
                    </Link>
                </button>
            </td>
        </tr>
    )
}

// deactive || active
