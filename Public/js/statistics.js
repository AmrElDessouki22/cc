
const recovered = document.getElementById('recovered')
const id = document.getElementById('id')
const name = document.getElementById('name')
const total = document.getElementById('total')
const hospital = document.getElementById('hospital')
const death = document.getElementById('death')
const image = document.getElementById('image')
const statistics = document.getElementById('statistics')
const getitem = document.getElementById('getitem')
statistics.style["background-color"] = '#324148'
statistics.style["color"]='white'
const add = document.getElementById('add')
const update = document.getElementById('update')
const remove = document.getElementById('remove')
const url =  'https://hticovid-19.herokuapp.com/'
add.addEventListener('click',addnew)
update.addEventListener('click',updatenew)
remove.addEventListener('click',removenew)
hospital.addEventListener('click',hospitalgo)
const news = document.getElementById('news')
news.addEventListener('click',newsgo)
const logout = document.getElementById('logout')
logout.addEventListener('click',logoutgo)
async function logoutgo(){
    const response = await fetch(url+'adminlogout',{
        method:"POST",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status == 200){
        location.href='../dashboard/login'
    }
}
function newsgo()
{
    location.href='../dashboard/news'
}
function hospitalgo(){
    location.href='../dashboard/hospital'
}
checkuser()
 async function checkuser(){
    const response = await fetch(url+'checkadmin',{
        method:"GET",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status != 200){
        location.href='../dashboard/login'
    }
}

async function addnew()
{
    const body = {name:name.value ,recovered:recovered.value ,death:death.value,total:total.value,image_url:image.value}
    const response = await fetch(url+'addcountry',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body)
    })
    if(response.status ==200)
    {
        alert('new countrey added ')
        total.value=''
        name.value =''
        recovered.value=''
        death.value=''

    }

}



function updatebody(){
    const body = {}
    if(name.value != '' )
    {
        body.name = name.value
    }
    if(death.value != '')
    {
        body.death=death.value
    }
    if(total.value != '')
    {
        body.total=total.value
    }
    if(image.value != '')
    {
        body.total=image.value
    }
    if(recovered.value != '')
    {
        body.recovered=recovered.value
    }
    return body
}
async function updatenew()
{
    const response = await fetch(url+'updatecountry/'+id.value,{
        method:'PATCH',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(updatebody())
    })
    if(response.status ==200)
    {
        alert('updated country done ')
        total.value=''
        name.value =''
        recovered.value=''
        death.value=''

    }

}



async function removenew()
{
    const response = await fetch(url+'deletecountry/'+id.value,{
        method:'DELETE',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status ==200)
    {
        alert('removed country done ')
      

    }

}
getitem.addEventListener('click',myitem)
async function myitem()
{
    const response = await fetch(url+'getstatistics/'+id.value,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
    })
    if(response.status ==200)
    {
        var json = await response.json()
        total.value=json.total
        name.value =json.name
        recovered.value=json.recovered
        death.value=json.death
        
    }

}