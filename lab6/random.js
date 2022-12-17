function fill_with_random_data() {
    document.getElementById('name').value=random_name();
    document.getElementById('surname').value=random_surname();
    document.getElementById('email').value=random_email();
    document.getElementById('postal_code').value=random_postal_code();
    document.getElementById('nip').value=random_nip();
    document.getElementById('phone').value=random_phone();
}

function generate_random_data() {
    const entries = Math.floor(Math.random() * (6 - 3 + 1) + 3);
    for(var i = 0; i < entries; ++i)
    {
        database.addClient(random_name(), random_surname(), random_email(), random_postal_code(), random_phone(), random_nip());
    }
    interface.refreshTable();
    alert("Dodano testowe dane do tabeli.");
}

function random_name() {
    var re = new ReRegExp(/^[a-zA-Z]{4-12}$/, {
        extractSetAverage: true
    });
}

function random_email() {
    return Math.random().toString(36).substring(2,11) + '@' + Math.random().toString(36).substring(2,6) + '.com';
}

function random_postal_code()
{
    var number = Math.random().toString();
    return number.slice(2,4) + "-" + number.slice(4,7);
}

function random_phone()
{
    var number = Math.random().toString();
    return number.slice(2,5) + "-" + number.slice(5,8) + "-" + number.slice(8,11);
}

function random_nip()
{
    var number = Math.random().toString();
    return number.slice(2,5) + "-" + number.slice(5,8) + "-" + number.slice(8,10) + "-" + number.slice(10,12);
}

const names = ["Michael", "Christopher", "Jessica", "Matthew", "Ashley", "Jennifer", "Joshua", "Amanda", "Daniel", "David", "James", "Robert", "John", "Joseph", "Andrew", "Ryan", "Brandon", "Jason", "Justin", "Sarah", "William", "Jonathan", "Stephanie", "Brian", "Nicole", "Nicholas", "Anthony", "Heather", "Eric", "Elizabeth", "Adam", "Megan", "Melissa", "Kevin", "Steven", "Thomas", "Timothy", "Christina", "Kyle", "Rachel", "Laura", "Lauren", "Amber", "Brittany", "Danielle", "Richard", "Kimberly", "Jeffrey", "Amy", "Crystal", "Michelle", "Tiffany", "Jeremy", "Benjamin", "Mark", "Emily", "Aaron", "Charles", "Rebecca", "Jacob", "Stephen", "Patrick", "Sean", "Erin", "Zachary", "Jamie", "Kelly", "Samantha", "Nathan", "Sara", "Dustin", "Paul", "Angela", "Tyler", "Scott", "Katherine", "Andrea", "Gregory", "Erica", "Mary", "Travis", "Lisa", "Kenneth", "Bryan", "Lindsey", "Kristen", "Jose", "Alexander", "Jesse", "Katie", "Lindsay", "Shannon", "Vanessa", "Courtney", "Christine", "Alicia", "Cody", "Allison", "Bradley", "Samuel"];
function random_name()
{
    return names[Math.floor(Math.random() * names.length)];
}

const surnames = ["Chung", "Chen", "Melton", "Hill", "Puckett", "Song", "Hamilton", "Bender", "Wagner", "McLaughlin", "McNamara", "Raynor", "Moon", "Woodard", "Desai", "Wallace", "Lawrence", "Griffin", "Dougherty", "Powers", "May", "Steele", "Teague", "Vick", "Gallagher", "Solomon", "Walsh", "Monroe", "Connolly", "Hawkins", "Middleton", "Goldstein", "Watts", "Johnston", "Weeks", "Wilkerson", "Barton", "Walton", "Hall", "Ross", "Woods", "Mangum", "Joseph", "Rosenthal", "Bowden", "Underwood", "Jones", "Baker", "Merritt", "Cross", "Cooper", "Holmes", "Sharpe", "Morgan", "Hoyle", "Allen", "Rich", "Grant", "Proctor", "Diaz", "Graham", "Watkins", "Hinton", "Marsh", "Hewitt", "Branch", "O'Brien", "Case", "Christensen", "Parks", "Hardin", "Lucas", "Eason", "Davidson", "Whitehead", "Rose", "Sparks", "Moore", "Pearson", "Rodgers", "Graves", "Scarborough", "Sutton", "Sinclair", "Bowman", "Olsen", "Love", "McLean", "Christian", "Lamb", "James", "Chandler", "Stout", "Cowan", "Golden", "Bowling", "Beasley", "Clapp", "Abrams", "Tilley"];
function random_surname()
{
    return surnames[Math.floor(Math.random() * surnames.length)];
}
