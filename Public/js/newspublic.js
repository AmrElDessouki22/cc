const divnews = document.getElementById('news')
const url = 'https://hticovid-19.herokuapp.com'
const static = document.getElementById('static')
const hospital= document.getElementById('hospital')
const news =document.getElementById('news')

static.addEventListener('click',staticgo)
function staticgo(){
    location.href = '/'
}
hospital.addEventListener('click',hospitalgo)
function hospitalgo(){
    location.href = '/nearhospitalclient'
}
news.addEventListener('click',newsgo)
function newsgo(){
    location.href='/statisticsclient'
}
getnews()
async function getnews(){
    const response = await fetch(url+'/news',{
        method:'GET',
        
    })
    if(response.status == 200)
    {
        setdata(await response.json())
    }
}
function setdata(data){
    for (let index = 0; index < data.length; index++) {

        const data_html = '<div><img src='+data[index].image_link+'><h4>'+data[index].description+'</h4><p> ID :'+data[index]._id+'</p></div>';
        divnews.innerHTML +=data_html
    }

}