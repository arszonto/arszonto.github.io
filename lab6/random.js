function fill_with_random_data() {
    document.getElementById('name').value="Frank";
    document.getElementById('surname').value="Underwood";
    document.getElementById('email').value="test@edu.p.lodz.pl";
    document.getElementById('postal_code').value="90-149";
    document.getElementById('nip').value="111-222-33-44";
    document.getElementById('phone').value="666-213-711";
}

function generate_random_data() {
    database.addClient("Immanuel", "Kant", "neokantyzm@filozofuj.tk", "22-777", "554-321-111", "215-842-31-21");
    database.addClient("Lech", "Niewałęsa", "agent@bolek.ussr", "01-020", "111-222-333", "215-842-31-21");
    database.addClient("Czesław", "Michniewicz", "czesio@pzpn.com", "00-711", "711-711-711", "711-711-00-00");
    database.addClient("Cory", "Itrevor", "trailerpark@boys.com", "15-431", "132-322-111", "433-423-13-11");
    interface.refreshTable();
    alert("Dodano testowe dane do tabeli.");
}
