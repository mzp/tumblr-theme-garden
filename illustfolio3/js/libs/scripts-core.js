$(document).ready(function(){

  // タグリスト記事出す
  (function() {
    var posts = new TumblrPosts({
      // ドメインと取得する最大記事数
      domain: location.host,
      maxNum:300
    });
    posts.bind(posts.EVENT_COMPLETE, function(e) {
      var that = this;
      // getTags() でタグリストを取得
      $.each(this.getTags(), function(i, tag) {
        var html = '<li class="level' + (tag.count % 6 + 1) + '">'
        + '<a href="/tagged/' + tag.name + '">' + tag.name + '</a></li>';
        $(html).appendTo($("ul#tags"));
      });
    });
    posts.run();
  })();

  // text投稿のyoutubeもレスポンシブにする
  $(".post.text iframe[src*='youtube.com']").wrap("<div class='video-iframe'></div>");
  $("iframe[src*='tumblr.com']").addClass("video-iframe");

  // fitvid
  $(".video-iframe").fitVids();

  $(".mobile-nav-panel").click(function(){
    $(".header-box-nav").slideToggle(200);
  });

  $(".header-tags a").click(function () {
    $(".tag-list").slideToggle(200);
    return false;
  });

  $(".tag-list .close").click(function () {
    $(".tag-list").slideToggle(200);
  });

  // laphs
  LivePhotos.initialize();

  // masonry
  var $indexwrapper = $('.index-post-wrapper').css({ opacity: 0 });
  $indexwrapper.imagesLoaded(function(){
    $indexwrapper.animate({ opacity: 1 });
    $indexwrapper.masonry({
      itemSelector: '.post'
    });
  });

  // infinite scroll
  $indexwrapper.infinitescroll({
    navSelector  : ".pagenation-index",
    nextSelector : ".pagenation-index .next",
    itemSelector : ".post",
    animate      : false,
    loading: {
        img: "//static.tumblr.com/xlsgtjb/V4Zne2alt/blank.gif",
        msgText: "<div class='spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>",
        finishedMsg: ''
      }
    }, function( newElements ) {
      var $newElems = $( newElements ).css({ opacity: 0 });
      $newElems.imagesLoaded(function(){
        $indexwrapper.animate({ opacity: 1 });
        $indexwrapper.masonry( 'appended', $newElems, true );
      });
    }
  );

  // 外部サイトにはtarget blankする
  $('a').each(function() {
    var a = this;
    if (a.origin !== location.origin) {
      $(a).attr('target', '_blank');
    }
  });

  $(window).load(function(){

    // スマホでphotosetの中をwidth100%にする
    if ($(window).width() < 760) {

      $('iframe.photoset').contents().find('.photoset_row').css({
        width : 'auto',
        height : 'auto',
        margin : '0'
      });

      $('iframe.photoset').contents().find('.photoset_photo').css({
        display : 'block',
        margin : '0 0 0 0'
      });

      $('iframe.photoset').contents().find('.photoset_row img').css({
        width : '100%',
        margin : '0 0 0 0'
      });

      $('iframe.photoset').css('height', $('iframe.photoset').contents().find('body').height() + 'px');

    }

  });


});
