import wixData from 'wix-data';

$w.onReady(function () {
    // Collapse the tables and hide the progress bars on startup
    $w("#table5").collapse();
    $w("#table6").collapse();
    $w("#table3").collapse();
    $w("#progressBar1").hide();
    $w("#progressBar2").hide();

    // Remove "All" from the dropdown after 1 second
    setTimeout(() => {
        let opts = $w("#dropdown1").options;
        // removing first "All" element from drop down 
        opts.shift(); 
        $w("#dropdown1").options = opts; 
    }, 1000);
});

$w("#dropdown1").onChange( (event) => {
    let selectedName = $w("#dropdown1").value; // Get the selected name

    if (selectedName) {
        // Expand the tables and show the progress bars
        $w("#table5").expand();
        $w("#table6").expand();
        $w("#table3").expand();
        $w("#progressBar1").show();
        $w("#progressBar2").show();
    } else {
        // If no name is selected (i.e., the dropdown is cleared), collapse the tables and hide the progress bars
        $w("#table5").collapse();
        $w("#table6").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
    }
});

import wixData from 'wix-data';

async function storeDivisionResult() {
    try {
        // Query the first table
        let results1 = await wixData.query('FirstTable').find();
        let number1 = results1.items[0].numberField; // Replace 'numberField' with your actual field name

        // Query the second table
        let results2 = await wixData.query('SecondTable').find();
        let number2 = results2.items[0].numberField; // Replace 'numberField' with your actual field name

        // Divide the numbers
        let divisionResult = number1 / number2;

        // Store the result in a dataset
        let result = await wixData.insert('ResultDataset', { result: divisionResult }); // Replace 'ResultDataset' with your actual dataset name and 'result' with your actual field name

        console.log('Division result stored successfully:', result);
    } catch (error) {
        console.error('Error storing division result:', error);
    }
}

$w.onReady(function () {
    storeDivisionResult();
});