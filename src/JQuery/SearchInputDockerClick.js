
import $ from 'jquery';

function Docker() {

    $("#inpt_search").on('focus', function () {
        $(this).parent('label').addClass('active');
    });

    $("#inpt_search").on('blur', function () {
        if($(this).val().length == 0)
            $(this).parent('label').removeClass('active');
    });
    console.log("Docked");
}
export default Docker;
