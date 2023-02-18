import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { fetchUserInfo, fetchUserOtherInfo } from "../api/user";
import { userLoginData } from "../assets/test-data/userLoginData";
import InputBox from "../components/form/InputBox";
import { InputSubmit } from "../components/styled/elements/form";
import { Card, Section } from "../components/styled/pages/login";
import {Context} from "../store/store.js"

const Login = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const {userAction, authAction} = useContext(Context)

    const formSubmit = async(e) => {
        e.preventDefault();
        const formData = {}
        ;[...formRef.current].forEach(input => {
            if(input.type !== 'submit') {
                formData[input.name] = input.value;
            }
        })
        let totalResponse = {};
        const response = await login(formData);
        // const response = userLoginData;
        if(response.status){
            totalResponse = {...response};
            let userPersonalData = await fetchUserOtherInfo({id: response.data.id, type: "personalinfo", token: response.access});
            if(userPersonalData.status) {
                totalResponse.data = {...totalResponse.data, ...userPersonalData.data};
            }
            userAction.setUser(totalResponse)
            authAction.setAuth()
            navigate("/")
        }
        else {
            console.log(response);
        }
    }
    
    return (
        <>
            <Section className="signInArea">
                <Card className="card">
                    <h3 className="title">Welcome to TMS!</h3>
                    <form ref={formRef} onSubmit={formSubmit}>
                        <InputBox
                            label="Username"
                            type="text"
                            name="username"
                            isRequired={false}
                            placeholder="john@example.com"
                        />
                        <InputBox
                            label="Password"
                            type="password"
                            name="password"
                            isRequired={false}
                            placeholder="**********"
                        />
                        <InputSubmit
                            type="submit"
                            name="submit"
                            value="Sign In"
                        />
                    </form>
                    <Link to="/forgot">Forget password</Link>
                </Card>
            </Section>
        </>
    );
}

export default Login;