import wixData from 'wix-data';

// On page load, clear the tables
$w.onReady(function () {
    $w("#table5").rows = [];
    $w("#table6").rows = [];
    $w("#table3").rows = [];
});

$w("#dropdown1").onChange( (event) => {
    let selectedName = $w("#dropdown1").value; // Get the selected name

    if (selectedName) {
        // Fetch the data for the selected name from your dataset
        wixData.query('YourDatasetName')
            .eq('name', selectedName)
            .find()
            .then((results) => {
                // Populate your tables with the fetched data
                $w("#table5").rows = results.items;
                $w("#table6").rows = results.items;
                $w("#table3").rows = results.items;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    } else {
        // If no name is selected (i.e., the dropdown is cleared), clear the tables
        $w("#table5").rows = [];
        $w("#table6").rows = [];
        $w("#table3").rows = [];
    }
});