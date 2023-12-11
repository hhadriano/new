let display_1= document.getElementById("display_1");
console.log(display_1);
let firstI = document.getElementById("icon_1");
let secondI = document.getElementById("icon_2");
let thirdI = document.getElementById("icon_3");

secondI.style.color='transparent';
thirdI.style.color='transparent';

display_1.onclick= function (event) {
    container_1.style.display="grid";
    container_2.style.display="none";
    container_3.style.display="none";
    displayNav();
    secondI.style.color='transparent';
    thirdI.style.color='transparent';
    firstI.style.color='';
}
let display_2= document.getElementById("display_2");
console.log(display_2);
display_2.onclick= function (event) {
    container_1.style.display="none";
    container_2.style.display="grid";
    container_3.style.display="none";
    displayNav();
    secondI.style.color='';
    thirdI.style.color='transparent';
    firstI.style.color='transparent';
}
let display_3= document.getElementById("display_3");
console.log(display_3);
display_3.onclick= function (event) {
    container_1.style.display="none";
    container_2.style.display="none";
    container_3.style.display="grid";
    displayNav();
    secondI.style.color='transparent';
    thirdI.style.color='';
    firstI.style.color='transparent';
}
// model img
let scale = 1;
function modelImage() {
    
		let modelImg = document.querySelectorAll('.div_container img');
		
		
		modelImg.forEach( item =>{
			item.addEventListener('click',function (event) {
				event.stopPropagation();
				console.log(event);
				this.parentNode.classList.add('active');
				window.addEventListener('wheel', zoom)
			
			})
		}
	);

 let modelContainer = document.querySelectorAll('.div_container');

 modelContainer.forEach(item =>{
    item.addEventListener('click',async function (event) {
        event.stopPropagation();
        let zoomImg = document.querySelector('.div_container.active img');
        zoomImg.style.scale = '1';
				this.classList.remove('active');
        window.removeEventListener('wheel', zoom);
      
			})
  });


}

function zoom(e) {
	let scaleImg = document.querySelector('.div_container.active img');
							
	e.stopPropagation();
	if (e.deltaY < 0) {
			scale += 0.1;
	} else {
	scale -= 0.1;
	}
	scaleImg.style.scale= scale;  
}
    


