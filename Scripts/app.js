//set up refreces to elements we know we are going to use
var transactions = data;
var results = d3.select('#results-body');

//Select Button w/event handler
var button = d3.select('#button');
button.on('click', displayResults);

//Select Input Box w/event handler
var inputBox = d3.select('#filter-input');
inputBox.on('keyup', displayResults);

createHeadders();
function createHeadders(){
    var tableHead = d3.select('#results-head');
    var tran = transactions[0];
    Object.keys(tran).forEach(key => {
        var cell = tableHead.append('th');
        cell.text(key);
    })
    
}

//call function
displayResults();

//Function: displayResults
function displayResults(){
    //get value property in input element
    var inputValue = inputBox.property('value');
    //initialize table
    var filterData = transactions;

    //use form input to filter data
    if(inputValue != ""){
        filterData = transactions.filter(tran => tran.Description.includes(inputValue));
    }
    var tbody = d3.select('#reuslts-body');
    tbody.html('')

    //crate table
    filterData.forEach(tran => {
        var row = tbody.append('tr');
        Object.entries(tran).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.text(value);
        });

       
    })
    


    //console.log(filterData);
}