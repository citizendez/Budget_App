//set up refreces to elements we know we are going to use
var transactions = data;
var results = d3.select('#results-body');

//Select Button w/event handler
var button = d3.select('#button');
button.on('click', resetResults);

//Select Input Box w/event handler
var inputBox = d3.select('#filter-input');
inputBox.on('keyup', displayResults);

//Select Month input box w/event handler
var monthInputBox = d3.select('#filter-month');
monthInputBox.on('change', displayResults);

//Select Category input box w/event handler
var categoryInputBox = d3.select('#filter-category');
categoryInputBox.on('change', displayResults);

function init(){
    //Month
    d3.select('#filter-month').append('option').attr('value', 0).text('Select Month');
    for(let key in MonthNames){
        d3.select('#filter-month').append('option').attr('value', key).text(MonthNames[key]);
    }
    //Category
    var catList = data.map(item => item.Category);
    catSet = new Set(catList);
    //console.log(catSet);
    catSet.forEach(cat => {
        d3.select('#filter-category').append('option').attr('value', cat).text(cat);
        //console.log(cat);
    });


}
function resetResults(){
    d3.select('#filter-month').property('value', 0);
    d3.select('#filter-category').property('value', 0);
    d3.select('#filter-input').property('value', "");

    displayResults();
    console.log(button);
};
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
    var categoryValue = categoryInputBox.property('value');
    //initialize table
    var filterData = transactions;

    //use form input to filter data
    if(inputValue != ""){
        filterData = filterData.filter(tran => tran.Description.toUpperCase().includes(inputValue.toUpperCase()));
    }
    if(monthValue > 0){
        filterData = filterData.filter(mo => mo.Month == monthValue)
    }
    if(categoryValue != ""){
        filterData = filterData.filter(tran => tran.Category == categoryValue);
    }
    ;
    var tbody = d3.select('#reuslts-body');
    tbody.html('')

    //create pie
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


