window.addEventListener('load',function(e){

    let FriendButton = document.querySelector(".friends")
    let biglist = ``
    let Content = document.querySelector(".content")

    let appData =[]
    let FriendData = ``

    
    FriendButton.addEventListener('click', function(e){
        Content.innerHTML = ''
        fetch('friends/friends.json').then(response => response.json()).then(json => {appData = json; otherstuff()}).catch(error => this.console.log(error))
    })
    function otherstuff(){
        let list = ``
        appData.forEach(item =>{

            list += `<li class="pure-menu-item" ><a id="${item.id}" class="pure-menu-link">${item.firstName} ${item.lastName}</a></li>`
        })
        biglist = `<ul class="pure-menu-list" id ="FriendList">${list}</ul>`
        let fragment = document.createDocumentFragment()
        fragment.appendChild(document.createElement("div"))
        fragment.querySelector("div").innerHTML = biglist
        fragment.querySelectorAll("li").forEach(item =>{
            item.addEventListener('click', function(e){
                fetch(`friends/${e.target.id}.json`).then(response => response.json()).then(json => {FriendData = json; FriendPage()}).catch(error => this.console.log(error))
            })
        })
        Content.appendChild(fragment.getElementById("FriendList"))
        
    }
    function FriendPage(){
        const FriendInfo = `<div class="friend">
        <div class="identity">
            <img src="img/${FriendData.avatar}" class="photo" />
            <h2 class="name">${FriendData.firstName} ${FriendData.lastName}</h2>
            <ul>
                <li><span class="label">email:</span> ${FriendData.email}</li>
                <li><span class="label">hometown:</span> ${FriendData.hometown}</li>
            </ul>
        </div>
        <p class="bio">
        ${FriendData.bio}
        </p>
    </div>`
    Content.innerHTML = FriendInfo
    }
})

