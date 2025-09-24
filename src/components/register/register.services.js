export const register =(name,email,password) =>{
    fetch("http://localhost:3000/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(res => res.json().then(data => {
                if (!res.ok) {
                    return;
                }


                navigate("/home");
            }))
            .catch(err => console.log(err))
    }
    return 
}