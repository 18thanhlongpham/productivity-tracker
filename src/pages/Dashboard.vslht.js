import wixData from 'wix-data';

$w.onReady(function () {
    // Add a delay before collapsing the tables and hiding the progress bars
    setTimeout(() => {
        $w("#table5").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
        $w("#dummy1").collapse();
    }, 2000); // Delay of 2 seconds

    // Add a delay before removing "All" from the dropdown
    setTimeout(() => {
        let opts = $w("#dropdown1").options;
        // removing first "All" element from drop down 
        opts.shift(); 
        $w("#dropdown1").options = opts; 
    }, 2000); // Delay of 2 seconds
});

$w("#dropdown1").onChange(async (event) => {
    console.log('onChange event triggered for #dropdown1');

    // Expand #dummy1 as soon as any option is selected
    $w("#dummy1").expand();

    let selectedName = $w("#dropdown1").value; // Get the selected name

    if (selectedName) {
        // Expand the tables and show the progress bars
        $w("#table5").expand();
        $w("#table3").expand();

        $w("#progressBar1").show();
        $w("#progressBar2").show();

        // Query the EmployeeDatabase to get the employeeId for the selected name
        let employeeData = await wixData.query('EmployeeDatabase')
            .eq('name', selectedName) // Replace 'name' with your actual field name for the employee name
            .find();

        if (!employeeData.items.length) {
            console.error('No matching records found in EmployeeDatabase for name:', selectedName);
            return;
        }

        let employeeId = employeeData.items[0]['employeeId'];

        // Call the storeDivisionResult function with the employeeId
        await storeDivisionResult(employeeId);

        // Do not collapse #dummy1 when an option is selected
    } else {
        // If no name is selected (i.e., the dropdown is cleared), collapse the tables and hide the progress bars
        $w("#table5").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
        $w("#dummy1").collapse();
    }
});

async function storeDivisionResult(employeeId) {
    console.log('storeDivisionResult called with employeeId:', employeeId);

    try {
        // Query the Expected table
        let expectedResults = await wixData.query('Expected')
            .eq('employeeId', employeeId)
            .find();
        console.log('Expected results:', expectedResults);

        if (!expectedResults.items.length) {
            console.error('No matching records found in Expected for employeeId:', employeeId);
            return;
        }

        // Get the expectedHoursWorked and the dates for the selected employeeId
        let expectedHoursWorked = 0;
        let dates = [];
        for (let item of expectedResults.items) {
            expectedHoursWorked += item['expectedHoursWorked'];
            dates.push(item['dateA1']); // Replace 'date' with your actual field name for the date
        }

        // Query the EmployeeDatabase table
        let employeeResults = await wixData.query('EmployeeData')
            .eq('employeeId', employeeId)
            .hasSome('date', dates) // Replace 'date' with your actual field name for the date
            .find();
        console.log('EmployeeDatabase results:', employeeResults);

        if (!employeeResults.items.length) {
            console.error('No matching records found in EmployeeDatabase for employeeId and dates:', employeeId, dates);
            return;
        }

        // Get the hoursWorked for the selected employeeId and the dates
        let hoursWorked = 0;
        for (let item of employeeResults.items) {
            hoursWorked += item['hoursWorked'];
        }

        // Divide the numbers
        let divisionResult = hoursWorked / expectedHoursWorked;

        // Store the result, the employeeId, and the target in a dataset
        let result = await wixData.insert('Calculate', { calc: divisionResult, employeeId: employeeId, target: 1 }); 

        console.log('Division result, employeeId, and target stored successfully:', result);
        console.log('num1:', hoursWorked);
        console.log('num2', expectedHoursWorked);

        // Update the progress bar
        $w("#progressBar1").value = divisionResult; // Actual progress
        $w("#progressBar1").targetValue = 1; // Target
    } catch (error) {
        console.error('Error storing division result:', error);
    }
}