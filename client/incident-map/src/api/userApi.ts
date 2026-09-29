import { instance } from "../utils/axios_config.ts";
import type { loginType, registerType } from "../types/userTypes.ts";




export async function registerApi(body: registerType) {

    const register = await instance.post('/auth/register', {
        email: body.email,
        password: body.password,
        role: body.role,
        adminPass: body.adminPass
    })

    return register.data

}


export async function loginApi(body: loginType) {

    const login = await instance.post('/auth/login', {
        email: body.email,
        password: body.password

    })

    return login.data

}


export async function getUserApi(token: string) {

    const data = await instance.get(`/auth/me`, {
        headers: {
            authorization: `Bearer${token}`
        }
    })

    return data.data

}

// console.log(await getUserApi('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWJiOTVmMTNlMzQ1YWEwMmMzYWUyNWUiLCJpYXQiOjE3OTA2Nzg2NDQsImV4cCI6MTc5MDc2NTA0NH0.M-R-a19cmCyK5k3gkRfmohg0ncMLeID12sZLdjjEJNs'));




