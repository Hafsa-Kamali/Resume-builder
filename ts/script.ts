
import $ from 'jquery';
import 'jquery.repeater';

interface RepeaterOptions {
    initEmpty: boolean;
    defaultValues: { [key: string]: string };
    show: () => void;
    hide: (deleteElement: () => void) => void;
    isFirstItemUndeletable: boolean;
}

$(document).ready(function () {
    ($('.repeater') as any).repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement: () => void) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    } as RepeaterOptions);
});

function generateCV() {
  
}
