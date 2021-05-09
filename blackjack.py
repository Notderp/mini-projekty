import random

deck = []


class player():
    def __init__(self, name, isMe):
        self.name = name
        self.isMe = isMe
        self.cards = []
        self.ifPass = False
        self.cardsSum = 0


AI = player("AI", False)

for x in range(13):
    i = 1
    while i <= 4:
        i += 1
        deck.append(x + 1)

deckcp = deck.copy()


def askQuestion(who):
    if (who.cardsSum > 21 or who.ifPass == True):
        print(who.name + " passed.")
        who.ifPass = True
        return
    if who.isMe:
        choice = input("Do you want take another card or? Type \"pass\" or \"take\":").lower()
        if choice == "take":
            print(who.name + " chose to take card next turn.")
            return
        elif choice == "pass":
            print(who.name + " passed.")
            who.ifPass = True
            return
        else:
            print("wrong answer")
            return askQuestion(who)
    chance = random.randint(10, 20)
    if who.cardsSum < chance:
        print(who.name + " chose to take card next turn.")
        return
    else:
        print(who.name + " passed.")
        who.ifPass = True
        return


def pickCard(who):
    if who.ifPass == True:
        return
    value = random.choice(deckcp)
    deckcp.remove(value)
    who.cardsSum += value
    who.cards.append(value)
    print(who.name + " picked a card.")
    if who.isMe:
        print("The card's value is " + str(value) + ". Your current hand is: " + str(who.cards))
    return


def startGame():
    deckcp = deck.copy()
    print("Welcome to BlackJack!")
    gamer = player(input("Whats your name?: "), True)
    counter = 0
    while gamer.ifPass == False or AI.ifPass == False:
        if counter == 0:
            pickCard(gamer)
            askQuestion(gamer)
            counter = 1
            print("========================================")
        elif counter == 1:
            pickCard(AI)
            askQuestion(AI)
            counter = 0
            print("========================================")

    print(AI.name + "'s score:" + str(AI.cardsSum) + "    " + str(AI.name) + "'s hand: " + str(AI.cards))
    print(gamer.name + "'s score:" + str(gamer.cardsSum) + "    " + str(gamer.name) + "'s hand: " + str(gamer.cards))
    if (AI.cardsSum > gamer.cardsSum and AI.cardsSum < 22) or (AI.cardsSum < gamer.cardsSum and gamer.cardsSum > 21):
        print(AI.name + " won.")
    elif (gamer.cardsSum > AI.cardsSum and gamer.cardsSum < 22) or (gamer.cardsSum < AI.cardsSum and AI.cardsSum > 21):
        print(gamer.name + " won, congratulations!")
    else:
        print("None of the players won")


startGame()
