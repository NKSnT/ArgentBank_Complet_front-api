//import { AuthService } from '../../services/auth.service';


export default function AuthService () {
  async function createUser(email, password, firstName, lastName){
  const response = await fetch(`http://localhost:3001/user/signup`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.    
    headers: {
      "Content-Type": "application/json",     
    },    
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }), 
  });  
  //console.log(response.json())
  return await response.json(); 
}

async function loginUser(email, password){
// verifier quelque part que email && password typeof(email)='string'
const emailtest = "tony@stark.com"
const paswordtest = "password123"
const test42 =  {
  email: emailtest,
  password: paswordtest
  }  
/* const logInForm_info =  {
  email: `${email}`,
  password: `${password}`
  } */

try{   
  const response = await fetch("http://localhost:3001/api/v1/user/login", { 
  //body :  JSON.stringify(logInForm_info), 
  body : JSON.stringify(test42),
  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json'
  },
  method: "POST"
})
  const data = await response.json();  
  console.log("Réussite :", data);  
  const userinfo = await getUser(data.body.token)
  console.log("Réussite2 :", userinfo); 
  return userinfo; 
  //return await response.json(); 
}catch (error) {
  console.error(`Erreur : ${error.message}`);
} 
}

async function getUser(token){
  try{  
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {       
      headers: {
        'Accept': "application/json",        
        'Authorization': `Bearer${token}`,   
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST"
    })
    return await response.json(); 
  }catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}
return {createUser, loginUser}
}





