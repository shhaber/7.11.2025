async function register() {
    let Name = document.getElementById('Name').value;
    let Email = document.getElementById('Email').value;
    let User_Name = document.getElementById('User_Name').value;
    let Password = document.getElementById('Password').value;
    try {
        if (Name && Email && User_Name && Password) {
            console.log();
            
            let response = await fetch('/auth/reg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Name, Email, User_Name, Password})

            })
            if (response.status == 201) {
                window.location.href = '/login';
                return;
            }
            let data = await response.json();
            alert(data.massege);
        }else{
            alert("less info");
        }
    } catch (err) {
        alert(err)
    }

}