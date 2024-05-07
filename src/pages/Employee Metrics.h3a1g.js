import wixData from 'wix-data';

$w.onReady(function () {
    $w("#EmployeeRepeater").onItemReady(($item, itemData, index) => {
        let id; 

        setTimeout(() => {
            id = $item("#statusText").text; 
            console.log("Value of employeeId:", id);
        }, 1000); 

        $item("#button1").onClick(async () => {
            // Get the input values
            const expectedLogin = $item("#timePicker3").value;
            const expectedLogout = $item("#timePicker4").value;
            const expectedTasksCompleted = Number($item("#input1").value);
            const expectedHoursWorked = Number($item("#input2").value);
            const comments = $item("#textBox1").value;
            const dateA1 = new Date($item("#datePicker2").value);
        
            // Construct the data to be submitted
            const dataToSubmit = {
                employeeId: id, // Now id is accessible here
                expectedLogin: expectedLogin,
                expectedLogout: expectedLogout,
                expectedTasksCompleted: expectedTasksCompleted,
                expectedHoursWorked: expectedHoursWorked,
                comments: comments,
                dateA1: dateA1
            };
        
            try {
                // Query the Expected table for an existing entry with the same date
                let existingEntry = await wixData.query('Expected')
                    .eq('employeeId', id)
                    .eq('dateA1', dateA1)
                    .find();
        
                if (existingEntry.items.length > 0) {
                    // If an existing entry is found, update it
                    dataToSubmit._id = existingEntry.items[0]._id; // Add the _id to the data to be submitted
                    await wixData.update('Expected', dataToSubmit);
                    console.log('Form data updated successfully!');
                } else {
                    // If no existing entry is found, insert a new entry
                    await wixData.insert('Expected', dataToSubmit);
                    console.log('Form data saved successfully!');
                }
        
                // Clear the input fields
                $item("#timePicker3").value = "";
                $item("#timePicker4").value = "";
                $item("#input1").value = "";
                $item("#input2").value = "";
                $item("#textBox1").value = "";
                $item("#datePicker2").value = "";
        
            } catch (error) {
                console.error('Error saving form data:', error);
            }
        });
    });
});

