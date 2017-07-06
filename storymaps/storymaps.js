var storymap
function getLocation()
{
  if (navigation.geolocation)
  {
    console.log("Geolocation supported ");
  }else{
    console.log("Geolocation not supported ");
    window.alert("Geolocation not supported");
  }
}

function initHeatMap(view,id,stories_coordonates)
{
  document.getElementById(id).style.width=(window.innerWidth*0.97)+"px";
  document.getElementById(id).style.height=( window.innerHeight*0.97)+"px";

	var storymap=L.map(id).setView(view, 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(storymap);
  var heat = L.heatLayer( stories_coordonates,{
           radius: 20,
           blur: 15,
           maxZoom: 17,
       }).addTo(storymap);

 return storymap;
}
function createStoryItem(it_id,it_type,it_len,it_src,it_preview,it_link,it_lktext,it_time,it_seen){

  var item={
            id:it_id,       // item id
            type: it_type,     // photo or video
            length: it_len,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: it_src,      // photo or video src
            preview: it_preview,  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: it_link,     // a link to click on story
            linkText:it_lktext, // link text
            time: it_time,     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: it_seen   // set true if current user was read - if local storage is used, you don't need to care about this
        }
        return item
}
var story=	{
				id: "Santa Claus",
				photo: "http://www.guychurch.com/wp-content/uploads/2014/01/santa_claus-1024x682.jpg",
				name: "Ramon",
				link: "https://ramon.codes",
				lastUpdated: 1492665454,
				items: [
							 createStoryItem("sata-1", "photo", 3, "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimagenesyfondos.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fpapa-noel-hd.jpg&f=1", '', false, 1492665454),
							 createStoryItem("santa-2", "video", 3, "http://0.media.collegehumor.cvcdn.com/24/44/dc2cfba03f4b265256151f47ffb454c6_13.mp4", "http://0.media.collegehumor.cvcdn.com/24/44/dc2cfba03f4b265256151f47ffb454c6_13.mp4", 'https://ramon.codes', false, 1492665454),
							 createStoryItem("santa-3", "video", 0, "http://0.media.collegehumor.cvcdn.com/74/83/06fd60faace8ac79b91b0b65b8b5c911_13.mp4", "http://0.media.collegehumor.cvcdn.com/74/83/06fd60faace8ac79b91b0b65b8b5c911_13.mp4", '', false, 1492665454)
							]
						}
function pinStory (story,id_div)
{
var stories = new Zuck(id_div, {

    list: false,           // displays a timeline instead of carousel
  openEffect: true,      // enables effect when opening story - may decrease performance
  cubeEffect: false,     // enables the 3d cube effect when sliding story - may decrease performance
  autoFullScreen: false, // enables fullscreen on mobile browsers
  backButton: true,      // adds a back button to close the story viewer
  backNative: false,     // uses window history to enable back button on browsers/android

	stories: [
               story
          ]}
      );
  document.getElementById(id_div).style.width="40px";
  document.getElementById(id_div).style.height="40px";
  document.getElementById(id_div).style.borderRadius="50%";
  document.getElementById(id_div).style.overflowX="hidden";
  document.getElementById(id_div).style.overflowY="hidden";


}




function pinStoryLocation(map,coord,title,id_div)
{
  var html_element= '<div id="pinned_story" class="img"><u id='+id_div+'> </u></div><div id="title_pinned_story"><b>Santa Claus Party</b></div>';
  var myIcon = L.divIcon({

    html: html_element});

 L.marker(coord, {icon: myIcon}).addTo(map);

}
