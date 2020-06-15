const divnews = document.getElementById('statistics')
const url = 'https://hticovid-19.herokuapp.com'
const static = document.getElementById('static')
const hospital= document.getElementById('hospital')
const news =document.getElementById('news')
hospital.style["background-color"] = '#a71930'
hospital.style["color"]='white'
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
getlocation()
function getlocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert('Geolocation is not supported by this browser.')
      }
}
function showPosition(position) {
   
    getnews(position.coords.latitude,position.coords.longitude)
  }

async function getnews(lat,long){
    const response = await fetch(url+'/getnearbyhospital',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({lon:long,lat:lat})
        
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
        const data_html = '<div><img src='+imageurl+'><h4>'+data[index].name+'</h4>'+'<h4> المسافة:'+data[index].distance.distance+'</h4>'+'<h4> الوحدة :'+data[index].distance.unit+'</h4>'+'</h4>'+'<p> ID :'+data[index]._id+'</p></div>';
        divnews.innerHTML +=data_html
    }

}