import wixData from 'wix-data';

$w.onReady(function () {
    // Add a delay before collapsing the tables and hiding the progress bars
    setTimeout(() => {
        $w("#table5").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
        $w("#dummy1").collapse();
        $w("#dummy2").collapse();
        $w("#dummy3").collapse();
        $w("#dummy4").collapse();
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
        //await storeDivisionResult(employeeId);

        // Collapse all dummy tables
        $w("#dummy1").collapse();
        $w("#dummy2").collapse();
        $w("#dummy3").collapse();
        $w("#dummy4").collapse();

        // Expand the corresponding dummy table based on the selected employeeId
        switch (employeeId) {
            case 'A0001':
                $w("#dummy1").expand();
                break;
            case 'A0002':
                $w("#dummy2").expand();
                break;
            case 'A0003':
                $w("#dummy3").expand();
                break;
            case 'A0004':
                $w("#dummy4").expand();
                break;
        }
    } else {
        // If no name is selected (i.e., the dropdown is cleared), collapse the tables and hide the progress bars
        $w("#table5").collapse();
        $w("#table3").collapse();
        $w("#progressBar1").hide();
        $w("#progressBar2").hide();
        $w("#dummy1").collapse();
        $w("#dummy2").collapse();
        $w("#dummy3").collapse();
        $w("#dummy4").collapse();
    }
}); 
/*
async function storeDivisionResult(employeeId) {
    try {
        // Query the first table
        let results1 = await wixData.query('EmployeeDatabase')
            .eq('employeeId', employeeId)
            .find();
        if (!results1.items.length) {
            console.error('No matching records found in EmployeeDatabase for employeeId:', employeeId);
            return;
        }
        let number1 = results1.items[0]['hoursWorked']; 

        // Query the second table
        let results2 = await wixData.query('Expected')
            .eq('employeeId', employeeId)
            .find();
        if (!results2.items.length) {
            console.error('No matching records found in Expected for employeeId:', employeeId);
            return;
        }
        let number2 = results2.items[0]['expectedHoursWorked']; 

        // Divide the numbers
        let divisionResult = number1 / number2;

        // Store the result and the employeeId in a dataset
        let result = await wixData.insert('Calculate', { calc: divisionResult, employeeId: employeeId }); 

        console.log('Division result and employeeId stored successfully:', result);
        console.log('num1:', number1);
        console.log('num2', number2);
    } catch (error) {
        console.error('Error storing division result:', error);
    }
}
*/
