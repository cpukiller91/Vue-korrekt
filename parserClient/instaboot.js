 function sayHi() {
     var profile = {};
     var Data = {};
     $(".Y8-fY").each(function (e, i) {
         if(e == 0){
             profile[e] = {"post": $(this).find('.g47SY').text()};
         }
         if(e == 1){
             profile[e] = {"followers": $(this).find('.g47SY').text(),"triger": $(this).find('a').attr('href')};
         }
         if(e == 2){
             profile[e] = {"following": $(this).find('.g47SY').text(),"triger": $(this).find('a').attr('href')};
         }

     });
     var profileJSON = JSON.stringify(profile);

     $.ajax({
         method: "POST",
         url: "https://instabot.hosteam.pro/spisok-zavdan.html",
         data: {"getTask":1,"parent": document.querySelector('div.nZSzR > h2').textContent,"json":profileJSON}

     }).done(function (msg) {
         var task = JSON.parse(msg);


         document.querySelector("a[href='"+ task.send +"']").click();


         if(task.type){

             console.log($('a.FPmhX').length);
             if($('a.FPmhX').length > 0){

                 $('a.FPmhX').each(function (e, i) {
                     Data[e] = {"title": $(this).text(), "href": $(this).attr("href")};
                 });
                 console.log(Data);
                 var transfer = JSON.stringify(Data);
                 $.ajax({
                     method: "POST",
                     url: "https://instabot.hosteam.pro/spisok-zavdan.html",
                     data: {
                         "data": transfer,
                         "parent": document.querySelector('div.nZSzR > h2').textContent,
                         "followers-count":document.querySelector("a[href='"+ task.send +"'] > .g47SY").textContent,
                         "type": task.type
                     }

                 }).done(function (msg) {
                     document.querySelector('div.PZuss').innerHTML = "";
                     //document.querySelector("a[href='"+ task.send +"']").click();
                 });
             }

         }

         //var data = parse(msg);
         // data.each(function (task,item) {
         //     console.log(task);
         //     console.log(item);
         // });


     });

/*
     var Data = {};
     if($('a.FPmhX').length == 0){
         document.querySelector("a > .g47SY").click();
     }else{
         $('a.FPmhX').each(function (e, i) {
             Data[e] = {"title": $(this).text(), "href": $(this).attr("href")};
             //
             //Data.href = $( this ).attr("href");
         });

         var transfer = JSON.stringify(Data);

         $.ajax({
             method: "POST",
             url: "https://instabot.hosteam.pro/spisok-zavdan.html",
             data: {
                 "followers": transfer,
                 "parent": document.querySelector('div.nZSzR > h2').textContent,
                 "followers-count":document.querySelector("a > .g47SY").textContent}

         }).done(function (msg) {

             if(msg == "followers"){
                 document.querySelector('div.PZuss').innerHTML = "";
                 document.querySelector("a > .g47SY").click();
                 console.log(typeof msg);
                 console.log( msg);
             }

         });

         // console.log(Data);
         // console.log($('a.FPmhX'));
     }
*/
     //

}

setInterval(sayHi, 8000);
 // setTimeout(sayHi, 3000);

$( document ).ready(function() {


    if(window.location.pathname == "/"){
        window.location.href = $("a.gmFkV").attr("href");
    }



});