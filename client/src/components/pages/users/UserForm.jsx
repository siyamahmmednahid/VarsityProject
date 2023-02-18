import { useEffect, useRef } from "react";
import { signup } from "../../../api/auth";
import { createUser } from "../../../api/users";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";

export const UserForm = ({ onClose, type }) => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef) {
            setData()
        }
    }, [formRef]);

    const setData = () => {
        const formData = new FormData(formRef.current);
        for (const key of formData.keys()) {
            // console.log(key);
            // console.log(formRef.current.Phone.value);
        }
    }

    usePseudoElementClick(sectionRef, () => onClose(true));

    const handleAddUser = async (e) => {
        e.preventDefault();
        const formData = {}
            ;[...formRef.current].forEach(input => {
                if (input.type !== 'submit') {
                    formData[input.name] = input.value;
                }
            })
        const fullName = formData.name ? formData.name.split(' ') : [];
        let firstName = '';
        let lastName = '';
        try {
            lastName = fullName[fullName.length - 1];
            firstName = fullName.slice(0, fullName.length - 1).join(' ');
        }
        catch (e) {
            firstName = '';
            lastName = '';
        }
        formData.first_name = firstName;
        formData.last_name = lastName;
        const response = await signup(formData);
        response.status && onClose(true);
    }
    return (
        <section className="addFormArea" ref={sectionRef}>
            <div className="popUp contentArea">
                <h3 className="title">Add teacher</h3>
                <form onSubmit={handleAddUser} ref={formRef}>
                    <div className="inputBox">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="inputBox">
                        <label>Full name</label>
                        <input type="text" name="name" placeholder="Full name" />
                    </div>
                    {/* <div className="inputBox">
                        <label>First name</label>
                        <input type="text" name="first_name" placeholder="First name" />
                    </div>
                    <div className="inputBox">
                        <label>Last name</label>
                        <input type="text" name="last_name" placeholder="Last name" />
                    </div> */}
                    <div className="inputBox">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="inputBox">
                        <label>Password</label>
                        <input type="password" name="password1" placeholder="Password" />
                    </div>
                    <div className="inputBox">
                        <label>Confirm Password</label>
                        <input type="password" name="password2" placeholder="Confirm Password" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                        <input type="submit" name="submit" value="Add teacher" />
                        {/* <button className="Button primaryButton warning" onClick={onClose}>Cancel</button> */}
                    </div>
                </form>
            </div>
        </section>
    )
}