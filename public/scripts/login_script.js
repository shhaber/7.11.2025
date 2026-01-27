async function login() {
    const User_Name = document.getElementById('User_Name').value;
    const Password  = document.getElementById('Password').value;
    console.log(Password);
    
    if (!User_Name || !Password) {
        alert("נא למלא את כל השדות");
        return;
    }

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                User_Name: User_Name,
                Password: Password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('name', data.Name);
            window.location.href = '/';
        } else {
            alert(data.message || "שגיאה בהתחברות");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}
