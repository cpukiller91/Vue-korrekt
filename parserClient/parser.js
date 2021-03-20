
$( document ).ready(function() {
    //var url = "https://de.korrekt.com.ua";
    var url = "https://ua.korrekt.com.ua";
    //console.log(url+"parser_task_controllers");
    $.ajax({
        method: "GET",
        url: url+"/task-lists/mode",
        //data: {"get-status": 1}

    }).done(function (msg) {
        //var transfer = JSON.parse(msg);
        //console.log( msg[0]);
        //console.log(transfer);
        if(msg.mode == "map") {

            var Link = $(".article-items").find(".article").find(".description").find("h2").find("a");

            var Data = {};
            Link.each(function (e, i) {
                Data[e] = {"title": $(this).text(), "url": $(this).attr("href"),"parser_status":0};
                //
                //Data.href = $( this ).attr("href");
            });
            var transfer = JSON.stringify(Data);
            //console.log( "----" );
            //console.log(transfer);

            $.ajax({
                method: "POST",
                url: url+"/products/add",
                data: transfer,
                dataType: 'json',
                contentType: 'application/json',
                success: function(){
                    $( "body" ).append( "<button id='target' style='position: absolute;top: 0;left: 0;z-index: 100000;width: 100px;height: 36px;'>Следующая</button>");
                }
            });
            //     .done(function (msg) {
            //     $( "body" ).append( "<button id='target' style='position: absolute;top: 0;left: 0;z-index: 100000;width: 100px;height: 36px;'>Следующая</button>");
            //     // var step = $.cookie('step');
            //     // var offset = 100;
            //     // //location.href = 'https://webshop.schachermayer.com/cat/de-AT/products/druecker/10000_394_1?max=100&offset='+(offset*step);
            //     // //$.cookie('step', step++);
            //     // //alert("Data Saved: " + step);
            //     // $.cookie('step', parseInt($.cookie('step')) + 1);
            // });
        }

        if(msg.mode == "product") {

            $( "body" ).append( "<button id='target' style='position: absolute;top: 0;left: 0;z-index: 100000;width: 100px;height: 36px;'>Следующая</button>" +
                "<script type='text/javascript'>" +
                "function explode(){\n" +
                "  $('#target').click();\n" +
                "}\n" +
                "setTimeout(explode, 1000000);</script>" );

            $( "#target" ).click(function() {
                $.ajax({
                    method: "GET",
                    url: url+"/products/get-active"

                }).done(function (msg) {

                    if(location.pathname != msg.url){
                        console.log(msg);
                        //console.log(obj.domain+obj.url);
                        location.href = msg.url;
                    }

                });
                //alert( "Handler for .click() called." );
            });

           if($(".article-pagination").length == 0){



               var Link = $(".root").find("li").find("a");
               var Data = {};
               Link.each(function (e, i) {
                   Data[e] = {"title": $(this).text(), "href": $(this).attr("href")};
               });
               var parent = JSON.stringify(Data);
               var Img = $(".slide-element-article").find("img");
               var DataIMG = {};
               Img.each(function (ei, i) {
                   DataIMG[ei] = $(this).attr("data-large-src");
               });
               var Prop = $(".features").find("ul").find("li");
               var DataProp = {};
               Prop.each(function (ei, i) {
                   var type = $(this).find("b").text();
                   $(this).find("b").detach();
                   DataProp[ei] = {"title": type, "val": $(this).text()}
               });
               var propArt = $(".col-xl-push-3").find(".row").find("p");
               $(".other-bought-articles").html("");
               $(".references").html("");
               // console.log(propArt.text());
               // console.log(DataIMG);
               // console.log(Link);
               $.ajax({
                   method: "POST",
                   url: url+'/products/detail',
                   dataType: 'json',
                   contentType: 'application/json',
                   data: JSON.stringify({
                       "key_url" : location.pathname,
                       "parent":parent,
                       "IMG":JSON.stringify(DataIMG),
                       "prop":JSON.stringify(DataProp),
                       "propATR":propArt.text(),
                       "price":$(".basket").find(".amount").text(),
                       "desc":$(".hidden-sm.article-description").text()})

               }).done(function (msg) {
                   $( "#target" ).click();
                   if(msg.length > 1) {

                       location.href = 'https://webshop.schachermayer.com'+msg;
                   }

               });
           }
        }


    });


});