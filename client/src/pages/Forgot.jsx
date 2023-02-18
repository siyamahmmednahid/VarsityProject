import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgot } from "../api/auth";
import InputBox from "../components/form/InputBox";
import { InputSubmit } from "../components/styled/elements/form";
import { Card, Section } from "../components/styled/pages/login";
import { showAlertPopup } from "../utils/alert"

const Forgot = () => {
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
        const response = await forgot(formData);
        if (response.status === "OK") {
            navigate("/reset")
        }
        else {
            showAlertPopup(false, "Invalid Email");
        }
    }

    return (
        <>
            <Section className="signInArea">
                <Card className="card">
                    <h3 className="title">Forgot your password</h3>
                    <form ref={formRef} onSubmit={formSubmit}>
                        <InputBox
                            label="Email"
                            type="text"
                            name="email"
                            isRequired={false}
                            placeholder="john@example.com"
                        />
                        <InputSubmit
                            type="submit"
                            name="submit"
                            value="Verify"
                        />
                    </form>
                    <Link to="/login">Sign in instead</Link>
                </Card>
            </Section>
        </>
    );
}

export default Forgot;