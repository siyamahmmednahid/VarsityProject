import { useParams } from "react-router-dom";
// import { fetchUser } from "../api/users";
import useFetch from "../hooks/useFetch";
import { userPersonalInfo as data } from "../assets/test-data/userApiResponse";
import { useEffect, useState } from "react";
import { ChangePasswordForm } from "../components/pages/user/ChangePasswordForm";
import InfoSection from "../components/pages/user/InfoSection";
import { userGeneralInfo, academicInfo, awardAndScholarshipInfo, experienceInfo, publicationInfo, teachingInfo, trainingInfo } from "../assets/test-data/userInfo";
import { fetchUserInfo, fetchUser, taskAndEmailCount, updateStatus } from "../api/user";
import useGetContext from "../hooks/useGetContext";
import GeneralInfoForm from "../components/pages/user/GeneralInfoForm";
import OtherInformationForm from "../components/pages/user/OtherInformationForm";
import GeneralInfoAddForm from "../components/pages/user/GeneralInfoAddForm";
import { bloodGroup, gender, maritalStatus, religion } from "../utils/selectFieldConvert";
import placeholder from "../assets/images/placeholder.jpg";
import { CheckboxIcon } from "../assets/icons/icons";

const User = () => {
    const { id } = useParams();
    const { userState } = useGetContext();

    const { data: count } = useFetch(taskAndEmailCount, { id });
    const [countData, setCountData] = useState({ task: 0, email: 0 });

    const [refetchData, setRefetchData] = useState(false);

    const [userInfo, setUserInfo] = useState({
        general: {},
        personal: {},
        academic: [],
        training: [],
        teaching: [],
        publication: [],
        awardAndScholarship: [],
        experience: [],
    })

    const [otherInfoModalData, setOtherInfoModalData] = useState({})

    useEffect(() => {
        const { taskCount = {}, emailCount = {} } = count;
        if (taskCount?.status && emailCount?.status) {
            setCountData({ task: taskCount.data, email: emailCount.data })
        }
    }, [count])

    useEffect(() => {
        // setUserInfo({
        //     general: userGeneralInfo.data,
        //     personal: userGeneralInfo.personal_info,
        //     academic: academicInfo.data.filter(item => item.user == id),
        //     training: trainingInfo.data.filter(item => item.user == id),
        //     teaching: teachingInfo.data.filter(item => item.user == id),
        //     publication: publicationInfo.data.filter(item => item.user == id),
        //     awardAndScholarship: awardAndScholarshipInfo.data.filter(item => item.user == id),
        //     experience: experienceInfo.data.filter(item => item.user == id),
        // })

        fetchParallelUserInfo();
    }, [refetchData])

    const fetchParallelUserInfo = async () => {
        const userGeneralInfo = fetchUser({ id });
        const academicInfoPromise = fetchUserInfo("academicinfo");
        const trainingInfoPromise = fetchUserInfo("traininginfo");
        const teachingInfoPromise = fetchUserInfo("teachinginfo");
        const publicationInfoPromise = fetchUserInfo("publicationinfo");
        const awardScholarshipInfoPromise = fetchUserInfo("awardscholarshipinfo");
        const experienceInfoPromise = fetchUserInfo("experienceinfo");

        const results = await Promise.all([userGeneralInfo, academicInfoPromise, trainingInfoPromise, teachingInfoPromise, publicationInfoPromise, awardScholarshipInfoPromise, experienceInfoPromise]);


        setUserInfo(() => {
            return {
                general: results[0].data || {},
                personal: results[0].personal_info || {},
                academic: results[1].data?.filter(item => item.user == id) || [],
                training: results[2].data?.filter(item => item.user == id) || [],
                teaching: results[3].data?.filter(item => item.user == id) || [],
                publication: results[4].data?.filter(item => item.user == id) || [],
                awardAndScholarship: results[5].data?.filter(item => item.user == id) || [],
                experience: results[6].data?.filter(item => item.user == id) || [],
            }
        })
    }

    const [isModalShow, setIsModalShow] = useState({
        changePassword: false,
        editInfo: false,
        generalInfo: false,
        otherInfo: false,
        addOtherInfo: false,
        generalInfoAdd: false
    });

    const handleModalOpen = (type, value) => {
        setIsModalShow(prev => ({ ...prev, [type]: value ? value : true }));
    }
    const handleModalClose = (type) => {
        setOtherInfoModalData({})
        setIsModalShow(prev => ({ ...prev, [type]: false }));
    }

    const handleActivation = async () => {
        const response = await updateStatus(id, !userInfo.general?.is_active)
        if (response.status) {
            fetchParallelUserInfo();
        }
    }

    return (
        <>
            {
                isModalShow.changePassword && (
                    <ChangePasswordForm onClose={handleModalClose} />
                )
            }
            {
                isModalShow.generalInfoAdd && (
                    <GeneralInfoAddForm
                        // data={{
                        //     general: userInfo.general,
                        //     personal: userInfo.personal
                        // }}
                        onClose={handleModalClose}
                        setRefetchData={setRefetchData}
                    />
                )
            }
            {
                isModalShow.generalInfo && (
                    <GeneralInfoForm
                        data={{
                            general: userInfo.general,
                            personal: userInfo.personal
                        }}
                        onClose={handleModalClose}
                        setRefetchData={setRefetchData}
                    />
                )
            }

            {
                (isModalShow.otherInfo || isModalShow.addOtherInfo) && (
                    <OtherInformationForm
                        onClose={handleModalClose}
                        type={isModalShow.otherInfo || isModalShow.addOtherInfo}
                        // data={userInfo[isModalShow.otherInfo]}
                        data={otherInfoModalData}
                        action={isModalShow.addOtherInfo ? "add" : "edit"}
                        setRefetchData={setRefetchData}
                    />
                )
            }
            <div className="userDetailArea">
                <div className="leftSide">
                    <div className="contentArea">
                        <div className="userIdentity">
                            <img src={userInfo.personal?.ProfilePic ? `${process.env.REACT_APP_SERVER_BASE_URL}${userInfo.personal?.ProfilePic}` : placeholder} alt="user" />
                            <h3 className="title">{`${userInfo.general?.first_name || ""} ${userInfo.general?.last_name || ""}`}</h3>
                            <p className="designation">{userInfo.personal?.Designation || ""}</p>
                        </div>
                        <div className="userHeighlight">
                            <div className="iconCard">
                                <div className="icon">
                                    <CheckboxIcon />
                                </div>
                                <div className="details">
                                    <h4 className="count">{countData.task}</h4>
                                    <p className="title">Task</p>
                                </div>
                            </div>
                            <div className="iconCard">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div className="details">
                                    <h4 className="count">{countData.email}</h4>
                                    <p className="title">Email</p>
                                </div>
                            </div>
                        </div>
                        <ul className="userDetail">
                            <li>Email : <span>{userInfo.general?.email || ""}</span></li>
                            {
                                Object.keys(userInfo.personal).length ? (
                                    <>
                                        <li>Phone : <span>{userInfo.personal?.Phone || ""}</span></li>
                                        <li>Employee Id : <span>{userInfo.personal?.EmployeeID || ""}</span></li>
                                        <li>Department : <span>{userInfo.personal?.Department || ""}</span></li>
                                        <li>Gender : <span>{gender[userInfo.personal?.Gender] || ""}</span></li>
                                        <li>Blood Group : <span>{bloodGroup[userInfo.personal?.BloodGroup] || ""}</span></li>
                                        <li>Date of Birth : <span>{userInfo.personal?.DateOfBirth || ""}</span></li>
                                        <li>Nationality : <span>{userInfo.personal?.Nationality || ""}</span></li>
                                        <li>NID Number : <span>{userInfo.personal?.NIDNumber || ""}</span></li>
                                        <li>Religion : <span>{religion[userInfo.personal?.Religion] || ""}</span></li>
                                        <li>Marital Status : <span>{maritalStatus[userInfo.personal?.MaritalStatus] || ""}</span></li>
                                        <li>Present Address : <span>{userInfo.personal?.PresentAddress || ""}</span></li>
                                        <li>Permanent Address : <span>{userInfo.personal?.PermanentAddress || ""}</span></li>

                                    </>
                                ) : ""
                            }
                        </ul>
                        {
                            id == userState.data.id && (
                                <div className="buttonArea">
                                    {
                                        Object.keys(userInfo.personal).length ? (
                                            <button className="button primaryButton" onClick={() => handleModalOpen("generalInfo")}>Edit</button>
                                        ) : (
                                            <button className="button primaryButton" onClick={() => handleModalOpen("generalInfoAdd")}>Add</button>
                                        )
                                    }
                                    <button className="button primaryButton warning" onClick={() => handleModalOpen("changePassword")}>Change Password</button>
                                </div>
                            )
                        }
                        {
                            (userState.data.is_superuser && id != userState.data.id) ? (
                                userInfo.general?.is_active ? (
                                    <div className="buttonArea">
                                        <button className="button primaryButton danger" onClick={handleActivation}>Deactivate</button>
                                    </div>
                                ) : (
                                    <div className="buttonArea">
                                        <button className="button primaryButton" onClick={handleActivation}>Activate</button>
                                    </div>
                                )
                            ) : ""
                        }
                    </div>
                </div>
                <div className="rightSide">
                    {
                        InfoSectionList.map(item => (
                            <InfoSection
                                type={item.type}
                                title={item.title}
                                data={userInfo[item.data]}
                                classes={item.classes}
                                key={item.type}
                                handleModalOpen={handleModalOpen}
                                setOtherInfoModalData={setOtherInfoModalData}
                                setRefetchData={setRefetchData}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default User;

const InfoSectionList = [
    {
        type: "academic",
        title: "Academic Information",
        data: "academic",
        classes: "academicInfo"
    },
    {
        type: "training",
        title: "Training Information",
        data: "training",
        classes: "trainingInfo"
    },
    {
        type: "teaching",
        title: "Teaching Information",
        data: "teaching",
        classes: "teachingInfo"
    },
    {
        type: "publication",
        title: "Publication Information",
        data: "publication",
        classes: "publicationInfo"
    },
    {
        type: "awardAndScholarship",
        title: "Award and Scolarship Information",
        data: "awardAndScholarship",
        classes: "awardAndScolarshipInfo"
    },
    {
        type: "experience",
        title: "Experience Information",
        data: "experience",
        classes: "experienceInfo"
    }
]