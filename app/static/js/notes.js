$(function(){

$(document).on('submit', '#note-form', function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/cursos/introduccion-a-la-programacion',
        data:{
          note:$("#description").val()
        },
        success:function()
        {
          alert('saved');
        }
    })
});
});
