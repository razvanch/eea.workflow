function make_publish_text(questions){
    var text = "";
    $(".question", questions).each(function(){
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
                    var questions_area = $(".questions", target);
                    // check if all required questions have been answered positively
                    $(".question", target).each(function(){
                        var q = this;
                        if ($(q).hasClass('required')){
                            var radio = $("input[value='yes']", q).get(0);
                            if (radio.checked !== true) {
                                $("h3", q).after("<div class='notice' style='color:red'>You need to answer with Yes on this question</div>");
                                $(".notice", q).effect("pulsate", {times:3}, 2000, function(){$('.notice', q).remove()});
                                return false;
                            }
                        }
                    });

                    var text = make_publish_text(questions_area);
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
                    var base = $("base").attr('href') || document.baseURI || window.location.href.split("?")[0];
                    var url = base + "/publish_dialog";
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
