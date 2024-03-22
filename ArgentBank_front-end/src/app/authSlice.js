import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//set up for fetching url
const backendURL = 'http://localhost:3001/api/v1'

//thunk logic should be writted here
//----------------------------------------------
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
      /* const test42 =  {
          email: "tony@stark.com",
          password: "password123"
          } */      
          console.log(email)     
      const logInForm_info =  {
      email: `${email}`,
      password: `${password}`
      }         
          try{   
              const response1 = await fetch(`${backendURL}/user/login`, {              
              body :  JSON.stringify(logInForm_info), 
              //body : JSON.stringify(test42),
              headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json'
              },
              method: "POST"
            })
              const data1 = await response1.json();  
              const token = await data1.body.token              
              // store user's token in local storage              
              //need to be stored only if remember me is checked           
              console.log(rememberMe)    
              if(rememberMe == true){
                localStorage.setItem('userToken', token)
              } 
              const response2 = await fetch(`${backendURL}/user/profile`, {       
                  headers: {
                    'Accept': "application/json",        
                    'Authorization': `Bearer${token}`,   
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST"
                })                     
              const data2 = await response2.json()
              //console.log("Réussite2 :", data2); 
              const userinfo = await data2.body
              //console.log("userinfo :", userinfo); 
              return {userinfo, token}; 
            } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const userEdit = createAsyncThunk(
  'auth/edit',
  async ({ firstName, lastName, token }, { rejectWithValue }) => {
      const editForm_info =  {
        firstName: `${firstName}`,
        lastName: `${lastName}`
      } 
      console.log('token : ')      
      console.log(token)    
          try{   
              const response = await fetch(`${backendURL}/user/profile`, { 
              //const response = await fetch(`http://localhost:3001/api/v1/user/login`, { 
              //body :  JSON.stringify(logInForm_info), 
              body : JSON.stringify(editForm_info),
              headers: {
                'Accept': "application/json",
                'Authorization': `Bearer${token}`,//recup user state user info token? 
                'Content-Type': 'application/json'
              },
              method: "PUT"
            })
              const data = await response.json();  
              console.log(data)             
              return data.body; 
            } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const userRememberLogin = createAsyncThunk(
  'auth/rmblogin',
  async ( token , { rejectWithValue }) => { 
    //console.log(token)             
          try{                 
              localStorage.setItem('userToken', token)              
              const response = await fetch(`${backendURL}/user/profile`, {       
                  headers: {
                    'Accept': "application/json",        
                    'Authorization': `Bearer${token}`,   
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST"
                })                     
              const data = await response.json()             
              const userinfo = await data.body             
              return {userinfo, token}; 
            } catch (error) {     
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
//----------------------------------------------

// initialize userToken from local storage if existe
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : undefined
  //: null

const initialState = {
    status:'idle',//async function state
    userInfo: undefined, // for user object
    userToken, // for storing the JWT
    error: null,//for fetching error, currently unused
    userAuthStatut: false // for monitoring the registration process.-> should be replaced by userInfo =! und
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
      LOG_OUT: (state) => {
        state.status = 'idle'
        state.userAuthStatut  = false
        state.userInfo = undefined  // null if ini with null 
        state.error = null
        //state.userToken = null
        state.userToken = undefined
        localStorage.removeItem('userToken') 
      },      
  },    
    extraReducers(builder) {
      builder
        .addCase(userLogin.pending, (state/* , action */) => {
          state.status = 'loading'
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add fetched user to state user          
          state.userAuthStatut = 'succeeded'
          state.userInfo = action.payload.userinfo
          state.userToken = action.payload.token
          //console.log( action.payload )
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(userEdit.pending, (state/* , action */) => {
          state.status = 'loading'//useless at the moment
        })
        .addCase(userEdit.fulfilled, (state, action) => {
          state.status = 'succeeded'          
          state.userInfo.firstName = action.payload.firstName
          state.userInfo.lastName = action.payload.lastName         
          //console.log( 'successfull edit' )
          //console.log( action.payload )        
        })
        .addCase(userEdit.rejected, (state, action) => {
          //state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(userRememberLogin.pending, (state/* , action */) => {
          state.status = 'loading'
        })
        .addCase(userRememberLogin.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add fetched user to state user          
          state.userAuthStatut = 'succeeded'
          state.userInfo = action.payload.userinfo
          //console.log( action.payload )
          //state.userToken = action.payload.token
        })
        .addCase(userRememberLogin.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          localStorage.removeItem('userToken')
          //state.userToken = null
          state.userToken = undefined
        })
    }
  })    
export const { LOG_OUT } = authSlice.actions
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectLogInValue = (state) => state.logIn.value //selector
export const selectUserToken = (state) => state.auth.userToken
export const selectUserInfo = (state) => state.auth.userInfo
export const selectStatut = (state) => state.auth.status 
export const selectUserAuthStatut  = (state) => state.auth.userAuthStatut 
export default authSlice.reducer

