let login = document.getElementById('login');
let userForm = document.getElementById('user_container');
login.onclick = function (event) {
    event.stopPropagation();
    userForm.classList.remove('user_display');
    
    

    document.addEventListener('click',function (event) {
        
        event.stopPropagation();
        let target = event.target;
        if (!userForm.contains(target) & !userForm.classList.contains('user_display')) {

            userForm.classList.add('user_display'); 
           
        }
    })
    if (!nav.classList.contains("hidden")){button.click()}
}
let submitUser = document.getElementById("send_user");
submitUser.onclick = function (e) {
    e.preventDefault();
    let userInput = document.getElementById('user').value;
    let passInput = document.getElementById('password').value;
    if (userInput === 'a' & passInput == 123) {
        window.location.href= 'user.html';
    } else {
        alert('wrong user')
    }
}

