
//Main Code 
//Grabing Buttons
let displayI = document.getElementById('display');
let display2 = document.getElementById('display2');
let button = document.querySelectorAll('button');

//To detect screen change
//inputSize(); // Changes size of input box Output Screen
//On clicking input
//clickInput();
let expr = '';//String to be solved
let count = 0;//Flag for Behaviour after equal to has pressed
let cPress = 1;//Shows C is used or not
let errorMessage = "'Error' Press C to reset";

//Audio Keys
let buttonSound = new Audio('./audio/ButtonPopSound.mp3');
let resultSound = new Audio('./audio/resultSound.mp3');
let errorSound = new Audio('./audio/errorSound.mp3');

/*Feature Disabled
//to add sound on hover
let hoverSound = new Audio('/audio/HoverSound.mp3');
*/

//To Go through all Buttons in node list i used For loop(For Each can be used however)
for (let i = 0; i < button.length; i++) {
    //To Know when and where button was pushed i used Event listner
    button[i].addEventListener("click", (show) => { 
        delAns();//Check for Ans on screen
        //Adding Button audio
            if (mute == "1") {buttonExclusion(i);}//To Stop and Play sounds

        //Added switch for addig Math
        switch (button[i].innerHTML) {
            case '<i class="fa-solid fa-landmark"></i>': //Theme Icon
            case '<i class="fa-solid fa-face-smile"></i>'://Theme Icon2
            case '<i class="fa-sharp fa-solid fa-volume-high"></i>'://VolumeON
            case '<i class="fa-solid fa-volume-xmark"></i>'://VolumeOff
                break;
            case '=':
                    try {
                        expr = displayI.value;
                        bracketCorrection();//Corrects The Bracket '(', ')' before evaluation
                        bracketCheck();//Checks For missing Brackets and Add them
                        display2.value = displayI.value;
                        displayI.value = 'Ans = ' + eval(expr);
                        count = 1;
                        if (mute == "1") {resultSound.play();/*Adding sound on Result*/}//To Stop and Play sounds
                        break;
                    } catch {
                        count = errorMessage;
                        display2.value = displayI.value;
                        displayI.value = "'Error' Press C to reset";
                        if (mute == "1") {errorSound.play();/*errorSound*/}//To Stop and Play sounds
                        break;
                    }
                //}
                break;
            case 'C':
                displayI.value = "0";
                display2.value = "";
                expr = '';
                count = 0;
                cPress = 1;//Shows C is used or not
                break;

            case '&lt;-'://Clear one Functionality
                if (displayI.value == "0") {
                    break;
                }
                displayI.value = displayI.value.slice(0,-1);
                break;
            case '-': //Neggative Casses
                let disValue1 = displayI.value[displayI.value.length - 1];
                if (disValue1 == '-' || disValue1 == '+') {
                    replaceOperator(show.target.innerHTML);
                    break;
                }
                displayI.value += button[i].innerHTML;
                if (display1.value[0] == '0') {
                displayI.value = displayI.value.slice(1,displayI.value.length);
                }
                break;
            case '/': case '*': case '+'://Repeating Operators User Error Handling 
                let  disValue2 = displayI.value[displayI.value.length - 1];
                if (disValue2 == '+' || disValue2 == '*' || disValue2 == '/') {
                    replaceOperator(show.target.innerHTML);
                    break;
                }
                if (disValue2 == '-') {
                    let disValue3 = displayI.value[displayI.value.length - 2];
                    if (disValue3 == '*' || disValue3 == '/') {
                        break;
                    }
                    replaceOperator(show.target.innerHTML);
                    break;
                }
            default:
                if(cPress == 1){zeroUse(button[i].innerHTML);}//When 0 in output box should stay
                errorReset();//Reset Value after error
                displayI.value += button[i].innerHTML;
                break;
        }
    })
    /*//Hover Sound Feature Disabled
    //Adding audio class for hover sound
        button[i].addEventListener('mouseover' , () => {
        hoverSound.play();
        });
    */
}
/*Additional Functions*/
/*
   //Push Value to input 2
   function send() {
        if (count == 1) {//when you have to use result 
            display2.value += displayI.value;//Push expression to second display
            expr += displayI.value;//push expression to expr solving string
            displayI.value = "";//Empty Display1
            count = 0;
        } else {
            display2.value += displayI.value;//Push expression to second display
            expr += displayI.value;//push expression to expr solving string
            displayI.value = "";//Empty Display1
            count = 0;
        };
    };
*/    
/*//Old Bracket Fuction Not Usable Broke to much Fuctionality Changed
    function correction() {//For Fixing user errors before evaluation
        //For left Bracket
        if (lbPress == '1') {
            leftBracket();
            lbPress = '0';
        };
        //For Right Bracket
        if (rbPress == '1') {
            rightBracket();
            console.log('Right Called');
            rbPress = '0';
        };
    };
        //Bracket Functions
        function leftBracket() {//Add '*' behind '(' to store in expr for evaluation
            console.log('leftBracket');
            let string = expr; console.log('string = ' + string);
            //let place = string.indexOf('('); console.log('place = ' + place);
            let prePlace = string[string.length - 1]; console.log('prePlace = ' + prePlace);
            switch (prePlace) {
                case '+': case '-': case '*': case '/': case '': case '(': case undefined:
                    break;
                default:
                    expr = expr + '*'; console.log('expr = ' + expr);
                    break;
            };
            lbPress = '0'; console.log('lbPress = ' + lbPress);
        };

        function rightBracket() {//Add '*' after '(' to store in expr for evaluation
            //console.log('rightBracket');
            let string = displayI.value; console.log('string = ' + string);
            let place = string.indexOf(')'); console.log('place = ' + place);
            let prePlace = string[place + 1]; console.log('prePlace = ' + prePlace);
            switch (prePlace) {
                case '+': case '-': case '*': case '/': case '': case undefined:
                    break;
                default:
                    let preValue = string.slice(0, place + 1);
                    preValue = preValue + '*'; console.log( 'preValue = ' + preValue);
                    let postValue = string.slice(place + 1, string.length); console.log('postValue = ' + postValue);
                    string = preValue + postValue; console.log('string = ' + string);
                    break;
            };
            console.log('string = ' + string);
            expr += string;
            rbPress = 0; console.log('rbPress = ' + rbPress);
        };
            function bracketTwiceL() {//Checks if Left Bracket has been Pressed
                lbPress = '1';
            };
            function bracketTwiceR() {//Checks if Right Bracket has been Pressed
                rbPress = '1';
            }; 

*/
    //Bracket Functions
        function bracketCorrection() {//Corrects The Bracket '(', ')' before evaluation
            let string = expr;
        //For loop to check position of strings
            for (let i = 0; i < string.length; i++) {
                //Check if ( has been found
                if (string[i] == '(') {
                    let prePlace = string[i - 1];                    
                    switch (prePlace) {
                        case '+': case '-': case '*': case '/': case '': case '(': case undefined:
                            break;

                        default:
                            let preValue = string.slice(0, i);
                            preValue = preValue + '*';                             
                            let postValue = string.slice(i, string.length);        
                            string = preValue + postValue; 
                        break;
                    }
                } else if (string[i] == ')') {  
                    let postPlace = string[i + 1];  
                    switch (postPlace) {
                        case '+': case '-': case '*': case '/': case '': case ')': case undefined:
                        break;

                    default:
                        let preValue = string.slice(0, i + 1);
                        preValue = preValue + '*';              
                        let postValue = string.slice(i + 1, string.length); 
                        string = preValue + postValue;   
                        break;
                    }
                }
            }
            expr = string;
        };    

        function bracketCheck() {//Add '(' or ')' when one is missing before evaluation
            let string = expr;//Storing For Usage Here
            let lneed = 0;
            let rneed = 0;
            for (let i = 0; i < string.length; i++) { 
                //'(' Left bracket check
                if(string[i] == '('){
                    rneed += 1;
                }
                // ')' Right bracket check 
                else if (string[i] == ')') {
                    rneed -= 1;
                    if (rneed < 0) {
                        rneed = 0;
                    };
                };
            };
            for (let i = string.length - 1; i >= 0; i--) {
    
                //')' Left bracket check
                if(string[i] == ')'){
                    lneed += 1;
                }
                // '(' Right bracket check 
                else if (string[i] == '(') {
                    lneed -= 1;
                        if (lneed < 0) {
                            lneed = 0;
                        };
                    };
                };

            //Adding Brackets
            if (lneed != 0){
                for (let i = 1; i < lneed + 1; i++) {//Left Brackets
                    expr = '(' + expr;
                };
            };
            if (rneed != 0){
                for (let i = 1; i < rneed + 1; i++) {//Right Brackets
                    expr = expr + ')';
                };
            };
        };

    //After Error Resets values
    function errorReset() {//After Error Resets values
        if (count == errorMessage) {
        displayI.value = "0";
        //display2.value = "";
        expr = '';
        count = 0;
    }};

    //Determines when to place zero in Output
    function zeroUse(i) {
        switch (i) {
            case '+': case '-': case '*': case '/': case '.':
                cPress = 0;
                break;
            default:
                displayI.value = "";
                cPress = 0;
                break;
        }
    };
    /*//Changes Output box size according to port
    function inputSize() {
        let tableWidth = document.getElementById('tableId').clientWidth; //Table Width
        console.log(tableWidth);
        
        if (tableWidth == 388) {
            displayI.size = 21;
            display2.size = 29;
        } else if (tableWidth == 484) {
            displayI.size = 23;
            display2.size = 29;
        }
    };
    */
    
    //Button sound Exclusion
    function buttonExclusion(flag) {
        switch (button[flag].innerHTML) {
            case '=':
                break;    
            default:
                buttonSound.play();
                break;
        }
    };

    //On Clicking input
    function clickInput() {
        let input = document.getElementById('display');
        let input2 = document.getElementById('display2');

            input.classList.add('onClick');
            input2.classList.add('onClick');

    }

    //If Equal to is pressed then Remove 'Ans = ' From displayI.value
    function delAns(){
        if (count == 1) {
            displayI.value = displayI.value.slice(6,displayI.value.length);
            count = 0;
        }
    };
    //Replace Previous Operator
    function replaceOperator(operator) {
        let value = displayI.value;
                    value = value.slice(0,value.length - 1);
                    value = value + operator;
                    displayI.value = value;
    }
//Keyboard input Controls
let display1 = document.getElementById('display');
display1.addEventListener('click', () => {
    let position = display1.value.length;
    display1.setSelectionRange(position,position);
})
//let valuesN = 1;
display1.onkeydown = function(e) { //Prevents Values Keyboard Control
    
    switch (e.key) {
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '+': case '*': case '/': case '-': case '(': case ')': case '.': case 'Shift': case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight': case 'Backspace': case 'Enter': case 'c': case 'C':
            break;
    
        default:
            return false;
            break;
    }
};
//For mobile screens
display1.ontouchstart = function (e) {
    display1.readOnly = true;
}
display1.addEventListener('keyup', (e) => {
    delAns();
    switch (e.key) {
        case '-': //Negative Casses
            let disValue1K = displayI.value[displayI.value.length - 2];
            if (disValue1K == '-' || disValue1K == '+') {
                replaceOperatorK(e.key);
                break;
            }
            if (display1.value[0] == '0') {
                display1.value = display1.value.slice(1,display1.value.length);
                //valuesN -= 1;
            }
            //valuesN += 1;
            break;
        case '+': case '*': case '/':

            let disValue2K = displayI.value[displayI.value.length - 2];
            if (disValue2K == '+' || disValue2K == '*' || disValue2K == '/') {
                replaceOperatorK(e.key);
                break;
            }
            if (disValue2K == '-') {
                let disValue3K = displayI.value[displayI.value.length - 3];
                if (disValue3K == '*' || disValue3K == '/') {
                    displayI.value = displayI.value.slice(0,displayI.value.length - 1);
                    break;
                }
                replaceOperatorK(e.key);
                break;
            }
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
            //valuesN += 1;
            if (display1.value[0] == '0') {display1.value = display1.value.slice(1,display1.value.length);
            //valuesN -= 1;
            }
            break;
        case '(': case ')': case '.':
           // valuesN += 1;
            if (display1.value[0] == '0') {display1.value = display1.value.slice(1,display1.value.length);
            //valuesN -= 1;
            }
            break;
        case 'Shift':
            break;    
        case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight':
            let position = display1.value.length;
            display1.setSelectionRange(position,position);
            break;    
        case 'Backspace':
            displayEmpty();
            //valuesN -= 1;
            break;
        case 'Enter':
            document.getElementById('equalTo').click();
            let lengthDis  = displayI.value.slice(6,displayI.value.length);
            //valuesN =  lengthDis.length;
            break;
        case 'c': case 'C':
            document.getElementById('C').click();
            //valuesN = 1;
            break;
        default:
        /*
            let compare = displayI.value.length;
            if (valuesN != compare) {
                display1.value = display1.value.slice(0,-1);
            }
            valueCheck(); //Exclude Non-Usable keys
        */
            break;
    }
    /*
    if (valuesN <= 0) { //Prevent valueN to go in minus
        valuesN = 1; 
    }
    */
});

 //Replace Previous Operator
    function replaceOperatorK(operator) {
        let value = displayI.value;
        value = value.slice(0,value.length - 2);
        value = value + operator;
        displayI.value = value;
    };
//Delete Ans if preasent after result
function delAnsK() {
    if (count == 1) {
            displayI.value = displayI.value.slice(6,displayI.value.length);
            count = 0;
        }
};
//Empty display
function displayEmpty(){
    if (displayI.value == '') {
        displayI.value = '0';
    }
}
/*
//Exclude Non useable values
function valueCheck(){
    let hold = display1.value;
    let length = hold.length;
    let Key;
    for (let i = 0; i < length; i++) {
            Key = hold[hold.length - 1];
            switch (Key) {
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '+': case '*': case '/': case '-': case '(': case ')': case '.':
                    i = length;
                    break;
                default:
                    hold = hold.slice(0,-1);
                    break;
            }
    }
    display1.value = hold;
}    
*/

//Nav Mobile
let menue = document.getElementById('menue');
let navHidden = document.getElementById('navHidden')

//Adding Event listner to know when menue button is pressed
menue.addEventListener('click', () => {
    if (navHidden.classList.contains('hidden')) {
        navHidden.classList.remove('hidden');
    } else {
        navHidden.classList.add('hidden');
    }
});

//Bg Sound
let bgSound1 = new Audio('./audio/bgSound1.mp3');
let bgSound2 = new Audio('./audio/bgSound2.mp3');
let mute = 1;

//Mobile Nav Functionality
    //Themes
        let theme1 = document.getElementById('theme1');
        let theme2 = document.getElementById('theme2');
    //Background Music
        let song1 = document.getElementById('songOn');
        let song2 = document.getElementById('songOff');
        //Using Event listner to know when buttons are clicked
               song1.addEventListener('click', () => {
                playbg();
               });
               song2.addEventListener('click', () => {
                bgSound1.pause();
                bgSound2.pause();
               });
    //Button Audio
        let buttonSound1 = document.getElementById('audioOn');
        let buttonSound2 = document.getElementById('audioOff');
        //Using Event listner to know when buttons are clicked
               buttonSound1.addEventListener('click', () => {
                mute = 1;
               });
               buttonSound2.addEventListener('click', () => {
                mute = 0;
               });
        
    //Bg Audio
        function playbg() {
            if (bgSound1.paused == true && bgSound2.paused == true) {
                bgSound1.play();
            } else if (bgSound1.paused == true) {
                bgSound2.play();
            }    
        };