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