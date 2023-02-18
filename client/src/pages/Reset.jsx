import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../api/auth";
import InputBox from "../components/form/InputBox";
import { InputSubmit } from "../components/styled/elements/form";
import { Card, Section } from "../components/styled/pages/login";
import { showAlertPopup } from "../utils/alert";

const Reset = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        const formData = {}
            ;[...formRef.current].forEach(input => {
                if (input.type !== 'submit') {
                    formData[input.name] = input.value;
                }
            })
        const response = await reset(formData);
        if (response.status === "OK") {
            navigate("/login")
        }
        else if(response.password) {
            showAlertPopup(false, response.password[0]);
        }
        else {
            showAlertPopup(false, "Invalid OTP");
        }
    }

    return (
        <>
            <Section className="signInArea">
                <Card className="card">
                    <h3 className="title">Reset your password</h3>
                    <form ref={formRef} onSubmit={formSubmit}>
                        <InputBox
                            label="OTP"
                            type="text"
                            name="token"
                            isRequired={false}
                            placeholder="OTP"
                        />
                        <InputBox
                            label="New Password"
                            type="password"
                            name="password"
                            isRequired={false}
                            placeholder="**********"
                        />
                        <InputSubmit
                            type="submit"
                            name="submit"
                            value="Reset"
                        />
                    </form>
                    <Link to="/login">Sign in instead</Link>
                </Card>
            </Section>
        </>
    );
}

export default Reset;