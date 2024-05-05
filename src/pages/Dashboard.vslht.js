import wixData from 'wix-data';

$w.onReady(async function () {
    // Add a delay before collapsing the tables and hiding the progress bars
    setTimeout(() => {
        $w("#table5").collapse();
        $w("#table6").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
    }, 2000); // Delay of 2 seconds

    // Add a delay before removing "All" from the dropdown
    setTimeout(() => {
        let opts = $w("#dropdown1").options;
        // removing first "All" element from drop down 
        opts.shift(); 
        $w("#dropdown1").options = opts; 
    }, 2000); // Delay of 2 seconds

    // Call the storeDivisionResult function
    await storeDivisionResult();
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

async function storeDivisionResult() {
    try {
        // Query the first table
        let results1 = await wixData.query('EmployeeDatabase')
            .find();
        let number1 = results1.items[0]['hoursWorked']; 

        // Query the second table
        let results2 = await wixData.query('Expected')
            .find();
        let number2 = results2.items[0]['expectedHoursWorked']; 

        // Divide the numbers
        let divisionResult = number1 / number2;

        // Store the result in a dataset
        let result = await wixData.insert('Calculate', { calc: divisionResult }); 

        console.log('Division result stored successfully:', result);
    } catch (error) {
        console.error('Error storing division result:', error);
    }
}