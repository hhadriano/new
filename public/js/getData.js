document.addEventListener('DOMContentLoaded',function () {
    getData();
})

async function getData() {
    const res = await fetch(`api/items`)
    const data = await res.json();
    console.log(data.items);

    for (item of data.items) {
        const div = document.createElement('div');
        container_1.appendChild(div);
        div.classList.add('div_container');
        
        let img = document.createElement('img');
        img.classList.add('div_img');
        img.src = "./uploads/images/"+item.image;
        div.appendChild(img);

        let typeShoes = document.createElement('h1');
        typeShoes.textContent = item.name;
        div.appendChild(typeShoes);

        let number = document.createElement('h2');
        number.textContent = item.number;
        div.appendChild(number);
        
        let cost = document.createElement('p');
        cost.textContent = item.price +' '+'usd';
        div.appendChild(cost);

        let delI = document.createElement('i');
        delI.classList.add("fa");
        delI.classList.add("fa-times");
        div.appendChild(delI);
        delI.id = item.item_id;

        //let delId = item.item_id;

         //let modelImg = document.querySelectorAll('.div_container img');

         modelImage();
         del();
         touchpad();
         suprm();
        
       
        
         
        
        
         
    }
}



