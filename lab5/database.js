const database = {
    clientData: [],
    engine: undefined,

    initialize: () => {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            window.alert("Brak wsparcia dla IndexDB w przeglądarce.")
        };

        var request = window.indexedDB.open("newDatabase", 1);

        request.onerror = function (event) 
        {
            console.log("Database setup failure.");
            alert("Nie można uruchomić bazy danych!");
        };

        request.onsuccess = function (event) 
        {
            database.engine = request.result;
            database.updateTableData();
            console.log("Database succesfuly loaded.");
        };

        request.onupgradeneeded = function (event) 
        {
            var engine = event.target.result;
            var objectStore = engine.createObjectStore("client", {keyPath: "id", autoIncrement: true});

            for (var i in clientData) 
            {
                objectStore.add(clientData[i]);
            }
        }
    },

    addClient: (name, surname, email, postal_code, phone, nip) => {
        const objectStore = database.engine.transaction(["client"], "readwrite").objectStore("client");
        const request = objectStore.add({
            name: name,
            surname: surname,
            email: email,
            postal_code: postal_code,
            phone: phone,
            nip: nip
        });

        var status = 0;
        request.onerror = function (event) 
        {
            console.log("Could not add client to the database.");
            status = 1;
        }
        return status;
    },

    deleteClient: (clientID) => {
        const objectStore = database.engine.transaction(["client"], "readwrite").objectStore("client");
        var request = objectStore.delete(clientID);
        
        var status = 0;
        request.onerror = function (event) 
        {
            console.log("Could not remove client from the database.");
            status = 1;
        }
        return status;
    },
    
    editClient: (clientID, newData) => {
        const objectStore = database.engine.transaction(["client"], "readwrite").objectStore("client");
        const request = objectStore.get(clientID);

        var status = 0;
    
        request.onsuccess = function (event) {
            var data = event.target.result;
            data.name = newData.name;
            data.surname = newData.surname;
            data.email = newData.email;
            data.postal_code = newData.postal_code;
            data.phone = newData.phone;
            data.nip = newData.nip;

            var requestUpdate = objectStore.put(data);
            requestUpdate.onerror = (event) => {
                status = 1;
            };
        };

        request.onerror = function (event) {
            status = 1;
        }
        return status;
    },

    clearClients: () => {
        var objectStore = database.engine.transaction(["client"], "readwrite").objectStore("client");
        const request = objectStore.clear();

        var status = 0;
        request.onerror = function (event) {
            status = 1;
        }
        return status;
    },

    updateTableData: () => {
        var clients = "";
        const objectStore = database.engine.transaction("client").objectStore("client");
        const request = objectStore.openCursor();
        var status = 0;
        request.onsuccess = function (event) 
        {
            var cursor = event.target.result;
            if (cursor) 
            {
                clients = clients.concat(
                    '<tr class="client">' +
                    '<td class="id">' + cursor.key + '</td>' +
                    '<td class="name" ' + 'id=name_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.name + '</td>' +
                    '<td class="surname" ' + 'id=surname_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.surname + '</td>' +
                    '<td class="email" ' + 'id=email_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.email + '</td>' +
                    '<td class="postal_code" ' + 'id=postal_code_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.postal_code + '</td>' +
                    '<td class="phone" ' + 'id=phone_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.phone + '</td>' +
                    '<td class="nip" ' + 'id=nip_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.nip + '</td>' +
                    '<td class="operations">' +
                    '<button class="table-button color-delete" id="remove_button" onclick="interface.deleteClient(' + cursor.key +')">Usuń</button>' + 
                    '<button class="table-button color-edit" id="edit_button" onclick="interface.editClient(' + cursor.key +')">Edytuj</button>' + 
                    '</td>' +
                    '</tr>'
                );
                cursor.continue();
            }
            else
            {
                $('thead').after(clients);
            }
        };
        request.onerror = function (event)
        {
            status = 1;
        }
    },

    filterTableData: (filteredEntries) => {
        var clients = "";
        const objectStore = database.engine.transaction("client").objectStore("client");
        const request = objectStore.openCursor();
        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) 
            {
                const results = [
                    cursor.value.name.indexOf(keyword),
                    cursor.value.surname.indexOf(keyword),
                    cursor.value.email.indexOf(keyword),
                    cursor.value.postal_code.indexOf(keyword),
                    cursor.value.phone.indexOf(keyword),
                    cursor.value.nip.indexOf(keyword)
                ];
                const checkSearchResults = (element) => element !== -1;
                if (results.some(checkSearchResults)) {                
                    console.log("Found matching entry:" + JSON.stringify(cursor.value));
                    clients = clients.concat(
                        '<tr class="client">' +
                        '<td class="id">' + cursor.key + '</td>' +
                        '<td class="name" ' + 'id=name_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.name + '</td>' +
                        '<td class="surname" ' + 'id=surname_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.surname + '</td>' +
                        '<td class="email" ' + 'id=email_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.email + '</td>' +
                        '<td class="postal_code" ' + 'id=postal_code_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.postal_code + '</td>' +
                        '<td class="phone" ' + 'id=phone_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.phone + '</td>' +
                        '<td class="nip" ' + 'id=nip_' + cursor.key + ' ' + 'contentEditable="true">' + cursor.value.nip + '</td>' +
                        '<td class="operations">' +
                        '<button class="table-button color-delete" id="remove_button" onclick="interface.deleteClient(' + cursor.key +')">Usuń</button>' + 
                        '<button class="table-button color-edit" id="edit_button" onclick="interface.editClient(' + cursor.key +')">Edytuj</button>' + 
                        '</td>' +
                        '</tr>'
                    );
                }
                cursor.continue();
            }
            else
            {
                $('thead').after(clients);
            }
        };

    }
}