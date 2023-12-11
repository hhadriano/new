const password = '1234567';
/*const username = 'pablo';
login( password, username);

async function login( password, username){
    const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({

            'password':password,
            'name':username
        })
    });
    const data = await resp.json();
    
    const dataToken = data.token;
    console.log(dataToken);

    
    let inputFile = document.getElementById('file_image');
	let inputIcon = document.getElementById('form_icon');

	inputIcon.onclick = (e) => {
		inputFile.click(e);
	};

	send.onclick = (event) => {
		form.classList.toggle("display_F");
		container.classList.toggle("pointer");

        //console.log(dataToken);
        console.log(5);

		event.preventDefault();
		let imgF = document.getElementById('file_image');
		let price = document.getElementById("price").value;
		let name = document.getElementById("name").value;
		let number = document.getElementById("number").value;
		const categoryId = 'b04a4242-2125-4089-9d0d-5dddf568d3a4';

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
				.then(imageName => postData(name, price, number, imageName, categoryId)) // Send to DB
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

	async function postData(name, price, number, imgName, user_id, categoryId) {
		const resp = await fetch("/api/items", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2ZTUwODdkLTM1ZDgtNGEwOC1hNmU0LWNiMjg5MzdlMTkyMCIsImlhdCI6MTcwMTUyMjE5NCwiZXhwIjoxNzA0MTE0MTk0fQ.R9vS0WoSnQrYYis0XGvJgWzr2bz_Ddu9_xk2DgARfWM'
			},
			body: JSON.stringify({

				'name': name,
				'price': price,
				'number': number,
				'image': imgName,
				'user_id': user_id,
				'category_id': categoryId
			})
		});
		const data = await resp.json();
		console.log(data)
	}*/



