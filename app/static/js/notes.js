$(function(){
$(document).on('submit', '#note-form', function(e){
    e.preventDefault();
    let formData = {
        title: $("#title-note").val(),
        note:$("#description").val(),
        
    }
    $.ajax({
        type:'POST',
        url:'/cursos/introduccion-a-la-programacion',
        data:datForm
        ,
        success:(response)=>{
            $('div#response').append(response.data)
        }
    })
});
});

$(function(){
$(document).on('submit', '#note-form', function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/cursos/delete/<int:id>,
        ,
        success:()=>{
        }
    })
});
});
