const interface = {
    addClient: () =>
    {
        var parameters = [];
        for (elem of ['name', 'surname', 'email', 'postal_code', 'phone', 'nip'])
        {
            var field = document.getElementById(elem)
            if(!field.checkValidity())
            {
                alert("Wprowadzano niepoprawne dane! (" + elem + ")");
                return;
            }
            var value = $("#"+elem).val();
            if(!value)
            {
                alert("Należy wypełnić wszystkie pola!");
                return;
            }
            parameters.push(value);
        }
        var result = database.addClient(...parameters)
        if (result == 0)
        {
            interface.clearInputForm();
            interface.refreshTable();
        }
        else
        {
            alert("Wystąpił błąd przy dodawaniu klienta do bazy danych!");
        }
    },

    editClient: (clientID) => {
        var data = {};
        data.name = $('#name_' + clientID).text();
        data.surname = $('#surname_' + clientID).text();
        data.email = $('#email_' + clientID).text();
        data.postal_code = $('#postal_code_' + clientID).text();
        data.phone = $('#phone_' + clientID).text();
        data.nip = $('#nip_' + clientID).text();

        const result = database.editClient(clientID, data);
        if(result != 0)
        {
            alert("Wystąpił błąd przy aktualizacji danych klienta!");
        };
        interface.refreshTable();
    },

    deleteClient: (clientID) => {
        const result = database.deleteClient(clientID);

        if(result == 0)
        {
            interface.refreshTable();
        }
        else 
        {
            alert("Wystąpił błąd przy usuwaniu klienta z bazy danych!");
        };
    },

    clearClients: () => {
        if (confirm("Czy aby na pewno chcesz wyczyścic całą bazę danych?")) 
        {
            const result = database.clearClients();
            if(result != 0)
            {
                alert("Wystąpił błąd przy czyszczeniu bazy danych!");
            }
            else
            {
                interface.refreshTable();
                alert("Baza danych wyczyszczona.");
            }
        }
    },

    clearInputForm: () => {
        $('#name').val("");
        $('#surname').val("");
        $('#email').val("");
        $('#postal_code').val("");
        $('#phone').val("");
        $('#nip').val("");
    },

    refreshTable: () => {
        $('.client').remove();
        const result = database.toHTMLTable();
    },

    filterTable: () => {
        let filter = new Map([
            ['id', $('#search-keyword-id').val()],
            ['name', $('#search-keyword-name').val()],
            ['surname', $('#search-keyword-surname').val()],
            ['email', $('#search-keyword-email').val()],
            ['postal_code', $('#search-keyword-postal_code').val()],
            ['phone', $('#search-keyword-phone').val()],
            ['nip', $('#search-keyword-nip').val()]
          ]);
        $('.client').remove();
        const result = database.toHTMLTable(filter);
    }
}

