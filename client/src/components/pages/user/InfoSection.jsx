import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteOtherInfo } from "../../../api/user";
import { DeleteIcon } from "../../../assets/icons/icons";
import useGetContext from "../../../hooks/useGetContext";
import { ModalContainer, ModalContent } from "../../styled/elements/modal";

const formType = {
    academic: "academicinfo",
    training: "traininginfo",
    teaching: "teachinginfo",
    publication: "publicationinfo",
    awardAndScholarship: "awardscholarshipinfo",
    experience: "experienceinfo"
}

const InfoSection = ({ type, title, data, classes, handleModalOpen, setOtherInfoModalData, setRefetchData }) => {
    const { userState } = useGetContext()
    const { id } = useParams();

    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleEditClick = (index) => {
        setOtherInfoModalData(data[index])
        handleModalOpen("otherInfo", type);
    }

    const handleAddClick = (index) => {
        setOtherInfoModalData(data[0])
        handleModalOpen("addOtherInfo", type);
    }

    const handleDeleteClick = (index) => {
        setDeleteItemId(data[index].id);
        setIsDeleteModalShow(true);
    }

    const handleDelete = async() => {
        const response = await deleteOtherInfo(formType[type], deleteItemId);
        if(response.status){
            setRefetchData(prev => !prev);
            setIsDeleteModalShow(false);
        }
    }
    return (
        <>
            {
                isDeleteModalShow ? (
                    <ModalContainer>
                        <ModalContent>
                            <h3 className="title" style={{ textAlign: "center" }}>Delete User Info</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: "0 10px" }}>
                                <button className="button primaryButton danger" onClick={handleDelete}>Delete</button>
                                <button className="button primaryButton warning" onClick={() => setIsDeleteModalShow(false)}>Cancel</button>
                            </div>
                        </ModalContent>
                    </ModalContainer>
                ) : ""
            }
            <div className={`contentArea ${classes}`}>
                <div >
                    <h3 className="title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                        {title}
                        {
                            id == userState.data.id && (
                                <button className="Button secondaryButton" onClick={() => handleAddClick()}>
                                    Add
                                </button>
                            )
                        }
                    </h3>

                </div>
                {
                    data.map((item, index) => (
                        <div className="content" style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                            <Timeline type={type} data={item} />
                            <div className="heading" style={{ display: 'flex', alignItems: 'flex-start' }}>
                                {
                                    id == userState.data.id && (
                                        <div style={{ display: "flex", gap: "0 5px", justifyContent: "center", alignItems: "center" }}>
                                            <button className="Button secondaryButton" onClick={() => handleDeleteClick(index)}>
                                                <DeleteIcon />
                                            </button>
                                            <button className="Button secondaryButton" onClick={() => handleEditClick(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"></path></g></svg>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default InfoSection;

const Timeline = ({ type, data }) => {
    return (
        <>
            {
                type === 'academic' ? (
                    <div>
                        <p className="dateTime">{data.PassingYear}</p>
                        <p className="infoTitle">{`${data.Degree} in ${data.Major}`}</p>
                        <p>{data.Institute}</p>
                        <p>{data.CGPA}</p>
                    </div>
                ) :
                    type === 'training' ? (
                        <div>
                            <p className="dateTime">{data.Year}</p>
                            <p className="infoTitle">{data.Title}</p>
                            <p>{data.Institute}</p>
                            <p>{data.Duration}</p>
                        </div>
                    ) :
                        type === 'teaching' ? (
                            <div>
                                <p className="dateTime">{data.CourseCode}</p>
                                <p className="infoTitle">{data.CourseTitle}</p>
                                <p>{data.Credit}</p>
                            </div>
                        ) :
                            type === 'publication' ? (
                                <div>
                                    <p className="dateTime">{data.Year}</p>
                                    <p className="infoTitle">{data.Title}</p>
                                    <p>Journal: {data.Journal}</p>
                                    <p>Volume: {data.Volume}</p>
                                    <p>{data.page == 1 ? "Page" : "Pages"}: {data.Page}</p>
                                </div>
                            ) :
                                type === 'awardAndScholarship' ? (
                                    <div>
                                        <p className="dateTime">{data.Year}</p>
                                        <p className="infoTitle">{data.Title}</p>
                                        <p>{data.Organization}</p>
                                    </div>
                                ) :
                                    type === 'experience' ? (
                                        <div>
                                            <p className="dateTime">{data.Year}</p>
                                            <p className="infoTitle">{data.Designation}</p>
                                            <p>{data.Organization}</p>
                                            <p>{data.Duration}</p>
                                        </div>
                                    ) : ""
            }
        </>
    )
}

