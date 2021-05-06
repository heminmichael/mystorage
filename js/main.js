$(document).ready(function (){
  $('.like').click(function (e){
    e.preventDefault();

    var like = e.target.previousElementSibling == null;
    var postid = e.target.parentNode.dataset['postid'];
    var data = {
      isLike: like,
      post_id: postid
    }
    console.log(e);

    axios.post('/like',data).then(response => {
      $("[data-postid='" + response['data']['post_id'] + "' ] > .bg-dark").attr('class','btn btn-link like')
      e.currentTarget.className = 'btn btn-link like bg-dark';
    })

  });
});

$(document).ready(function (){
  $('.apply').click(function (e){
    e.preventDefault();

    var like = e.target.previousElementSibling == null;
    var postid = e.target.parentNode.dataset['postid'];
    var data = {
      isLike: like,
      post_id: postid
    }
    console.log(e);

    axios.post('/apply',data).then(response => {
      $("[data-postid='" + response['data']['post_id'] + "' ] > .bg-light").attr('class','btn btn-outline-info apply')
      e.currentTarget.className = 'btn btn-outline-info apply bg-light';
    })

  });
});
