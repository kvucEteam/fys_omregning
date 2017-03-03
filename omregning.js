var korrektsvar;
var feedback_Array = [];
var feedback_counter = 0;



$(document).ready(function() {

    $('#instruction').prepend(instruction("Omregn størrelsen fra den ene enhed til den anden. Skriv den rigtige værdi i tekstfeltet."));
    $('#explanation').prepend(explanation("Formålet med denne øvelse er at lære dig at omregne mellem forskellige enheder for den samme fysiske størrelse. Denne type omregninger har man hele tiden brug for i fysikfaget."));


    poseQuestion();
    $(".btn-tjek").click(tjek_svar);

    $(document).keypress(function(e) {
        if (e.which == 13) {
            tjek_svar();
        }
    });

    $(".inputfield").change(function() {
        console.log("input change");
        //$(".microhint").remove();
    });

});


function poseQuestion() {
    $(".inputfield").val("");
    $(".inputfield").focus();
    var randomvalue;
    var randomklasse = Math.floor(Math.random() * jsonData.length);

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




    $(".kategori").html(jsonData);

    if (reverse === 0) {
        $(".question").html("Omregn venligst " + randomvalue_komma + " " + string_val_0 + " til " + string_val_1);
        korrektsvar = (randomvalue * jsonSelected.faktor);
        $(".first_val").html(randomvalue_komma + " " + jsonSelected.kombo[0] + " = ");
        $(".second_val").html(" " + jsonSelected.kombo[1] + "");
        feedback_Array = ["Den ene enhed er " + jsonSelected.faktor + " gange større end den anden", "Skal resultatet være større eller mindre, tror du?", "Der går " + jsonSelected.faktor + " " + jsonSelected.kombo[1] + " på 1 " + jsonSelected.kombo[0], "Du skal gange med " + jsonSelected.faktor, randomvalue_komma + " " + jsonSelected.kombo[0] + " gange med " + jsonSelected.faktor + " giver resultatet: <h4>" + korrektsvar + " " + jsonSelected.kombo[1] + "</h4>"];

    } else {
        $(".question").html("Omregn " + randomvalue_komma + " " + string_val_1 + " til " + string_val_0);
        korrektsvar = (randomvalue / jsonSelected.faktor);
        $(".first_val").html(randomvalue_komma + " " + jsonSelected.kombo[1] + " = ");
        $(".second_val").html(" " + jsonSelected.kombo[0] + "");
        feedback_Array = ["Den ene enhed er " + jsonSelected.faktor + " gange større end den anden", "Skal resultatet være større eller mindre, tror du?", "Der går " + jsonSelected.faktor + " " + jsonSelected.kombo[1] + " på 1 " + jsonSelected.kombo[0], "Du skal dividere med " + jsonSelected.faktor, randomvalue_komma + " " + jsonSelected.kombo[1] + " divideret med " + jsonSelected.faktor + " giver resultatet: <h4>" + korrektsvar + " " + jsonSelected.kombo[0] + "</h4>"];
    }


    /*if (faktor == 1) {

    }*/


    $(".postfix").html("Korrekt afrundet svar er: " + korrektsvar); // + " Decimaler" + );




    var antal_decimaler = countDecimals(korrektsvar);
    if (antal_decimaler > 10) {
        console.log("KØRER IGEN");
        poseQuestion();
    }
}


function tjek_svar() {
    var brugersvar = $(".inputfield").val().toString();
    brugersvar = brugersvar.replace(/,/g, ".")
    console.log(brugersvar + ", " + korrektsvar);
    if (brugersvar == korrektsvar) {
        microhint($(".inputfield"), "<h4>Rigtigt</h4>", "green");
        poseQuestion();
    } else {
        microhint($(".inputfield"), "<h4>Hjælp</h4><p>" + feedback_Array[feedback_counter], "red");
        if (feedback_counter < feedback_Array.length - 1) {
            feedback_counter++;
        } else { feedback_counter = 0 }
    }
}

var countDecimals = function(value) {
    console.log("CD ");
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}
