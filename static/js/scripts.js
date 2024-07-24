// scripts.js

document.getElementById('filter').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const accommodationType = document.getElementById('accommodationType').value;
    const transportationType = document.getElementById('transportationType').value;
    const accommodationCost = document.getElementById('accommodationCost').value;
    const transportationCost = document.getElementById('transportationCost').value;
    const analysisTypes = Array.from(document.getElementById('analysisType').selectedOptions).map(option => option.value);

    let url = `/api/data?`;
    if (age) url += `age=${age}&`;
    if (gender) url += `gender=${gender}&`;
    if (nationality) url += `nationality=${nationality}&`;
    if (accommodationType) url += `accommodationType=${accommodationType}&`;
    if (transportationType) url += `transportationType=${transportationType}&`;
    if (accommodationCost) url += `accommodationCost=${accommodationCost}&`;
    if (transportationCost) url += `transportationCost=${transportationCost}&`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log("No data found for the selected filters.");
                return;
            }

            if (analysisTypes.includes('destByNationality')) {
                const destinations = data.map(item => item['Destination']);
                const nationalities = data.map(item => item['Traveler Nationality']);
                // Create a grouped bar chart or other visual for destinations by nationality
                const destinationCount = {};
                destinations.forEach((destination, index) => {
                    if (!destinationCount[destination]) destinationCount[destination] = 0;
                    destinationCount[destination]++;
                });

                const destinationTrace = {
                    x: Object.keys(destinationCount),
                    y: Object.values(destinationCount),
                    type: 'bar',
                    name: 'Destination by Nationality'
                };
                Plotly.newPlot('visualization', [destinationTrace], { title: 'Destination by Nationality' });
            }

            if (analysisTypes.includes('transByNationality')) {
                const transportationTypes = data.map(item => item['Transportation Type']);
                const nationalities = data.map(item => item['Traveler Nationality']);
                // Create a grouped bar chart or other visual for transportation by nationality
                const transCount = {};
                transportationTypes.forEach((type, index) => {
                    if (!transCount[type]) transCount[type] = 0;
                    transCount[type]++;
                });

                const transportationTrace = {
                    x: Object.keys(transCount),
                    y: Object.values(transCount),
                    type: 'bar',
                    name: 'Transportation by Nationality'
                };
                Plotly.newPlot('visualization', [transportationTrace], { title: 'Transportation by Nationality' });
            }

            if (analysisTypes.includes('accByNationality')) {
                const accommodationTypes = data.map(item => item['Accommodation Type']);
                const nationalities = data.map(item => item['Traveler Nationality']);
                // Create a grouped bar chart or other visual for accommodation by nationality
                const accCount = {};
                accommodationTypes.forEach((type, index) => {
                    if (!accCount[type]) accCount[type] = 0;
                    accCount[type]++;
                });

                const accommodationTrace = {
                    x: Object.keys(accCount),
                    y: Object.values(accCount),
                    type: 'bar',
                    name: 'Accommodation by Nationality'
                };
                Plotly.newPlot('visualization', [accommodationTrace], { title: 'Accommodation by Nationality' });
            }
        })
        .catch(error => console.error('Error:', error));
});
