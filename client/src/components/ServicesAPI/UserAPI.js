/*
It is not used yet, but we wanted to store the user relevant data in the local storage, like the favorite district of the user or
alle the notification the user want to set for each district.
*/


function localKey() {
    return 'userLoaclNews_1';
}

export function getUser(){
    if (localStorage.getItem(localKey())){
        return JSON.parse(localStorage.getItem(localKey())) ;
    }
}
export function deleteUser(user){
    localStorage.removeItem(user);
}
export function updateUser(state) {
    localStorage.setItem(localKey(), JSON.stringify(state));
}
export function setModel(){
    return {
        favDistrict: "",
        notification: {},
    };
}

export function setUser(fromState){
    let state = setModel();
    state.favDistrict = fromState.favDistrict;
    state.notification = fromState.setNotification;
    updateUser(state);
}


export default getUser;
