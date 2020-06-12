
const email = document.getElementById('email')
const passowrd = document.getElementById('password')
const login_bt = document.getElementById('login')
const url = 'https://hticovid-19.herokuapp.com/'
checkuser()
 async function checkuser(){
    const response = await fetch(url+'checkadmin',{
        method:"GET",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status== 200){
        location.href='../dashboard/news'
    }else
    {
        console.log(response);
    }
}

login_bt.addEventListener('click',login)

async function login(){
    const body = {email:email.value , password:passowrd.value}
    const response = await fetch(url+'adminlogin',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
    if(response.status == 201)
    {
        location.href = url+'dashboard/news'
    }else
    {   
        console.log(response.status);
        
        console.log(await response.json());
        
        console.log('error to login');
        
    }
}