import axios from "axios";
import jwt_decode from "jwt-decode";


// Login - get user token
export const getSession = () => {
    const jwt = localStorage.getItem('token');
    let session;
    try{
        const decode = jwt_decode(jwt);
        session = {
            status: true,
            name: decode.name,
            email: decode.email,
            accountType: decode.accountType
        };
        //console.log(session);
        return session;
    } catch(err){
        console.log(err);
        return session = {status: false};
    }
};

