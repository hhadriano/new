function del() {
    let modelImg = document.querySelectorAll('.div_container img');
    const del = document.querySelectorAll('.div_container');
    console.log(del);
    modelImg.forEach(
    item =>{
        let time = 0;
        item.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            time = setTimeout(() => {

               this.parentNode.classList.add('delete') 
                
            }, 1000);
        })
        item.addEventListener('mouseup', function () {
            clearTimeout(time);
        });
    }
)
document.addEventListener("click", function(event) {
    
    var targetElement = event.target; 
    del.forEach(item => {
     if(!item.contains(targetElement)) {

        item.classList.remove('delete');
     }}
    );
  });
}

function touchpad() {
    let modelImg = document.querySelectorAll('.div_container img');
const del = document.querySelectorAll('.div_container');
console.log(del);
modelImg.forEach(
    item =>{
        let time = 0;
        item.addEventListener('touchstart', function (e) {
            e.stopPropagation();
            time = setTimeout(() => {

               this.parentNode.classList.add('delete') 
                
            }, 1000);
        })
        item.addEventListener('mouseup', function () {
            clearTimeout(time);
        });
    }
)
}

function suprm() {
    

const supr = document.querySelectorAll('.fa-times');
         supr.forEach(
             item =>{
               item.addEventListener('click', function (e) {
                   this.parentNode.style.scale=0;
                   this.parentNode.style.transition = 0.5;
                   let target = e.target.id;
                   
                   
                   
                   suprId(target);
                     
                 
                    
         
                   async function suprId(id) {
                       const res = await fetch("api/items/"+id, {
                   
                           method: "DELETE",
                           headers: {
                               'Accept': 'application/json'
                           },
                           body:{
                               'item_id': id
                           }
                       });
                      
                       
                   }
                 }
               )
             }
         )
        }



