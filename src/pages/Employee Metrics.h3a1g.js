import wixData from 'wix-data';

$w.onReady(function () {
    // Set up the repeater items
    $w("#EmployeeRepeater").onItemReady(($item, itemData, index) => {
        let id; // Declare id here

        // Add a delay before getting the text from the "#name" element
        setTimeout(() => {
            // Get the employee ID from the "statusText" element
            id = $item("#statusText").text; // Assign the value to id here

            // Output the value of employeeId to the console
            console.log("Value of employeeId:", id);
        }, 1000); // Delay of 1 second

        // Add event handler for the submit button
        $item("#button1").onClick(async () => {
            // Get the input values
            const expectedLogin = $item("#timePicker3").value;
            const expectedLogout = $item("#timePicker4").value;
            const expectedTasksCompleted = $item("#input1").value;
            const expectedHoursWorked = $item("#input2").value;
            const comments = $item("#textBox1").value;

            // Construct the data to be submitted
            const dataToSubmit = {
                employeeId: id, // Now id is accessible here
                expectedLogin: expectedLogin,
                expectedLogout: expectedLogout,
                expectedTasksCompleted: expectedTasksCompleted,
                expectedHoursWorked: expectedHoursWorked,
                comments: comments
            };

            try {
                // Submit the data
                await wixData.insert('Expected', dataToSubmit);
                console.log('Form data saved successfully!');
            } catch (error) {
                console.error('Error saving form data:', error);
            }
        });
    });
});