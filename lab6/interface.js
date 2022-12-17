const interface = {
    addClient: () =>
    {
        var name = $('#name').val();
        var surname = $('#surname').val();
        var email = $('#email').val();
        var postal_code = $('#postal_code').val();
        var phone = $('#phone').val();
        var nip = $('#nip').val();

        if (!name || !surname || !email || !postal_code || !phone || !nip)
        {
            alert("Należy wypełnić wszystkie pola!");
            return;
        }

        var result = database.addClient(name, surname, email, postal_code, phone, nip)
        if (result == 0)
        {
            interface.clearInputForm();
            interface.refreshTable();
            alert("Dodano klienta do bazy danych!");
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
        if(result == 0)
        {
            alert("Dane klienta zaktualizowane!");
        }
        else 
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
            alert("Klient usunięty z bazy danych!");
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
        var keyword = $('#search-keyword').val();
        $('.client').remove();
        const result = database.toHTMLTable(keyword);
    }
}

