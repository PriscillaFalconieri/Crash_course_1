// This script reads the CSV data and builds the charts
const csvUrl = 'data/floodarchive_cleaned.csv';

// Load and parse the CSV file
Papa.parse(csvUrl, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        const data = results.data;
        console.log("Data loaded:", data.length, "rows");
        
        // Prepare our data structures
        const countryCounts = {};
        const yearCounts = {};
        const categoryCounts = {};
        const severityDisplaced = {};

        data.forEach(row => {
            if (!row.Country) return; // Skip empty rows

            // 1. Count by Country
            countryCounts[row.Country] = (countryCounts[row.Country] || 0) + 1;

            // 2. Count by Year
            if (row.Year) {
                yearCounts[row.Year] = (yearCounts[row.Year] || 0) + 1;
            }

            // 3. Count by Category (categorised_reason)
            const cat = row.categorised_reason || 'Unknown';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

            // 4. Displaced by Severity
            if (row.Severity !== undefined && row.Severity !== null) {
                const sev = "Level " + row.Severity;
                const displaced = parseFloat(row.Displaced) || 0;
                severityDisplaced[sev] = (severityDisplaced[sev] || 0) + displaced;
            }
        });

        createCountryChart(countryCounts);
        createYearChart(yearCounts);
        createCategoryChart(categoryCounts);
        createSeverityChart(severityDisplaced);
    }
});

function createCountryChart(counts) {
    // Sort countries by number of events and take top 20
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

    const labels = sorted.map(d => d[0]);
    const values = sorted.map(d => d[1]);

    new Chart(document.getElementById('countryChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Events',
                data: values,
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y' // Horizontal bar chart
        }
    });
}

function createYearChart(counts) {
    // Sort years chronologically
    const sortedYears = Object.keys(counts).sort((a, b) => a - b);
    const values = sortedYears.map(y => counts[y]);

    new Chart(document.getElementById('yearChart'), {
        type: 'line',
        data: {
            labels: sortedYears,
            datasets: [{
                label: 'Events per Year',
                data: values,
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createCategoryChart(counts) {
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    new Chart(document.getElementById('categoryChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Events',
                data: values,
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createSeverityChart(displaced) {
    const labels = Object.keys(displaced).sort();
    const values = labels.map(l => displaced[l]);

    new Chart(document.getElementById('severityChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Displaced People',
                data: values,
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People'
                    }
                }
            }
        }
    });
}
