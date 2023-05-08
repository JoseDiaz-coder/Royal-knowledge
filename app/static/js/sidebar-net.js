//hacer clic en seccion y desplegar submenu acordeon
(function(){
 const listElements = document.querySelectorAll('.link');
 const addClick = (e)=> {
     listElements.forEach(element =>{
         element.addEventListener('click', (e)=>{
             let submenu = element.children[1];
             let height = 0;
             element.classList.toggle('active');
             if (submenu.clientHeight === 0){
                 height = submenu.scrollHeight;
                 console.log(height)
             }
             submenu.style.height = '${height}px';

         });
     });
 }
    addClick();
})();

//hacer clic al titulo y que cambie en el video principal
let accordionElements = document.querySelectorAll('.title');

accordionElements.forEach(vid =>{
    vid.addEventListener('click',  (e) =>{
        e.stopPropagation();
  accordionElements.forEach(remove =>{remove.classList.remove('active')});
      vid.classList.add('active');
        let title = vid.querySelector('li.title a').innerHTML;
        document.querySelector(' .main-video-title').innerHTML = title;
      window.scrollTo(0,0);
    });
});

