function fill_with_random_data() {
    document.getElementById('name').value="Frank";
    document.getElementById('surname').value="Underwood";
    document.getElementById('email').value="test@edu.p.lodz.pl";
    document.getElementById('postal_code').value="90-149";
    document.getElementById('nip').value="111-222-33-44";
    document.getElementById('phone').value="666-213-711";
}

function generate_random_data() {
    addClient("Bożydar", "Więckowski", "lore@ipsum.com", "22-777", "554-321-111", "215-842-31-21");
    addClient("Andrzej", "Nieduda", "dlugipis@gov.com", "01-020", "111-222-333", "215-842-31-21");
    addClient("Czesław", "Michniewicz", "czesio@pzpn.com", "00-711", "711-711-711", "711-711-00-00");
    loadTable();
    alert("Dodano testowe dane do tabeli.");
}
