
const BASE_URL = "https://book-review-ot6z.onrender.com/api/v1"



export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

export const reviewEndpoints = {
    CREATE_REVIEW: BASE_URL + "/review/createreview",
    EDIT_REVIEW: BASE_URL + "/review/editreview",
    DELETE_REVIEW: BASE_URL + "/review/deletereview",
    GET_REVIEW: BASE_URL + "/review/getallreviews",

    CREATE_COMMENT: BASE_URL + "/comment/createcomment",
    EDIT_COMMENT: BASE_URL + "/comment/editcomment",
    DELETE_COMMENT: BASE_URL + "/comment/deletecomment",
    GET_COMMENT: BASE_URL + "/comment/getcomment",

}


