function make_publish_text(questions){
    var text = "";
    $(".question", questions).each(function(){
        console.log(this);
        var title = $("h3", this).text();
        var answer = $(":radio[checked='true']", this).val();
        var comment = $("textarea", this).val();
        if (comment.length) {
            comment += "\n";
        }
        text += title + ": " + answer + "\n" + comment + "\n";
    });
    return text;
}

function set_publish_dialog(){
    $(".actionMenuContent a[title='Publish']").click(function(e){
        var target = $("<div>").appendTo("body").attr('id', 'publish-dialog-target')[0];

        $(target).dialog({
            title:"Confirm information before publishing",
            modal:true,
            resizable:true,
            width:600,
            height:400,
            buttons:{
                "Ok":function(){
                    var questions = $(".questions", target);
                    var text = make_publish_text(questions);
                    console.log($("textarea#comment", target));
                    $("textarea#comment", target).val(text);
                    $(questions).remove();
                    $("form", target).submit();
                    $(this).dialog("close");
                    return false;
                },
                "Cancel":function(){
                    $(this).dialog("close");
                }
            },
            open:function(ui){
                     console.log(document.baseURI);
                     var url = (document.baseURI || document.location.href) + "/publish_dialog";
                     $(this).load(url);
                     return false;
             }
        });
        return false;
    });
}

$(window).load(function(){
    set_publish_dialog();
});