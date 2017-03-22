var korrektsvar;
var feedback_Array = [];
var feedback_counter = 0;

var storrelse_Array = [];

var korrektfeed = ["Rigtigt svaret", "Savret er korrekt", "Flot, svaret er rigtigt", "Du har svaret rigtigt", "Det er det rigtige svar", "Helt rigtigt"]



$(document).ready(function() {


    $('#instruction').prepend(instruction("Omregn størrelsen fra den ene enhed til den anden. Skriv den rigtige værdi i tekstfeltet."));
    $('#explanation').prepend(explanation("Formålet med denne øvelse er at lære dig at omregne mellem forskellige enheder for den samme fysiske størrelse. Denne type omregninger har man hele tiden brug for i fysikfaget."));

    $(".btn-tjek").click(tjek_svar);

    $(document).keypress(function(e) {
        if (e.which == 13) {
            tjek_svar();
        }
    });



    $(".postfix").click(function() {
        //$(".postfix").slideToggle();
    });




    build_select_container();


    $('input[type="checkbox"]').change(function() {
        var name = $(this).val();
        var check = $(this).prop('checked');
        console.log("Change: " + name + " to " + check);
        poseQuestion();
    });

  $('.inputfield').on('input',function(e){
     $(".microhint").remove()
    });


    //$(".cb_container").slideToggle();
    //$(".cb_container").slideToggle(0);

    poseQuestion();

});

function build_select_container() {
    var HTML = "<h4>Vælg hvilke fysiske størrelser du vil træne:</h4>";
    //var HTML = "<div class='toggle_btn'><span class='toggleglyph glyphicon glyphicon-chevron-down'></span><span class='valg_txt'>Klik for at vælge hvilke fysiske størrelser du vil træne</span></div>";
    HTML += "<div class='cb_container'>";
    for (var i = 0; i < jsonData.length; i++) {

        HTML += " <label class='input_p'><input class='checkboxes_str' checked type='checkbox' name='storrelse' value=" + jsonData[i].storrelse + "><span class='checkbox_txt'>" + jsonData[i].storrelse + "</span></label>";

    }

    HTML += "</div>";

    $(".select_container").html(HTML);

    $(".toggle_btn").click(function() {
        $(".cb_container").toggle(200, function() {
            if ($(".cb_container").is(":hidden")) {
                $(".toggleglyph").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            } else {
                $(".toggleglyph").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
            }
        });


    });



}

function update_checkboxes() {
    console.log("updating cb");
}

function poseQuestion() {

    $(".microhint").remove();
    $(".question, .inputcontainer").fadeOut(0);



    var randomklasse = Math.floor(Math.random() * jsonData.length);
    //Hvis det ransom nummer ikke er selected, kør igen:

    if ($(".checkboxes_str:checked").length > 0) {
        while (!$(".checkboxes_str").eq(randomklasse).prop('checked')) {
            randomklasse = Math.floor(Math.random() * jsonData.length);
        }
    } else {

    }


    $(".inputfield").val("");
    $(".inputfield").focus();
    var randomvalue;

    console.log(randomklasse);

    var randomkombo = Math.floor(Math.random() * jsonData[randomklasse].kombinationer.length);

    var jsonSelected = jsonData[randomklasse].kombinationer[randomkombo];
    var reverse = Math.round(Math.random() * 1);

    if (jsonSelected.reversible != true) {
        reverse = 0;
    }

    console.log(jsonSelected.kombo + ", " + jsonSelected.faktor + ", " + jsonSelected.reversible + " reversed: " + reverse);


    if (Math.random() * 1 > .75) {
        console.log("DECIMALTAL")
        randomvalue = Math.floor(Math.random() * 100) / 100;
    } else {
        randomvalue = Math.floor(Math.random() * 1000) / 10;
    }


    //scope: 0.01 -> 100 

    console.log();


    console.log(jsonSelected.faktor);

    var fixed_length = jsonSelected.faktor.toString().length - 2;

    console.log("FL:" + fixed_length);

    var string_val_0 = jsonData[randomklasse].enheder.abb.indexOf(jsonSelected.kombo[0]);
    string_val_0 = jsonData[randomklasse].enheder.txt[string_val_0];
    var string_val_1 = jsonData[randomklasse].enheder.abb.indexOf(jsonSelected.kombo[1]);
    string_val_1 = jsonData[randomklasse].enheder.txt[string_val_1];

    var randomvalue_komma = randomvalue.toString();
    console.log("RVK:  " + typeof(randomvalue_komma));
    randomvalue_komma = randomvalue_komma.replace(".", ",");

    console.log("RVK:  " + randomvalue_komma);

    var faktor_komma = jsonSelected.faktor.toString();
    faktor_komma = faktor_komma.replace(".", ",");






    $(".kategori").html(jsonData);

    if (reverse === 0) {
        $(".question").html("Omregn " + randomvalue_komma + " " + string_val_0 + " til " + string_val_1);
        korrektsvar = (randomvalue * jsonSelected.faktor);
        $(".first_val").html(randomvalue_komma + " " + jsonSelected.kombo[0] + " = ");
        $(".second_val").html(" " + jsonSelected.kombo[1] + "");
        var korrekt_res_komma = korrektsvar.toString();
        korrekt_res_komma = korrekt_res_komma.replace(".", ",");
        feedback_Array = ["Den ene enhed er " + faktor_komma + " gange større end den anden", faktor_komma + " " + jsonSelected.kombo[1] + " er det samme som 1 " + jsonSelected.kombo[0], "Overvej om resultatet skal være større eller mindre", "Du skal gange med " + faktor_komma, randomvalue_komma + " " + jsonSelected.kombo[0] + " gange med " + faktor_komma + " giver resultatet: <h4>" + korrekt_res_komma + " " + jsonSelected.kombo[1] + "</h4>"];

    } else {
        $(".question").html("Omregn " + randomvalue_komma + " " + string_val_1 + " til " + string_val_0);
        korrektsvar = (randomvalue / jsonSelected.faktor);
        $(".first_val").html(randomvalue_komma + " " + jsonSelected.kombo[1] + " = ");
        $(".second_val").html(" " + jsonSelected.kombo[0] + "");
        var korrekt_res_komma = korrektsvar.toString();
        korrekt_res_komma = korrekt_res_komma.replace(".", ",");
        feedback_Array = ["Den ene enhed er " + faktor_komma + " gange større end den anden", faktor_komma + " " + jsonSelected.kombo[1] + " er det samme som 1 " + jsonSelected.kombo[0], "Overvej om resultatet skal være større eller mindre", "Du skal dividere med " + faktor_komma, randomvalue_komma + " " + jsonSelected.kombo[1] + " divideret med " + faktor_komma + " giver resultatet: <h4>" + korrekt_res_komma + " " + jsonSelected.kombo[0] + "</h4>"];
    }


    /*if (faktor == 1) {

    }*/


    $(".postfix").html("Korrekt afrundet svar er: " + korrektsvar); // + " Decimaler" + );

    console.log(jsonSelected.faktor + ", " + jsonSelected.reversible + ", " + randomvalue);

    if (jsonSelected.faktor > 1000 && jsonSelected.reversible == true && randomvalue < 1) {
        poseQuestion();
        return;
    }


    var antal_decimaler = countDecimals(korrektsvar);
    if (antal_decimaler > 8) {
        console.log("KØRER IGEN");
        poseQuestion();
    }
    $(".question, .inputcontainer").fadeIn(500);
}


function tjek_svar() {

    if ($(".btn_onward").html() == "Tjek svar") {
        var brugersvar = $(".inputfield").val().toString();
        brugersvar = brugersvar.replace(/,/g, ".")
        console.log(brugersvar + ", " + korrektsvar);
        if (brugersvar == korrektsvar) {
            microhint($(".inputfield"), "<p>" + korrektfeed[Math.floor(Math.random() * korrektfeed.length)] + "</p>", "#2ABB2A");

            $(".btn-tjek").html("Næste");

            feedback_counter = 0;

            //poseQuestion();

        } else {
            microhint($(".inputfield"), "<p>" + feedback_Array[feedback_counter], "#e26060");
            if (feedback_counter < feedback_Array.length - 1) {
                feedback_counter++;
            } else { feedback_counter = 0 }
        }
    } else {
        $(".btn_onward").html("Tjek svar");
        poseQuestion();

    }
}

var countDecimals = function(value) {
    console.log("CD ");
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}
