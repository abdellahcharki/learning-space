//===============================================================================================
//  by abdellah charki from morroco 
//  email : abdellah0charki@gmail.com
//
//   call function by : typeWrite(el,text[],speedWrite, sleeptime = 0, itemStart = 0);
//   argument :
//   [ * ] -> is required
//   [arg 1]   *el          :  select element to effct
//   [arg 2]   *text        : array of words ro be efects
//   [arg 3]   speedWrite  : speed wraite in unit ms  by default  = 160ms
//   [arg 4]    sleeptime : sleep time after write a word 
//   ------------------------------------------------------------------------
//   ====================== call function with out set [arg 5] ================
//   calling of function :  typeWrite("id",["word 1" , "word 2" , "word 3"], 150,600)
//   ------------------------------------------------------------------------    
//===============================================================================================

typeWrite("test", ["abdellah charki", "web devloper ", "elzero web shcool", "thenk you !"], 160, 600);

function typeWrite(id = "selector", text = ["abdellah", "charki"], speedWrite = 160, sleeptime = 600, itemStart = 0) {
    var el = document.getElementById(id);
    if (el) {
        var txt = "";
        var textType = text[itemStart];
        var maxText = text.length;
        var len = textType.length;
        var i = 0;
        write = setInterval(function() {
            txt += textType[i++];
            el.textContent = txt;
            if (i === len) {
                clearInterval(write);
                setTimeout(function() {
                    // function for clear text 
                    i = 1;
                    clear = setInterval(function() {
                        txt = txt.slice(0, -1);
                        el.textContent = txt;
                        i++;
                        if (i > len) {
                            clearInterval(clear);
                            //repat function for next word
                            if (itemStart < maxText - 1) {
                                typeWrite(id, text, speedWrite, sleeptime, itemStart + 1);
                            } else if (itemStart === maxText - 1) {
                                typeWrite(id, text, speedWrite, sleeptime, 0);
                            }
                        }
                    }, speedWrite);
                }, sleeptime)
            }
        }, speedWrite);
    }
}