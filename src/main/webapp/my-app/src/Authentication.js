
export const isLogin = () => {
    return localStorage.getItem("jwtToken") != null;
}
export const isOrganizator = () =>{
    return localStorage.getItem("authorities") === "ORGANIZATOR";
}
export const isParticipant = () =>{
    return localStorage.getItem("authorities") === "PARTICIPANT";
}
export const isLecturer = () =>{
    return localStorage.getItem("authorities") === "LECTURER";
}