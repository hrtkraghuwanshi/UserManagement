export const getusers=(users)=>{
    return{
        type:"GET_USERS",
        payload:users
    }
}

export const getuser=(user)=>{
    return{
        type:"GET_USER",
        payload:user
    }
}