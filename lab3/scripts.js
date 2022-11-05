let current_elem = null

const draggable_ol = Array.from(document.querySelectorAll('.draggable-li'));

draggable_ol.forEach(elem => {

  elem.addEventListener('dragstart', (event) => {
    current_elem = elem;
    });

    elem.addEventListener('dragover', (event) => {
        event.preventDefault();

        const other_elems = draggable_ol.filter(elem => elem !== current_elem)

        const next_elem = other_elems.reduce((neighbour, valid) => {
            const rect = other_elems.getBoundingClientRect();
            const offset = event.clientY - rect.top - rect.height / 2;
            return (offset < 0 && offset > neighbour.offset) ? { offset: offset, element: valid } : neighbour;
        }, Number.NEGATIVE_INFINITY).element;

        if (next_elem !== null) {
          document.getElementById('draggable-ol').insertBefore(current_elem, next_elem);
        }
    });

    elem.addEventListener('dragend', (event) => {
    });
});