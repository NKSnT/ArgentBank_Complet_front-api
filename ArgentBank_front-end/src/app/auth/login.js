import AuthService from "./auth_service";

export default async function LogIn () { 
    //get form
    //call aut_serv
    const form_username = document.getElementById('username')
    const form_password = document.getElementById('password') 
    //const form_remember = document.etElementById('remember-me')//-> make something in local store/ storage with user data
    AuthService().loginUser(form_username.value, form_password.value)
    //const response = await AuthService().loginUser(form_username, form_password)
    //display response from api
    //console.log(response)
}
//pas sur si j'utilise, ou si je laisse sa sur la page signIn