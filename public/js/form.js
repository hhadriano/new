function borderless() {
	let input = document.querySelectorAll('input');
	input.forEach(item=>{
		
		item.style.border = "none";
		item.style.borderBottom = "1px solid";
	})

	
}
let input = document.querySelectorAll('input');
	input.forEach(item=>{
		item.addEventListener( 'click', borderless)
	})

function post_1() {
	
	let inputFile = document.getElementById('file_image');
	let inputIcon = document.getElementById('form_icon');

	inputIcon.onclick = (e) => {
		inputFile.click(e);
	};

	send.onclick = (event) => {
		form.classList.toggle("display_F");
		container.classList.toggle("pointer");

		event.preventDefault();
		let imgF = document.getElementById('file_image');
		let price = document.getElementById("price").value;
		let name = document.getElementById("name").value;
		let number = document.getElementById("number").value;

		if (price == '' || name == ''|| imgF.files.lenght === 0 || number == '' ) {
			alert('Campos vacios');
		} else {

			//image random
			let r = (Math.random() + 1).toString(36).substring(2);

			let extension = imgF.files[0].name.split('.').pop();

			let imgName = r + '.' + extension;

			let category = 'calzado';

			const formData = new FormData;
			formData.append('file', imgF.files[0], imgName);


			

			//Upload
			uploadImg(formData)
				.then(imageName => postData(name, price, number, imageName, category)) // Send to DB
				.then(response => console.log(response))
				//.then(() => {window.location.href= 'index.html';})
			
		}
	}

	async function uploadImg(formData) {
		const res = await fetch("/api/uploads", {

			method: "POST",
			headers: {
				'Accept': 'application/json'
			},
			body: formData

		});
		const data = await res.json()
		console.log(data)
		const imgName = data.name
		return imgName
	}

	async function postData(name, price, number, imgName, category ) {
		const resp = await fetch("/api/items", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhNWY5YzNhLWQ5ODctNGE5NC05NmRmLWI0YTEwNGVkMWJlMCIsImlhdCI6MTcwMTU5MjgzNCwiZXhwIjoxNzA0MTg0ODM0fQ.w22OAu0U0zhjG_4ioWZP0mmUrzNu8HkeU3UmkGrH3h8'
			},
			body: JSON.stringify({

				'name': name,
				'price': price,
				'number': number,
				'image': imgName,
				'category_id': category
				
			})
		});
		const data = await resp.json();
		console.log(data)
	}
}



function post_2(params) {
	
	let inputFile = document.getElementById('file_image');
	let inputIcon = document.getElementById('form_icon');
	
	inputIcon.onclick = (e) => {
		inputFile.click(e);
	};
	
	send.onclick = (event) => {
		form.classList.toggle("display_F");
		container.classList.toggle("pointer");
	
		event.preventDefault();
		let imgF = document.getElementById('file_image');
		let price = document.getElementById("price").value;
		let name = document.getElementById("name").value;
		let number = document.getElementById("number").value
	
		if (price == '' || name == ''|| imgF.files.lenght === 0 || number == '' ) {
			alert('Campos vacios');
		} else {
	
			//image random
			let r = (Math.random() + 1).toString(36).substring(2);
	
			let extension = imgF.files[0].name.split('.').pop();
	
			let imgName = r + '.' + extension;
	
			const formData = new FormData;
			formData.append('file', imgF.files[0], imgName);
	
	
			
	
			//Upload
			uploadImg(formData)
				.then(imageName => postData(name, price, number, imageName)) // Send to DB
				.then(response => console.log(response))
				.then(() => {window.location.href= 'index.html';})
			
		}
	}
	
	async function uploadImg(formData) {
		const res = await fetch("/api/uploads", {
	
			method: "POST",
			headers: {
				'Accept': 'application/json'
			},
			body: formData
	
		});
		const data = await res.json()
		console.log(data)
		const imgName = data.name
		return imgName
	}
	
	async function postData(name, price, number, imgName, token) {
		const resp = await fetch("/api/items", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
				
			},
			body: JSON.stringify({
	
				'name': name,
				'price': price,
				'number': number,
				'image': imgName,
				'item_id': item_id
				
	
			})
		});
		const data = await resp.json();
		console.log(data)
	}
	
	
	
	}
	
	
function post_3(params) {

	let inputFile = document.getElementById('file_image');
	let inputIcon = document.getElementById('form_icon');

	inputIcon.onclick = (e) => {
		inputFile.click(e);
	};

  send.onclick = (event) => {
	form.classList.toggle("display_F");
	container.classList.toggle("pointer");

	event.preventDefault();
	let imgF = document.getElementById('file_image');
	let price = document.getElementById("price").value;
	let name = document.getElementById("name").value;
	let number = document.getElementById("number").value

	if (price == '' || name == ''|| imgF.files.lenght === 0 || number == '' ) {
		alert('Campos vacios');
	} else {

		//image random
		let r = (Math.random() + 1).toString(36).substring(2);

		let extension = imgF.files[0].name.split('.').pop();

		let imgName = r + '.' + extension;

		const formData = new FormData;
		formData.append('file', imgF.files[0], imgName);


		

		//Upload
		uploadImg(formData)
			// .them(login => crear_usuer())
			.then(imageName => postData(name, price, number, imageName, dataT)) // Send to DB
			.then(response => console.log(response))
			.then(() => {window.location.href= 'index.html';})
		
	}
}

	async function uploadImg(formData) {
		const res = await fetch("/api/uploads", {

			method: "POST",
			headers: {
				'Accept': 'application/json'
			},
			body: formData

		});
		const data = await res.json()
		console.log(data)
		const imgName = data.name
		return imgName
	}

	async function postData(name, price, number, imgName, item_id, token) {
		const resp = await fetch("/api/items", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			
			},
			body: JSON.stringify({

				'name': name,
				'price': price,
				'number': number,
				'image': imgName,
				'item_id': item_id
				

			})
		});
		const data = await resp.json();
		console.log(data)
	}
}

