const initialstate={
    userslist:[],
    user:[]
}

export const reducer=(state=initialstate,action)=>{
    const {type,payload}=action;
    switch(type){
        case "GET_USERS":
            return{
                ...state,
                userslist:payload
            }

        case "GET_USER":
            return{
                ...state,
                user:payload
            }    
        default:
            return state
    }
}

