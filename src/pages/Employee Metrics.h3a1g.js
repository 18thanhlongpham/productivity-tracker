import wixData from 'wix-data';
import { showToast } from 'wix-dashboard';

$w.onReady(function () {
    // Add event handler for when the user selects a date on the calendar
    $w('#datePicker3').onChange((event) => {
        const selectedDate = event.target.value;
        console.log("Selected date from calendar:", selectedDate); // Log the selected date from the calendar

        // Filter the dataset based on the selected date
        filterDataset(selectedDate);
    });
});

function filterDataset(selectedDate) {  
    const selectedDateObj = new Date(selectedDate);
    const selectedMonth = selectedDateObj.getMonth() + 1; // Month is zero-based, so we add 1
    const selectedDay = selectedDateObj.getDate();
    const selectedYear = selectedDateObj.getFullYear();

    // Construct the formatted date string using the extracted parts
    const formattedDate = `${selectedMonth}/${selectedDay}/${selectedYear.toString().slice(-2)}`; // Format the year to match the dataset

    console.log("Filtering dataset with date:", formattedDate); // Log the date being used for filtering

    wixData.query('EmployeeDatabase')
        .eq('date', formattedDate) // Filter items with dates equal to the selected date
        .find()
        .then((results) => {
            console.log("Filtered results:", results); // Log the filtered results

            $w('#propertiesRepeater').data = results.items;
        })
        .catch((error) => {
            console.error('Error filtering dataset:', error);
        });
}

$w.onReady(function () {
    // Make #group9 invisible on startup
    $w('#group9').hide();
});

$w("#button1").onClick( (event) => {
    console.log('Form data saved successfully!');

    try {
        // Show #group9 temporarily
        $w('#group9').show();
        setTimeout(() => $w('#group9').hide(), 2000);

        // Clear input boxes
        $w("input").forEach(input => {
            input.value = "";
        });

    } catch (error) {
        console.error('Error saving form data:', error);
    }
} );


