$(document).ready(function(){
  $('#more').hide();
  $('#gif').hide();
});
$(function(){
         var tagData,
         tagItems,
         tagName,
         instagramUrl,
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
             tagData = data.data;
             if ( tagData.length !== 0 ) {
              $('#gif').hide('slow');
              $.each(tagData, function(key, value) {
                tagItems += '<li>';
               tagItems += '<div class="total">';
               tagItems += '<div id="pic">';
               tagItems += '<img src="' + value.images.standard_resolution.url + '" />';
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

       }

       else {
            $('#search').toggle();
            tagItems += '<p style="margin-top: 18px;">Sorry, artist not found.</p>';
         }
         $tagList.append(tagItems);
      })
      // and if it fails...
      .fail(function() {
        $('#search').toggle();
         $tagList.append('<li>Sorry! There was a problem, please try again.</li>');

      });
   });
});
