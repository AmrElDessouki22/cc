
const des = document.getElementById('des')
const id = document.getElementById('id')
const title = document.getElementById('title')
const resource = document.getElementById('resource')
const hospital = document.getElementById('hospital')
const imageurl = document.getElementById('imageurl')
const statistics = document.getElementById('statistics')
const news = document.getElementById('news')
news.style["background-color"] = '#a71930'
news.style["color"]='white'
const add = document.getElementById('add')
const update = document.getElementById('update')
const remove = document.getElementById('remove')
const url =  'https://hticovid-19.herokuapp.com/'
add.addEventListener('click',addnew)
update.addEventListener('click',updatenew)
remove.addEventListener('click',removenew)
hospital.addEventListener('click',hospitalgo)
const logout = document.getElementById('logout')
logout.addEventListener('click',logoutgo)
checkuser()
async function logoutgo(){
    const response = await fetch(url+'adminlogout',{
        method:"POST",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status == 200){
        location.href='../dashboard/login'
    }
}
statistics.addEventListener('click',statisticsgo)
function statisticsgo()
{
    location.href='../dashboard/statistics'

}
function hospitalgo(){
    location.href='../dashboard/hospital'
}
 async function checkuser(){
    const response = await fetch(url+'checkadmin',{
        method:"GET",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })    
    if(response.status != 200){
        console.log('hacking');

        location.href='../dashboard/login'
    }
}


async function addnew()
{
    const body = {title:title.value ,description:des.value ,image_link:imageurl.value,resource:resource.value}
    const response = await fetch(url+'addnewnews',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body)
    })
    if(response.status == 200)
    {
        alert('new post add ')
        imageurl.value=''
        des.value =''
        resource.value=''
        title.value=''

    }

}



function updatebody(){
    const body = {}
    if(title.value != '' )
    {
        body.title = title.value
    }
    if(des.value != '')
    {
        body.description=des.value
    }
    if(imageurl.value != '')
    {
        body.image_link=imageurl.value
    }
    if(resource.value != '')
    {
        body.resource=resource.value
    }
    return body
}
async function updatenew()
{
    const response = await fetch(url+'updatenews/'+id.value,{
        method:'PATCH',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(updatebody())
    })
    if(response.status ==200)
    {
        alert('update post done ')
        imageurl.value=''
        des.value =''
        resource.value=''
        title.value=''

    }

}



async function removenew()
{
    const response = await fetch(url+'deletenews/'+id.value,{
        method:'DELETE',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status ==200)
    {
        alert('remove post done ')
        imageurl.value=''
        des.value =''
        resource.value=''
        title.value=''

    }

}