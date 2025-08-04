// Path :- dms-frontend/src/pages/profile.jsx 

import React, { useEffect, useState } from 'react';

import axios from 'axios';


const Profile = () =>{

    const [profile , setProfile] = useState(null);

    const [error , setError] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        axios.get("http://localhost:8000/api/users/profile/" , {
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then((res) =>{
            setProfile(res.data);
            setError("");
        })
        .catch((err) =>{
            setError("Failed to fetch profile. Are you logged in?");
        })
    }, []);


    if(error) return <div> {error} </div>;

    if (!profile) return <div> Loading... </div>;

    return(
        <div>
            <h1> User Profile </h1>
            {/* <p> Name : {profile.name} </p>
            <p> Email : {profile.email} </p>
            <p> Role : {profile.role} </p>
            <p> Created At : {new Date(profile.created_at).toLocaleString()} </p>
            <p> Updated At : {new Date(profile.updated_at).toLocaleString()} </p> */}
            <pre> {JSON.stringify(profile ,null , 2)}</pre>
        </div>
    );
};


export default Profile