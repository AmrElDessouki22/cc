var Distance = require('geo-distance');
const getdistance = (mylocation,arrlocations)=>
{
   
    var nearby_one =[];
    arrlocations.forEach(element => 
    {
        var distance = Distance.between(mylocation,element.location)
    
        

        
        
        nearby_one = nearby_one.concat({lon:element.location.lon,lat:element.location.lat,distance:distance.human_readable(),name:element.name})
        
        
    });
    return nearby_one
}   
module.exports = getdistance