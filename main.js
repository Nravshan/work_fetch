let base_url = "http://localhost:9999"
let to_25 = document.querySelector('.users_lists .to_25 .list')
let to_50 = document.querySelector('.users_lists .to_50 .list')
let rest_users = document.querySelector('.users_lists .rest .list')
let form = document.forms.main
let inps = document.querySelectorAll('input')

function reFetch() {
    fetch(base_url)
        .then(res => res.json())
        .then(res => reload(res, to_25, to_50, rest_users));
}
reFetch()

form.onsubmit = (e) => {
    e.preventDefault()
    let user = { "image": "https://cordis.europa.eu/docs/news/images/2023-03/442991.jpg" }
    let fm = new FormData(form)
    fm.forEach((v, k) => user[k] = v)
    fetch(base_url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" }
    })
        .then(res => res.json())
        .then(res => reFetch())
}

function reload(arr, place1, place2, place3) {
    place1.innerHTML = ''
    place2.innerHTML = ''
    place3.innerHTML = ''
    for (let item of arr) {
        let user = document.createElement('div')
        let user_top = document.createElement('div')
        let user_bottom = document.createElement('div')
        let user_top_h1 = document.createElement('h1')
        let user_top_img = document.createElement('img')
        let user_bottom_age = document.createElement('div')
        let user_bottom_age_num = document.createElement('div')

        user.classList.add('user')
        user_top.classList.add('top', 'item')
        user_bottom.classList.add('bottom', 'item')
        user_bottom_age.classList.add('age')
        user_bottom_age_num.classList.add('age_num')
        user.style.background = colorRandomizer()

        user_top_img.src = item.image
        user_top_img.alt = 'image'

        user_top_h1.innerHTML = item.firstName + ' ' + item.lastName
        user_bottom_age.innerHTML = 'Age'
        user_bottom_age_num.innerHTML = item.age

        user.append(user_top, user_bottom)
        user_top.append(user_top_h1, user_top_img)
        user_bottom.append(user_bottom_age, user_bottom_age_num)
        if (item.age <= 25) {
            place1.append(user)
        } else if (item.age <= 50) {
            place2.append(user)
        } else {
            place3.append(user)
        }
        user_top_img.onclick = () => {
            fetch(base_url + '/' + item.id, {
                method: "DELETE",
                headers: { "Content-type": "application/json" }
            }).then(reFetch())
        }
    }
    if (place1.lastElementChild) {
        place1.lastElementChild.classList.add('MB')
    }
    if (place2.lastElementChild) {
        place2.lastElementChild.classList.add('MB')
    }
    if (place3.lastElementChild) {
        place3.lastElementChild.classList.add('MB')
    }
}

function colorRandomizer() {
    let r = Math.round(Math.random() * 255)
    let g = Math.round(Math.random() * 255)
    let b = Math.round(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
}