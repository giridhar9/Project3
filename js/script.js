$(document).ready(function(){
  $('#more').hide();
  $('#gif').hide();
  $('.fancybox').fancybox();
 
$(function(){
         var tagData,
         nextData,
         tagItems,
         tagName,
         instagramUrl,
         tagItems2,
         nextUrl,
         loadB,
         $tagList = $('.tag-list');
    $('#tag-name-item').on('click', function(event) {
            event.preventDefault();
      // reset all the things
           $('#search').toggle();
           $('#more').show();
           $('#gif').show();
           $tagList.empty();
           tagData, tagItems = '',
      // get the search string
           tagName = $('#tag-name').val().replace(/ /g, '+'),
           instagramUrl= 'https://api.instagram.com/v1/tags/'+tagName+'/media/recent?count=12&client_id=a22c00bd31ca48e8b3dfc67b51b44262';
            $.ajax({
            method: 'GET',
            url: instagramUrl,
            dataType: 'jsonp'
      })

            .done(function(data) {
              nextUrl = data.pagination.next_url;
             tagData = data.data;
             if ( tagData.length !== 0 ) {
              $('#gif').hide('slow');
              $.each(tagData, function(key, value) {
                

               tagItems += '<li>';
               tagItems += '<div class="total">';
               tagItems += '<div id="pic">';
               tagItems += '<a href="'+ value.images.standard_resolution.url +'" class="fancybox" rel="gallery">';
               tagItems += '<img src="' + value.images.standard_resolution.url + '" />';
               tagItems += '</a>';
               tagItems += '</div>';
               tagItems += '<div class="container">';
               tagItems += '<div class="item1">';
               tagItems += '<img class="rounded" src="' + value.caption.from.profile_picture + '" />';
               tagItems += '</div>';
               tagItems += '<ul class="item2">';
               tagItems += '<li>' +value.caption.from.username+ '</li>';
               tagItems += '<li class="ico">';
               tagItems += '<i class="fa fa-heart"></i>' +value.likes.count+ ' ';
               tagItems += '<i class="fa fa-comments"></i>' +value.comments.count;
               tagItems += '</li>';
               tagItems += '</ul>';
               tagItems += '</div>';
               tagItems += '</div>';
               tagItems += '</div>';
               tagItems += '</li>';
                
            }); 
          
           $('#more').on('click',function(event){
             event.preventDefault();
             tagItems2 = '',
             
               $.ajax({
            method: 'GET',
            url: nextUrl,
            next_max_id: "13872296",
            dataType: 'jsonp'
            })
           
             .done(function(dat){
               tagData = dat.data;
               nextUrl = dat.pagination.next_url;
               $('#lmore').toggle();
               if (tagData.length!==0){
                $.each(tagData,function(key,value){
               tagItems2 += '<li>';
               tagItems2 += '<div class="total">';
               tagItems2 += '<div id="pic">';
               tagItems2 += '<a href="'+ value.images.standard_resolution.url +'" class="fancybox" rel="gallery">';
               tagItems2 += '<img src="' + value.images.standard_resolution.url + '" />';
               tagItems2 += '</a>';
               tagItems2 += '</div>';
               tagItems2 += '<div class="container">';
               tagItems2 += '<div class="item1">';
               tagItems2 += '<img class="rounded" src="'+value.user.profile_picture+'" />';
               tagItems2 += '</div>';
               tagItems2 += '<ul class="item2">';
               tagItems2 += '<li>'+value.caption.from.username+'</li>';
               tagItems2 += '<li class="ico">';
               tagItems2 += '<i class="fa fa-heart"></i>' +value.likes.count+ ' ';
               tagItems2 += '<i class="fa fa-comments"></i>' +value.comments.count;
               tagItems2 += '</li>';
               tagItems2 += '</ul>';
               tagItems2 += '</div>';
               tagItems2 += '</div>';
               tagItems2 += '</div>';
               tagItems2 += '</li>';

             });
               
               }
               $tagList.append(tagItems2);
               $('#lmore').show();

             })

            })
          }
       

       else {
            $('#gif').hide('slow');
            tagItems += '<p class="not-found">Sorry, artist not found.</p>';
         }
         $tagList.append(tagItems);
      })
      // and if it fails...
      .fail(function() {
        event.preventDefault();
        $('#gif').hide('slow');
        $tagList.append('<li class="try-again">Sorry! There was a problem, please try again.</li>');

      });
   });
});
});