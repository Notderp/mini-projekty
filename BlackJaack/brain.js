var deck =[
    {name: "2C", value: 2}, {name: "2D", value: 2}, {name: "2H", value: 2}, {name: "2S", value: 2},
    {name: "3C", value: 3}, {name: "3D", value: 3}, {name: "3H", value: 3}, {name: "3S", value: 3},
    {name: "4C", value: 4}, {name: "4D", value: 4}, {name: "4H", value: 4}, {name: "4S", value: 4},
    {name: "5C", value: 5}, {name: "5D", value: 5}, {name: "5H", value: 5}, {name: "5S", value: 5},
    {name: "6C", value: 6}, {name: "6D", value: 6}, {name: "6H", value: 6}, {name: "6S", value: 6},
    {name: "7C", value: 7}, {name: "7D", value: 7}, {name: "7H", value: 7}, {name: "7S", value: 7},
    {name: "8C", value: 8}, {name: "8D", value: 8}, {name: "8H", value: 8}, {name: "8S", value: 8},
    {name: "9C", value: 9}, {name: "9D", value: 9}, {name: "9H", value: 9}, {name: "9S", value: 9},
    {name: "10C", value: 10}, {name: "10D", value: 10}, {name: "10H", value: 2}, {name: "10S", value: 10},
    {name: "JC", value: 10}, {name: "JD", value: 10}, {name: "JH", value: 10}, {name: "JS", value: 10},
    {name: "QC", value: 10}, {name: "QD", value: 10}, {name: "QH", value: 10}, {name: "QS", value: 10},
    {name: "KC", value: 10}, {name: "KD", value: 10}, {name: "KH", value: 10}, {name: "KS", value: 10},
    {name: "AC", value: 11}, {name: "ADi", value: 11}, {name: "AH", value: 11}, {name: "AS", value: 11}
]
var playerHand = {name: "Marcel",cards: [], sum: 0, isTurn: true, isPass:false};
var AIHand = {name: "AI",cards: [], sum: 0, isPass:false};
var end =false;
function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkWinner()
{
    if (end==false) {
        end=true;
        let rmvcrds = document.querySelectorAll(".cardimghid");
        rmvcrds.forEach(function (entry) {
            entry.setAttribute("src", "images/" + entry.getAttribute("value") + ".jpg")
        });
        document.getElementById("AISum").innerHTML = "AI\'s sum: " + AIHand.sum;
        var endinfo;
        if (AIHand.sum <= 21 && playerHand.sum <= 21 && AIHand.sum > playerHand.sum) {
            endinfo="AI won! Sry, try again next time!";
        } else if (AIHand.sum <= 21 && playerHand.sum <= 21 && AIHand.sum <= playerHand.sum) {
            endinfo="You won! Congratulations!";
        } else if (AIHand.sum > 21 && playerHand.sum <= 21) {
            endinfo="You won! Congratulations!";
        } else if (AIHand.sum <= 21 && playerHand.sum > 21) {
            endinfo="AI won! Sry, try again next time!";
        } else {
            endinfo="Unbelievable, it's a tie! Try again next time!";
        }
        let endinf=document.createElement('div');
        endinf.setAttribute('id','endbox');
        endinf.innerHTML=endinfo+'<div style="clear:both;"></div><button id="endbtn" onclick="window.location.reload()">Try again</button>';
        let catcher=document.querySelector("body");
        catcher.appendChild(endinf);
        return
    }
}

function removeItem(array, item)
{
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}
function checkSum(who)
{
    if (who.sum >21)
    {
        choosePass(who);
        return;
    }
    return;
}
function pickCard(who)
{   if (who.isPass ==false)
{
    let pickedCard=deck[getRandomIntInclusive(0,deck.length-1)]
    removeItem(deck,pickedCard);
    if (pickedCard.value==11 && who.sum+pickedCard.value >21)
    {
        who.sum +=1;
    }
    else
    {
        who.sum += pickedCard.value;
    }
    who.cards.push(pickedCard.name);
    console.log(who);
    if (who == playerHand)
    {
        let crd= document.createElement('div');
        crd.setAttribute('class','card');
        crd.innerHTML='<img class="cardimg" src="images/'+pickedCard.name+'.jpg" alt="cardimage" />'
        document.getElementById("mySum").innerHTML=who.name+"\'s sum: "+who.sum;
        st=document.querySelector("#playerHand");
        st.appendChild(crd);
        checkSum(who);
    }
    else
    {
        let crd= document.createElement('div');
        crd.setAttribute('class','card');
        if (who.cards.length ==1)
        {
            crd.innerHTML = '<img class="cardimg" src="images/'+pickedCard.name+'.jpg" alt="cardimage" />';
            document.getElementById("AISum").innerHTML="AI\'s sum: "+who.sum;
        }
        else {
            crd.innerHTML = '<img class="cardimghid" src="images/purple_back.jpg" value='+pickedCard.name+' alt="cardimage" />';
            document.getElementById("AISum").innerHTML="AI\'s sum: ?";

        }
        st = document.querySelector("#aiHand");
        st.appendChild(crd);
        let rnd=getRandomIntInclusive(13,21);
        console.log(rnd);
        if (rnd <= who.sum )
        {
            return choosePass(who);
        }
        checkSum(who);
    }
}
}

function chooseTake()
{
    if (playerHand.isPass ==false)
    {
        pickCard(playerHand);
        setTimeout(function () {pickCard(AIHand);} ,500)
    }

}
function choosePass(who) {
    if (who.isPass==false) {
        who.isPass = true;
        let crd = document.createElement('div');
        crd.setAttribute('class', 'pass');
        crd.innerHTML = '<img class="cardimg" src="images/stop.png" alt="cardimage" />';;
        if (who == AIHand) {
            st = document.querySelector("#aiHand");
            st.appendChild(crd);
        } else if (who == playerHand) {
            st = document.querySelector("#playerHand");
            st.appendChild(crd);
        }

    }
    if (who == playerHand) {
        if (AIHand.isPass == false) {
            return setInterval(function() {pickCard(AIHand);}, 1000);
        }
    }
    if(playerHand.isPass==true && AIHand.isPass==true)
    {
        checkWinner()
    }
}

function startGame()
{
    pickCard(playerHand);
    pickCard(AIHand);

}
startGame();


