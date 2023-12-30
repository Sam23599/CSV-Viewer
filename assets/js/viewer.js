// Get the input field and table
var input = document.getElementById("searchInput");
var table = document.getElementById("dataTable");
var form = document.getElementById("searchForm");


// Add an input event listener to the search input
input.addEventListener("input", function () {
    var filter = input.value.toUpperCase();
    var tbody = table.getElementsByTagName("tbody")[0];
    var tr = tbody.getElementsByTagName("tr");

    // Iterate through the rows and hide/show based on the filter
    for (var i = 0; i < tr.length; i++) {
        var found = false;
        for (var j = 0; j < tr[i].cells.length; j++) {
            var td = tr[i].cells[j];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        tr[i].style.display = found ? "" : "none";
    }
});

// Add a click event listener to the search button
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
});



var tableContainer = document.getElementById('tableContainer');
var currentIndex = 10; // Starting index for rows

function showNextRows() {
    var tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the current rows

    // Display the next 10 rows
    for (var i = currentIndex; i < Math.min(currentIndex + 10, csvData.length); i++) {
        var row = document.createElement('tr');
        for (let cellKey in csvData[i]) {
            if (cellKey !== 'Avatar') {
                var cell = document.createElement('td');
                cell.innerText = csvData[i][cellKey];
                row.appendChild(cell);
            }
        }
        tableBody.appendChild(row);
    }
    currentIndex += 10; // Update the index for the next set of rows
}

function showPrevRows() {
    if (currentIndex > 10) {
        currentIndex -= 20; // Update the index for the previous set of rows
        showNextRows(); // Display the previous set of 10 rows
    }
}
