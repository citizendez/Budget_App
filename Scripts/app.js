//set up refreces to elements we know we are going to use
var transactions = data;
var results = d3.select('#results-body');

//Select Button w/event handler
var button = d3.select('#button');
button.on('click', displayResults);

//Select Input Box w/event handler
var inputBox = d3.select('#filter-input');
inputBox.on('keyup', displayResults);

//Select Month input box w/event handler
var monthInputBox = d3.select('#filter-month');
monthInputBox.on('change', displayResults);

function init(){
    for(var i = 0; i < 13; i++){
        d3.select('#filter-month').append('option').attr('value', i).text(i);
        
    }
}
init();
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
    var monthValue = monthInputBox.property('value');
    //initialize table
    var filterData = transactions;

    //use form input to filter data
    if(inputValue != ""){
        filterData = filterData.filter(tran => tran.Description.toUpperCase().includes(inputValue.toUpperCase()));
    }
    if(monthValue > 0){
        filterData = filterData.filter(mo => mo.Month == monthValue)
    };
    var tbody = d3.select('#reuslts-body');
    tbody.html('')

    //create table
    var cats = {};
    filterData.forEach(tran => {
        var row = tbody.append('tr');
        Object.entries(tran).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.text(value);
        }); 
        if(tran.Category in cats){
            cats[tran.Category] += 1;
        }else{
            cats[tran.Category] = 1;
        };
    });  
    var trace = {
        values: Object.values(cats),
        labels: Object.keys(cats),
        type: 'pie'
    };
    var data = [trace];  
    Plotly.newPlot('plot', data );
}


