window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Brak wsparcia dla IndexDB w przeglądarce.")
};

const clientData = [];

var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function (event) 
{
    console.log("error: ");
};

request.onsuccess = function (event) 
{
    db = request.result;
    console.log("success: ", db);
    loadTable();
};

request.onupgradeneeded = function (event) 
{
    var db = event.target.result;
    var objectStore = db.createObjectStore("client", { keyPath: "id", autoIncrement: true});

    for (var i in clientData) 
    {
        objectStore.add(clientData[i]);
    }
}

function loadTable() {
    var clients = "";
    $('.client').remove();

    var objectStore = db.transaction("client").objectStore("client");
    console.log(objectStore.autoIncrement);
    objectStore.openCursor().onsuccess = function (event) 
    {
        var cursor = event.target.result;
        if (cursor) 
        {
            clients = clients.concat(
                '<tr class="client">' +
                '<td class="id">' + cursor.key + '</td>' +
                '<td class="name" ' + 'id=name_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.name + '</td>' +
                '<td class="surname" ' + 'id=surname_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.surname + '</td>' +
                '<td class="email" ' + 'id=email_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.email + '</td>' +
                '<td class="postal_code" ' + 'id=postal_code_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.postal_code + '</td>' +
                '<td class="phone" ' + 'id=phone_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.phone + '</td>' +
                '<td class="nip" ' + 'id=nip_' + + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.nip + '</td>' +
                '<td class="operations">' +
                '<button class="table-button-delete" id="remove_button" onclick="deleteClient(' + cursor.key +')">Usun</button>' + 
                '<button class="table-button-edit" id="edit_button" onclick="editClient(' + cursor.key +')">Edytuj</button>' + 
                '</td>' +
                '</tr>');
            cursor.continue();
        } 
        else 
        {
            $('thead').after(clients);
        }
    };
}

function addClient(name, surname, email, postal_code, phone, nip)
{
    var request = db.transaction(["client"], "readwrite")
        .objectStore("client")
        .add({
            name: name,
            surname: surname,
            email: email,
            postal_code: postal_code,
            phone: phone,
            nip: nip
        });


    request.onsuccess = function (event) 
    {
        return(0);
    };

    request.onerror = function (event) 
    {
        return(1);
    }
}

function interface_addClient() 
{
    var name = $('#name').val();
    var surname = $('#surname').val();
    var email = $('#email').val();
    var postal_code = $('#postal_code').val();
    var phone = $('#phone').val();
    var nip = $('#nip').val();

    if (!name || !surname || !email || !postal_code || !phone || !nip)
    {
        alert("Nalezy wypelnic wszystkie pola!");
        return;
    }

    if (addClient(name, surname, email, postal_code, phone, nip) == 0)
    {
        clearButtons();
        loadTable();
        alert("Dodano klienta do bazy danych!");
    }
    else
    {
        alert("Wystapil blad przy dodawaniu klienta do bazy danych!");
    }
}

function deleteClient(clientID) {
    var request = db.transaction(["client"], "readwrite")
        .objectStore("client")
        .delete(clientID);

    request.onsuccess = function (event) {
        loadTable();
        clearButtons();
        alert("Usunieto wpis z bazy danych.");
    };
};

function editClient(clientID) {
    const objectStore = db.transaction(["client"], "readwrite").objectStore("client");
    const request = objectStore.get(clientID);

    request.onerror = function (event) {
        loadTable();
        alert("Wystapil blad przy aktualizacji danych!");
    }

    request.onsuccess = function (event) {
        var data = event.target.result;
        data.name = $('#name_' + clientID).text();
        data.surname = $('#surname_' + clientID).text();
        data.email = $('#email_' + clientID).text();
        data.postal_code = $('#postal_code_' + clientID).text();
        data.phone = $('#phone_' + clientID).text();
        data.nip = $('#nip_' + clientID).text();

        const requestUpdate = objectStore.put(data);
        requestUpdate.onerror = (event) => {
            loadTable();
            alert("Wystapil blad przy aktualizacji danych!");
        };
        requestUpdate.onsuccess = (event) => {
            loadTable();
            alert("Dane klienta zaktualizowane!");
        };
    };
}

function clearButtons() {
    $('#name').val("");
    $('#surname').val("");
    $('#email').val("");
    $('#postal_code').val("");
    $('#phone').val("");
    $('#nip').val("");
};
