let listElements = document.querySelectorAll('.link ');
let listInsideElements = document.querySelectorAll(' .title');

listElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
var panel = this.nextElementSibling;
        if (listElement.classList.contains('active')){
            listElement.classList.remove('active');
        }else{
            listElements.forEach (listE => {
                listE.classList.remove('active');
            })
            listElement.classList.toggle('active');
        }
    })
});


listInsideElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
var panel = this.nextElementSibling;
        if (listElement.classList.contains('active')){
            listElement.classList.remove('active');
        }else{
            listInsideElements.forEach (listE => {
                listE.classList.remove('active');
            })
            listElement.classList.toggle('active');
        }
    })
});

