import wixData from 'wix-data';

$w.onReady(function () {
    $w("#EmployeeRepeater").onItemReady(($item, itemData, index) => {
        let id; 

        setTimeout(() => {
            id = $item("#statusText").text; 
            console.log("Value of employeeId:", id);
        }, 1000); 

        // Add an onBeforeSave event handler to the dataset
        $w("#dataset1").onBeforeSave(async () => {
            return {
                employeeId: id,  // Add the employeeId to the data
            };
        });

        $item("#button1").onClick(async () => {
            // Clear the input fields
            $item("#timePicker3").value = "";
            $item("#timePicker4").value = "";
            $item("#input1").value = "";
            $item("#input2").value = "";
            $item("#textBox1").value = "";
            $item("#datePicker2").value = "";
        });
    });
});