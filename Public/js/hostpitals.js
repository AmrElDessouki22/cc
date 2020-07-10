
const id = document.getElementById('id')
const lat = document.getElementById('lat')
const long = document.getElementById('long')
const name = document.getElementById('name')
const news = document.getElementById('news')
const getitem = document.getElementById('getitem')

const hospital = document.getElementById('hospital')
const statics = document.getElementById('statics')
hospital.style["background-color"] = '#324148'
hospital.style["color"]='white'
const image = document.getElementById('image')
const add = document.getElementById('add')
const update = document.getElementById('update')
const remove = document.getElementById('remove')
const url =  'https://hticovid-19.herokuapp.com/'
add.addEventListener('click',addnew)
update.addEventListener('click',updatenew)
remove.addEventListener('click',removenew)
news.addEventListener('click',newsgo)
statics.addEventListener('click',staticsgo)
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

function newsgo()
{
    location.href='../dashboard/news'
}
function staticsgo()
{
    location.href='../dashboard/statistics'
}
async function addnew()
{
    const body = {name:name.value ,location:{lon:long.value,lat:lat.value},image_url:image.value}
    const response = await fetch(url+'addhospital',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body)
    })
    if(response.status ==200)
    {
        alert('hospital add ^_^')
        lat.value=''
        long.value =''
        name.value=''


    }

}



function updatebody(){
    const body = {}
    const location={}
    if(name.value != '' )
    {
        body.name = name.value
    }
    if(image.value != '' )
    {
        body.name = image.value
    }
    if(long.value != '' )
    {
        if(lat.value !='')
        {
            
        
        location.lon = long.value
        location.lat=lat.value
        body.location=location
        }else
        {
            alert('longitude and latitude must be fill')
            return null
        }

    }
    
    
    
    return body
}
async function updatenew()
{
    const response = await fetch(url+'updatehospital/'+id.value,{
        method:'PATCH',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(updatebody())
    })
    if(response.status ==200)
    {
        alert('update hospital done ')
    
        lat.value=''
        long.value =''
        name.value=''

    }

}



async function removenew()
{
    const response = await fetch(url+'deletehospital/'+id.value,{
        method:'DELETE',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status ==200)
    {
        alert('remove hospital done ')
        lat.value=''
        long.value =''
        name.value=''
    }

}
getitem.addEventListener('click',myitem)
async function myitem()
{
    const response = await fetch(url+'gethospitals/'+id.value,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
    })
    if(response.status ==200)
    {
        var json = await response.json()
        lat.value=json.location.lat
        long.value =json.location.lon
        name.value=json.name
        image.value = json.image_url== undefined ?'':json.image_url
    }

}