import wixData from 'wix-data';

$w.onReady(function () {
    setTimeout(() => {
        let opts = $w("#dropdown1").options;
        opts.shift(); 
        $w("#dropdown1").options = opts; 
    }, 2000);
});

$w("#dropdown1").onChange(async (event) => {
    console.log('onChange event triggered for #dropdown1');
    $w("#group2").expand();
    let selectedName = $w("#dropdown1").value;

    if (selectedName) {
        $w("#group2").expand();
        let employeeData = await wixData.query('EmployeeDatabase')
            .eq('name', selectedName)
            .find();
    
        if (!employeeData.items.length) {
            console.error('No matching records found in EmployeeDatabase for name:', selectedName);
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#text38").text = "Expected hours fulfilled: N/A";
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            $w("#text39").text = "Expected tasks fulfilled: N/A";
            return;
        }
    
        let employeeId = employeeData.items[0]['employeeId'];
    
        let expectedResults = await wixData.query('Expected')
            .eq('employeeId', employeeId)
            .find();
    
        if (!expectedResults.items.length) {
            console.error('No matching records found in Expected for employeeId:', employeeId);
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#text38").text = "Expected hours fulfilled: N/A";
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            $w("#text39").text = "Expected tasks fulfilled: N/A";
            return;
        }
    
        let employeeResults = await wixData.query('EmployeeDatabase')
            .eq('employeeId', employeeId)
            .find();
    
        if (!employeeResults.items.length) {
            console.error('No matching records found in EmployeeDatabase for employeeId:', employeeId);
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#text38").text = "Expected hours fulfilled: N/A";
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            $w("#text39").text = "Expected tasks fulfilled: N/A";
            return;
        }
    
        await storeDivisionResult(employeeId);
    } else {
        $w("#group2").collapse();
    }
});

async function storeDivisionResult(employeeId) {
    console.log('storeDivisionResult called with employeeId:', employeeId);

    try {
        let expectedResults = await wixData.query('Expected')
            .eq('employeeId', employeeId)
            .find();
        console.log('Expected results:', expectedResults);

        if (!expectedResults.items.length) {
            console.error('No matching records found in Expected for employeeId:', employeeId);
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            return;
        }

        let expectedHoursWorked = 0;
        let expectedTasksCompleted = 0;
        let dates = [];
        for (let item of expectedResults.items) {
            expectedHoursWorked += item['expectedHoursWorked'];
            expectedTasksCompleted += item['expectedTasksCompleted'];
            dates.push(item['dateA1']);
        }

        let employeeResults = await wixData.query('EmployeeData')
            .eq('employeeId', employeeId)
            .hasSome('date', dates)
            .find();
        console.log('EmployeeDatabase results:', employeeResults);

        if (!employeeResults.items.length) {
            console.error('No matching records found in EmployeeDatabase for employeeId and dates:', employeeId, dates);
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            return;
        }

        let hoursWorked = 0;
        let tasksCompleted = 0;
        for (let item of employeeResults.items) {
            hoursWorked += item['hoursWorked'];
            tasksCompleted += item['tasksCompleted'];
        }

        if (expectedHoursWorked === 0) {
            $w("#progressBar1").value = 0;
            $w("#progressBar1").targetValue = 1;
            $w("#text38").text = "Expected hours fulfilled: N/A";
        } else {
            let divisionResultHours = hoursWorked / expectedHoursWorked;
            let result = await wixData.insert('Calculate', { calc: divisionResultHours, employeeId: employeeId, target: 1 }); 
            console.log('Division result for hours, employeeId, and target stored successfully:', result);
            console.log('num1:', hoursWorked);
            console.log('num2', expectedHoursWorked);
            $w("#progressBar1").value = divisionResultHours;
            $w("#progressBar1").targetValue = 1;
            let percentageResultHours = Math.min(divisionResultHours * 100, 100);
            $w("#text38").text = `Expected hours fulfilled: ${hoursWorked}/${expectedHoursWorked} = ${percentageResultHours.toFixed(2)}%`;
        }

        if (expectedTasksCompleted === 0) {
            $w("#progressBar2").value = 0;
            $w("#progressBar2").targetValue = 1;
            $w("#text39").text = "Expected tasks fulfilled: N/A";
        } else {
            let divisionResultTasks = tasksCompleted / expectedTasksCompleted;
            let result = await wixData.insert('Calculate', { calc: divisionResultTasks, employeeId: employeeId, target: 1 }); 
            console.log('Division result for tasks, employeeId, and target stored successfully:', result);
            console.log('num1:', tasksCompleted);
            console.log('num2', expectedTasksCompleted);
            $w("#progressBar2").value = divisionResultTasks;
            $w("#progressBar2").targetValue = 1;
            let percentageResultTasks = Math.min(divisionResultTasks * 100, 100);
            $w("#text39").text = `Expected tasks fulfilled: ${tasksCompleted}/${expectedTasksCompleted} = ${percentageResultTasks.toFixed(2)}%`;
        }
    } catch (error) {
        console.error('Error storing division result:', error);
    }
}