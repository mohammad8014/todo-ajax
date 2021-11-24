let btn = document.getElementById('btn')
let title = document.getElementById('title')
let description = document.getElementById('description')
let dueDate = document.getElementById('dueDate')
let todo = document.getElementById('todo')
let savebtn = document.getElementById('savebtn')

title.addEventListener('input',()=>{
    title.style.border='1px solid gray'

})
description.addEventListener('input',()=>{
    description.style.border='1px solid gray'

})
dueDate.addEventListener('input',()=>{
    dueDate.style.border='1px solid gray'

})

function onloaded() {
    let queryString = window.location.search
    if (queryString.trim()) {

        let urlParams = new URLSearchParams(queryString)
        let serchid = urlParams.get('id')


        let Url = "https://61895f90d0821900178d7971.mockapi.io/todos/"
        let resp = fetch(Url + serchid);

        resp
            .then((data) => {
                if (data.status === 200) {
                    return data.json();
                } else {
                    throw new Error("We Have an error");

                }
            })
            .then((data) => {
                title.value = data.title
                dueDate.value = data.dueDate
                description.value = data.description
            })


            .catch(err => {
                console.log(err);
            })

        btn.style.display = 'none'
        savebtn.style.display = 'block'
    } else {
        btn.style.display = 'block'
        savebtn.style.display = 'none'

    }


}


savebtn.addEventListener('click', taskEdite)

function taskEdite() {
    let toast= document.getElementById("snackbar");
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show"); }, 3000);


    if (title.value && description.value && dueDate.value != 0) {
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        let serchid = urlParams.get('id')
        let res = fetch("https://61895f90d0821900178d7971.mockapi.io/todos/" +serchid, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "title": title.value,
                "dueDate": dueDate.value,
                "description": description.value,
                "editDate": addDate


            })
        })
        title.value = ''
        description.value = ''
        dueDate.value = ''
    }
    setTimeout(function(){window.location.href="http://127.0.0.1:5500/main.html"}, 1000);

 
}



btn.addEventListener('click', addtext)


let Dates = new Date();

let addDate = Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-' + Dates.getDate();


function addtext() {

    if (title.value && description.value && dueDate.value != 0) {
        let res = fetch("https://61895f90d0821900178d7971.mockapi.io/todos", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "title": title.value,
                "dueDate": dueDate.value,
                "description": description.value,
                "addDate": addDate,
                "editDate": addDate,
                "checked": false

            })
        })
        title.value = ''
        description.value = ''
        dueDate.value = ''
    } else {
        title.style.border = '1px solid red'
        description.style.border = '1px solid red'
        dueDate.style.border = '1px solid red'
        title.placeholder='Add new...!'
        description.placeholder='description...!'
        dueDate.placeholder='dueDate...!'
    
    }


    showText()
}
