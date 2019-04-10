$('form').on('submit', function (event) {

    // Prevent the page from reloading
    event.preventDefault();

    let inputs = [];

    // get leaves affected
    let $input = $(this).find('#leavesaffected');
    var input = $input.val();
    inputs.push(input);

    // get the symptom spread from radio buttons.
    $input = $("input[name='f9']:checked");
    input = $input.val();
    inputs.push(input);

    // get the plant leaf colour from radio buttons.
    $input = $("input[name='f10']:checked");
    input = $input.val();
    inputs.push(input);

    // get extra colours
    $input = $(this).find('#extraColors');
    input = $input.val();
    inputs.push(input);

    //necrotic spotting
    $input = $("input[name='f11']:checked");
    input = $input.val();
    if (input) {
        inputs.push(input);
    } else {
        inputs.push('nonnecrotic');
    }

    // get leaf
    $input = $(this).find('#leaf');
    input = $input.val();
    inputs.push(input);

    // get chlorosis
    $input = $(this).find('#chlorosis');
    input = $input.val();
    inputs.push(input);

    console.log("get_plant_deficiency("+inputs+",X)");
    console.log(inputs);
    

    new Pengine({
        server: "https://swish.swi-prolog.org/pengine",
        ask: "get_plant_deficiency(" + inputs + ",X)",
        chunk: 1000,
        application: "swish",
        onsuccess: function (result) {
            //Clear any appended items
            $("#prolog-response").empty();

            for (var i = 0; i < result.data.length; i++) {
                var b = result.data[i];
                $("#prolog-response").append("<li class='list-group-item'>" + b.X + "</li>");
            }
            console.log(result);
            // $('#prolog-response').text("The Deficient Nutrients : " + result);
            /* if (result.more)
                result.pengine.next(); */
        },
        onfailure: function (result) {
            //Clear any appended items
            $("#prolog-response").empty();
            console.log(result);
            $("#prolog-response").append("<li class='list-group-item'>" + "false: (No match)" + "</li>");
        }
    });

});
