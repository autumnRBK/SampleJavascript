window.addEventListener("load",function(e){
const Tags = Array.from(document.querySelectorAll(".tags"))
const TagSearch = document.getElementById("filter")
const Reset = document.querySelector(".reset")
Array.from(document.querySelectorAll(".tags"))

TagSearch.addEventListener("input", OnSearchFilter)
Reset.addEventListener('click', OnResetClick)
function OnSearchFilter(evt){
    if (TagSearch.value === "") {
        Reset.classList.add("hidden")
    }else{
        Reset.classList.remove("hidden")
    }
    Tags.forEach(function(element){
            if (!element.textContent.includes(TagSearch.value)) {
                element.parentElement.classList.add("hidden")
            }else{
                element.parentElement.classList.remove("hidden")
            }
    })
}
function OnResetClick(evt){
    Reset.classList.add("hidden")
    TagSearch.value = ""
    Tags.forEach(function(element){
     element.parentElement.classList.remove("hidden")
        
})
}
})