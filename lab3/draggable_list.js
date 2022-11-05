function handleDragStart(event) {
  this.style.opacity = '0.25';
  currently_dragged_element = this;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(event) {
  this.style.opacity = '1.0';
  draggable_oi_elems.forEach(function (item) {
    item.classList.remove('over');
  });
}

function handleDragEnter(event) {
  this.classList.add('over');
}

function handleDragLeave(event) {
  this.classList.remove('over');
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragDrop(event) {
  event.stopPropagation();
  if (currently_dragged_element !== this) {
    currently_dragged_element.innerHTML = this.innerHTML;
    this.innerHTML = event.dataTransfer.getData('text/html');
  }
}

let draggable_oi_elems = document.querySelectorAll('.draggable-ol .draggable-li')

draggable_oi_elems.forEach(item => {
  item.addEventListener('dragstart', handleDragStart)
  item.addEventListener('dragend', handleDragEnd)
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragenter', handleDragEnter);
  item.addEventListener('dragleave', handleDragLeave);
  item.addEventListener('drop', handleDragDrop);
})
