global = window.global || {};

function getTheNumber(){
            $.ajax({
                type: "GET",
                url: "./longway.php",
                success: function(e){
                    global.theNumber = parseInt(e);
                    setState(1);
                }
            });
        }
