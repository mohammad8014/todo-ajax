showText()

let datarevers
function showText() {



    let myUr = "https://61895f90d0821900178d7971.mockapi.io/todos"
    let response = fetch(myUr);

    response
        .then((data) => {
            if (data.status === 200) {
                return data.json();
            } else {
                throw new Error("We Have an error");

            }
        })
        .then((data) => {
         datarevers=data.reverse()

            displayList(datarevers,list_Element,rows,current_Page)
            stopPagination(datarevers,pagination_Element,rows)
            
        })


        .catch(err => {
            console.log(err);
        })




}

function pagination(){
    

}

// pagination

let list_Element=document.getElementById('list')
let pagination_Element=document.getElementById('pagination')

let current_Page=1
let rows=4

function displayList(items,wraper,rows_page,page){
    wraper.innerHTML=''
    page--
    let content = ``
    let start=rows_page*page
    let end=start+rows_page
    let paginationItems=items.slice(start,end)
    for(let i =0;i<paginationItems.length;i++){


        content +=`
        <div class="allbox  p-1  " >

        <li class="item    d-flex justify-content-between  ">
   
        <p>
        `
       if (paginationItems[i].checked == true) {
           content += `<input id="checkid" class="me-1 mt-2 form-check-input shadow rounded" type="checkbox"  onclick="check(${paginationItems[i].checked},${paginationItems[i].id})" checked >`
       }
       else {
           content += `<input id="checkid" class=" me-1 mt-2 form-check-input shadow rounded" type="checkbox" onclick="check(${paginationItems[i].checked},${paginationItems[i].id})" >`
       }

       content += `
        <span class='fs-5'>${paginationItems[i].title}</span>
        <span class='mx-5'style="color: rgb(119, 119, 111);">${paginationItems[i].dueDate}</span>

        </p>
        <span>
        <img src="./icons/icons8-pencil-64.png" style="margin-right: 20px; width: 20px; cursor: pointer;" alt="edit" onclick='edittask(${paginationItems[i].id})'>
        <img src="./icons/icons8-trash-can.svg" style="margin-bottom: 4px; width: 20px; cursor: pointer;" alt="bin" onclick='deliteitem(${paginationItems[i].id})'>
        </span>

        </li>
           <p class="fs-6 text-black-50">${paginationItems[i].description}</p>

        </div>`


    }
    wraper.innerHTML=content

}

function stopPagination(items,wraper,rows_page){
    wraper.innerHTML=''

    let page_count=Math.ceil(items.length / rows_page)
    for(let i=1;i<page_count+1;i++){
       let btn= paginationButton(i,items)
       wraper.appendChild(btn)

    }
}

function paginationButton(page,items){
    let button=document.createElement('button')
    button.innerText=page

    if(current_Page == page)button.classList.add('active')
    

    button.addEventListener('click',function(){
        current_Page=page
        displayList(items,list_Element,rows,current_Page)


        let current_btns=document.querySelector('.pagination button.active')
        current_btns.classList.remove('active')
        
        button.classList.add('active')
    })

    return button
}


// delete

function deliteitem(andis) {
    if (confirm('Delete the list?')) {

        fetch("https://61895f90d0821900178d7971.mockapi.io/todos/" + andis, {
            method: 'DELETE'
        })
        alert("Deleted Succefully")
        showText()
        
    }


}






// check

function check(checke,idcheck) {

    let ch = true
    if (checke === true) {
        ch = false
    }

    fetch("https://61895f90d0821900178d7971.mockapi.io/todos/"+idcheck, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({

            "checked": ch

        })
    })

    
}


// edit 

function edittask(editid){
window.location.href="http://127.0.0.1:5500/index.html?id=" + editid

}















