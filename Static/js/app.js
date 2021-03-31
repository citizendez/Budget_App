//set up refreces to elements we know we are going to use
//var transactions = data;
var results = d3.select('#results-body');

//Select Button w/event handler
var button = d3.select('#button');
button.on('click', resetResults);

//Select Input Box w/event handler
var inputBox = d3.select('#filter-input');
inputBox.on('keyup', init);

//Select Month input box w/event handler
var monthInputBox = d3.select('#filter-month');
monthInputBox.on('change', init);

//Select Category input box w/event handler
var categoryInputBox = d3.select('#filter-category');
categoryInputBox.on('change', init);

function init(){
    d3.json('/api/budget_data').then((data) => {
        //console.log(data);
        popCat(data);
        createHeadders(data);
        displayResults(data);
    })
    //Month
    d3.select('#filter-month').append('option').attr('value', 0).text('Select Month');
    for(let key in MonthNames){
        d3.select('#filter-month').append('option').attr('value', key).text(MonthNames[key]);
    }
};
//Populate Category 
function popCat(data){
    var catList = data.filter(item => {
        return item.Category !== null;
    }).map(item => item.Category);
    catSet = new Set(catList);
    //console.log(catSet);
    d3.select('#filter-category').append('option').attr('value', '').text('Select Category')
    catSet.forEach(cat => {
        d3.select('#filter-category').append('option').attr('value', cat).text(cat);
        //console.log(cat);
    });
}
//Resets inputs
function resetResults(){
    d3.select('#filter-month').property('value', 0);
    d3.select('#filter-category').property('value', 0);
    d3.select('#filter-input').property('value', "");

    init();
    //console.log(button);
};
init();

function createHeadders(transactions){
    var tableHead = d3.select('#results-head');
    var tran = transactions[0];
    tableHead.html('')
    Object.keys(tran).forEach(key => {
        var cell = tableHead.append('th');
        cell.text(key);
    }) 
}


//Function: displayResults
function displayResults(transactions){
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
    var catSum = {};
    filterData.forEach(tran => {
        var row = tbody.append('tr');
        Object.entries(tran).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.text(value);
        }); 
        if(tran.Category in cats){
            cats[tran.Category] += 1;
            catSum[tran.Category] += Math.abs(tran.Expenses);
        }else{
            cats[tran.Category] = 1;
            catSum[tran.Category] = 0;
        };
    });  
    //console.log(Object.values(catSum))
    var trace = {
        y: Object.values(catSum),
        x: Object.keys(catSum),
        type: 'bar'
    };  
    var trace1 = {
        values: Object.values(cats),
        labels: Object.keys(cats),
        type: 'pie'
    };
    var data = [trace];  
    Plotly.newPlot('plot', data );

}


