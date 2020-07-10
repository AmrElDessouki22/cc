const divnews = document.getElementById('statistics')
const url = 'https://hticovid-19.herokuapp.com'
const apk = document.getElementById('apk')
apk.addEventListener('click',apk_)
function apk_()
{
    location.href = 'https://www.mediafire.com/file/kakq2no3lowofgj/app-release.apk/file'
}
const static = document.getElementById('static')
const hospital= document.getElementById('hospital')
const news =document.getElementById('news')
static.style["background-color"] = '#324148'
static.style["color"]='white'
static.addEventListener('click',staticgo)
function staticgo(){
    location.href='/statisticsclient'
}
hospital.addEventListener('click',hospitalgo)
function hospitalgo(){
    location.href = '/nearhospitalclient'
}
news.addEventListener('click',newsgo)
function newsgo(){

    location.href = '/'
}
getnews()
async function getnews(){
    const response = await fetch(url+'/statistics',{
        method:'GET',
        
    })
    if(response.status == 200)
    {
        setdata(await response.json())
    }
}
function setdata(data){
    for (let index = 0; index < data.length; index++) {
        var imageurl = data[index].image_url
        if(imageurl === undefined)
        {
            imageurl = '../img/playstore.png'
        }
        const data_html = '<div><img src='+imageurl+'><h4>'+data[index].name+'</h4>'+'<h4> المتوفين:'+data[index].death+'</h4>'+'<h4> متعافين :'+data[index].recovered+'</h4>'+'<h4> الاجمالي :'+data[index].total+'</h4>'+'<p> ID :'+data[index]._id+'</p></div>';
        divnews.innerHTML +=data_html
    }

}