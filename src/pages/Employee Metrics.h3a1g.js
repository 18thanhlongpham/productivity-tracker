import wixData from 'wix-data';

$w.onReady(async function () {
    // Define the start date
    let date = new Date(2024, 4, 1);  // May 1, 2024

    // Loop over 10 days
    for (let i = 0; i < 10; i++) {
        // Generate random tasks
        let tasks = Math.floor(Math.random() * 4) + 2;  // Random number between 2 and 5

        // Define the sign in time
        let signInTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0);  // 8:00 AM

        // Calculate the remaining hours until 6PM
        let remainingHours = 10;  // 6PM - 8AM = 10 hours

        // Generate random hours between 4 and the remaining hours
        let hours = Math.floor(Math.random() * (remainingHours - 3)) + 4;  // Random number between 4 and remainingHours

        // Define the sign out time
        let signOutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8 + hours, 0, 0);  // 8:00 AM + hours

        // Format the times to strings in the "HH:mm:ss" format
        let formattedSignInTime = signInTime.toISOString().substr(11, 8);
        let formattedSignOutTime = signOutTime.toISOString().substr(11, 8);

        // Define the data to be inserted
        let data = {
            signInTime: formattedSignInTime,
            signOutTime: formattedSignOutTime,
            hoursWorked: hours,
            tasksCompleted: tasks,
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate())  // Just the date part
        };

        // Insert the data into the datasets
        await wixData.insert('EmployeeData', data);
        //await wixData.insert('Dummy2', data);
        //await wixData.insert('Dummy3', data);
        //await wixData.insert('Dummy4', data);

        // Move to the next day
        date.setDate(date.getDate() + 1);
    }
});

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
                // Submit the data
                await wixData.insert('Expected', dataToSubmit);
                console.log('Form data saved successfully!');

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

$w.onReady(async function () {
    // Define the start date
    let date = new Date();

    // Loop over 10 days
    for (let i = 0; i < 10; i++) {
        // Generate random tasks and hours
        let tasks = Math.floor(Math.random() * 4) + 2;  // Random number between 2 and 5
        let hours = Math.floor(Math.random() * 5) + 6;  // Random number between 6 and 10

        // Define the sign in and sign out times
        let signInTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);  // 9:00 AM
        let signOutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9 + hours, 0, 0);  // 9:00 AM + hours

        // Format the times to strings in the "HH:mm:ss" format
        let formattedSignInTime = signInTime.toISOString().substr(11, 8);
        let formattedSignOutTime = signOutTime.toISOString().substr(11, 8);

        // Define the data to be inserted
        let data = {
            signInTime: formattedSignInTime,
            signOutTime: formattedSignOutTime,
            hoursWorked: hours,
            tasksCompleted: tasks,
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate())  // Just the date part
        };

        // Insert the data into the datasets
        await wixData.insert('EmployeeData', data);
        await wixData.insert('Dummy2', data);
        await wixData.insert('Dummy3', data);
        await wixData.insert('Dummy4', data);

        // Move to the next day
        date.setDate(date.getDate() + 1);
    }
});