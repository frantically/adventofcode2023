utils = require('../utils.js')

CARD_ORDER_PART_1 = "AKQJT98765432".split("").reverse()
CARD_ORDER_PART_2 = "AKQT98765432J".split("").reverse()
HAND_FIVE_OF_A_KIND = 7
HAND_FOUR_OF_A_KIND = 6
HAND_FULL_HOUSE = 5
HAND_THREE_OF_A_KIND = 4
HAND_TWO_PAIRS = 3
HAND_ONE_PAIR = 2
HAND_HIGH_CARD = 1


function parsePlay(str) {
    parts = str.split(" ")
    play = {
        "cards": parts[0],
        "cardOccurences": parts[0].split("").reduce((occ, a) => (occ[a] = occ[a] + 1 || 1, occ), {}),
        "bid": parseInt(parts[1])
    }
    play["cardType"] = cardsType(play)
    return play
}

function applyJoker(play) {
    play['originalCardType'] = play.cardType

    //WAYS TO GET FIVE OF A KIND WITH JOKERS
    if(play.cardType == HAND_FOUR_OF_A_KIND && play.cardOccurences['J'] == 1) {
        play.cardType = HAND_FIVE_OF_A_KIND
    } else if(play.cardType == HAND_FOUR_OF_A_KIND && play.cardOccurences['J'] == 4) {
            play.cardType = HAND_FIVE_OF_A_KIND
        } else if(play.cardType == HAND_FULL_HOUSE && play.cardOccurences['J'] == 2) {
        play.cardType = HAND_FIVE_OF_A_KIND
    } else if(play.cardType == HAND_FULL_HOUSE && play.cardOccurences['J'] == 3) {
        play.cardType = HAND_FIVE_OF_A_KIND
    } 
    
    //FOUR OF KIND WITH JOKERS
    else if(play.cardType == HAND_THREE_OF_A_KIND && play.cardOccurences['J'] == 1) {
        play.cardType = HAND_FOUR_OF_A_KIND
    } else if(play.cardType == HAND_THREE_OF_A_KIND && play.cardOccurences['J'] == 3) {
        play.cardType = HAND_FOUR_OF_A_KIND
    } else if(play.cardType == HAND_TWO_PAIRS && play.cardOccurences['J'] == 2) {
        play.cardType = HAND_FOUR_OF_A_KIND
    }
    
    //FULL HOUSE WITH JOKERS
    else if(play.cardType == HAND_TWO_PAIRS && play.cardOccurences['J'] == 1) {
        play.cardType = HAND_FULL_HOUSE
    }

    //THREE OF A KIND WITH JOKERS
    else if(play.cardType == HAND_ONE_PAIR && play.cardOccurences['J'] == 1) {
        play.cardType = HAND_THREE_OF_A_KIND
    } else if(play.cardType == HAND_ONE_PAIR && play.cardOccurences['J'] == 2) {
        play.cardType = HAND_THREE_OF_A_KIND
    }

    //ONE PAIR WITH JOKERS
    else if(play.cardType == HAND_HIGH_CARD && play.cardOccurences['J'] == 1) {
        play.cardType = HAND_ONE_PAIR
    }
}

function cardsType(play) {
    occurences = Object.values(play.cardOccurences)
    if(occurences.length == 1) {
        return HAND_FIVE_OF_A_KIND
    }
    if(occurences.includes(4)) {
        return HAND_FOUR_OF_A_KIND
    }
    if(occurences.includes(3) && occurences.includes(2)) {
        return HAND_FULL_HOUSE
    }
    if(occurences.includes(3)) {
        return HAND_THREE_OF_A_KIND
    }
    if(occurences.filter(o => o == 2).length == 2) {
        return HAND_TWO_PAIRS
    }
    if(occurences.includes(2)) {
        return HAND_ONE_PAIR
    }
    return HAND_HIGH_CARD
}

function sortHands(a, b, cardOrder) {
    if(a.cardType != b.cardType) {
        return a.cardType - b.cardType
    }
    for(i=0;i<5;i++) {
        if(a.cards.charAt(i) != b.cards.charAt(i)) {
            return cardOrder.indexOf(a.cards.charAt(i)) - cardOrder.indexOf(b.cards.charAt(i))
        }
    }
}

function sortHandsPart1(a, b) {
    return sortHands(a, b, CARD_ORDER_PART_1)
}

function sortHandsPart2(a, b) {
    return sortHands(a, b, CARD_ORDER_PART_2)
}

function score(plays) {
    result = 0
    for(i=0;i<plays.length;i++) {
        result += ((i+1) * plays[i].bid)
    }
    return result
}

plays = utils.fileToArray('input.txt')
    .map(parsePlay)
    .sort(sortHandsPart1)

console.log(`Part 1: ${score(plays)}`)

plays.forEach(applyJoker)
plays.sort(sortHandsPart2)

console.log(`Part 2: ${score(plays)}`)