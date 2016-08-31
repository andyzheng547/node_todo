$('#create-todo').submit( (e) => {
  e.preventDefault();

  $.ajax({
    method: 'POST',
    url: '/todos',
    data: $(e.target).serialize()
  });
});

$('.toggle-update').click( (e) => {
  e.preventDefault();
  var id = $(e.target).data('id');

  $(e.target).toggle();
  $('#todo_' + id).toggle();
  $('.update-todo[data-id=' + id + ']').toggle();
});

$('.update-todo').submit( (e) => {
  e.preventDefault();
  var id = $(e.target).data('id');

  $.ajax({
    method: 'PUT',
    url: '/todos/' + id,
    data: $(e.target).serialize()
  });

  $(e.target).toggle();
  $('#todo_' + id).toggle();
  $('.toggle-update[data-id=' + id + ']').toggle();
});


$('.delete-todo').click( (e) => {
  e.preventDefault();
  var id = $(e.target).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/todos/' + id
  });

  $('.todo[data-id=' + id + ']').remove();
});
