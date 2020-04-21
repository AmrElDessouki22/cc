const email = document.getElementById('email')
const password = document.getElementById('password')
const login = document.getElementById('login')

login.addEventListener('click',loginmethod())
checkuser()

async function checkuser()
{
    try
    {
        const response  = await fetch('http://localhost:3000/checkadmin',{
        method:'GET',
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]
    }})
    if(response.status == 200)
    {
       return location.href = '/dashcontrol'
        
    }
        return console.log('U MUST LOGIN !');
    }catch(e)
    {
        return console.log('U MUST LOGIN !');  
    }
    

}
async function loginmethod(){
   try
   {
    const response = await fetch('http://localhost:3000/adminlogin',{
        method:'POST'
        ,
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        ,
        body:JSON.parse({email:email.value,password:password.value})
    })
    if(response.status == 200)
    {
        return location.href = '/dashcontrol'
    }
    return console.log('cant sign in ');
   }catch(e)
   {

   }
    
}
