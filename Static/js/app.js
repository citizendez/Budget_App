//set up refreces to elements we know we are going to use
//var transactions = data; 
//Select Button w/event handler
var button = d3.select('#button');
button.on('click', resetResults);

//Select Input Box w/event handler
var inputBox = d3.select('#filter-input');
inputBox.on('keyup', init);

//Select Month input box w/event handler
var monthInputBox = d3.select('#filter-month');
monthInputBox.on('change', init);
popMonth();
//Select Category input box w/event handler 
var categoryInputBox = d3.select('#filter-category');
categoryInputBox.on('change', init); 

d3.select('#select-datadir').on('change', init);  
popDatadir(); 
 
function init(){    
    let dir = d3.select('#select-datadir').property('value') ;  
    d3.json(`/api/budget_data/${dir}`).then((data) => {  
        d3.select('#transactions').attr('value', JSON.stringify(data)); 
        popCat(data);
        createHeaders(data);
        displayResults(data);
    });
};
init();

function popDatadir(){ 
    d3.select('#select-datadir').html(''); 
    d3.select('#select-datadir').append('option').attr('value', "amazon").text("-- Data Sources --");
    datadirs.forEach(item =>{ 
        d3.select('#select-datadir').append('option').attr('value', item).text(`Data Source: ${item.toUpperCase()}`);
    });  
}

function popMonth(){
    d3.select('#filter-month').html('');
    d3.select('#filter-month').append('option').attr('value', 0).text('Select Month');
    for(let key in MonthNames){
        d3.select('#filter-month').append('option').attr('value', key).text(MonthNames[key]);
    } 
}
//Populate Category 
function popCat(data){
    if(d3.select('#filter-category').node().value != ''){
        return false; 
    } 
    var catList = data.filter(item => {
        return item.Category !== null;
    }).map(item => item.Category); 
    catSet = new Set(catList);
    //console.log(catSet);
 
    d3.select('#filter-category').html('');
    d3.select('#filter-category').append('option').attr('value', '').text('Select Category')
    catSet.forEach(cat => {
        d3.select('#filter-category').append('option').attr('value', cat).text(cat); 
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


function createHeaders(transactions){
    var tableHead = d3.select('#results-head');
    tableHead.html('');
    var tran = transactions[0];
    tableHead.html('')
    Object.keys(tran).forEach(key => {
        var cell = tableHead.append('th');
        cell.text(key);
    }); 
}
 
//Function: displayResults
function displayResults(transactions){
    //get value property in input element
    var tbody = d3.select('#results-body');
    tbody.html('');

    var inputValue = inputBox.property('value');
    var monthValue = monthInputBox.property('value');
    var categoryValue = categoryInputBox.property('value');
    //initialize table
    var filterData = transactions;

    //use form input to filter data
    if(inputValue != ""){
        filterData = filterData.filter(tran => tran.Description.toUpperCase().includes(inputValue.toUpperCase()));
    };
    if(monthValue > 0){
        filterData = filterData.filter(mo => mo.Month == monthValue)
    };
    if(categoryValue != ""){
        filterData = filterData.filter(tran => tran.Category == categoryValue);
    };
 
    //create pie
    let amountSum = 0;
    var catCntDict = {}; 
    var catSumDict = {};
    filterData.forEach(tran => {
        var row = tbody.append('tr');
        Object.entries(tran).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.text(value);
        }); 
        amountSum += Math.abs(tran.Amount);
        if(tran.Category in catCntDict){
            catCntDict[tran.Category] += 1;
            catSumDict[tran.Category] += Math.abs(tran.Amount);
        }else{
            catCntDict[tran.Category] = 1;
            catSumDict[tran.Category] = 0;
        };
    }); 
 
    var summaryResults = d3.select('#summary-results');
    summaryResults.select('thead').html(''); 
    summaryResults.select('tbody').html(''); 
    summaryResults.select('thead').append('th').text('Sum');  
    summaryResults.select('tbody').append('td').text(amountSum); 

    //console.log(Object.values(catSum))
    var trace = {
        y: Object.values(catSumDict),
        x: Object.keys(catSumDict),
        type: 'bar'
    };  
    var trace1 = { 
        values: Object.values(catCntDict),
        labels: Object.keys(catCntDict),
        type: 'pie'
    };
    var data = [trace];  
    Plotly.newPlot('plot', data );
 
}


