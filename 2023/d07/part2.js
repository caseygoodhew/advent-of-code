const groupCards = (cards) => {
    const map = cards.reduce((acc, card) => {
        acc[card] = (acc[card] || 0);
        acc[card]++;
        return acc;
    }, {});

    const sorted = Object.keys(map).map(card => ({
        card,
        count: map[card],
    })).sort((a, b) => b.count - a.count);

    const jIndex = sorted.findIndex(({ card }) => card === 'J');
    if (jIndex <= 0) {
        return sorted;
    }

    const jCard = sorted.splice(jIndex, 1);
    return [...jCard, ...sorted];
}

const isFiveOfAKind = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;

        return (grouped[1]?.count ?? 0) + jCount >= 5;
    }
    return grouped[0].count === 5;
}

const isFourOfAKind = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;
        return grouped[1].count + jCount === 4;
    }
    return grouped[0].count === 4;
}

const isFullHouse = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;
        return grouped[1].count + jCount === 3 && grouped[2].count === 2;
    }
    return grouped[0].count === 3 && grouped[1].count === 2;
}

const isThreeOfAKind = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;
        return grouped[1].count + jCount === 3;
    }
    return grouped[0].count === 3;
}

const isTwoPair = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;
        return grouped[1].count === 2 && grouped[2].count + jCount === 2;
    }

    return grouped[0].count === 2 && grouped[1].count === 2;
}

const isOnePair = (cards, grouped) => {
    if (grouped[0].card === 'J') {
        const jCount = grouped[0].count;
        return grouped[1].count + jCount === 2;
    }

    return grouped[0].count === 2 && grouped[1].count === 1;
}

const HandType = {
    HIGH_CARD: 0,
    PAIR: 1,
    TWO_PAIRS: 2,
    THREE_OF_A_KIND: 3,
    FULL_HOUSE: 6,
    FOUR_OF_A_KIND: 7,
    FIVE_OF_A_KIND: 9
}

const getHandType = (cards) => {
    const grouped = groupCards(cards);

    if (isFiveOfAKind(cards, grouped)) {
        //console.log(cards.join(''))
        return HandType.FIVE_OF_A_KIND;
    }

    if (isFourOfAKind(cards, grouped)) {
        return HandType.FOUR_OF_A_KIND;
    }

    if (isFullHouse(cards, grouped)) {
        return HandType.FULL_HOUSE;
    }

    if (isThreeOfAKind(cards, grouped)) {
        return HandType.THREE_OF_A_KIND;
    }

    if (isTwoPair(cards, grouped)) {
        return HandType.TWO_PAIRS;
    }

    if (isOnePair(cards, grouped)) {
        return HandType.PAIR;
    }

    return HandType.HIGH_CARD;
}

const CardRank = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 1,
    'Q': 12,
    'K': 13,
    'A': 14,
}

const compareCards = (hand1, hand2) => {
    for (var i = 0; i < hand1.length; i++) {
        const card1 = hand1[i];
        const card2 = hand2[i];

        const rank1 = CardRank[card1];
        const rank2 = CardRank[card2];

        if (rank1 !== rank2) {
            return rank1 - rank2;
        }
    }

    return 0;
}

const compareHands = (hand1, hand2) => {
    const type1 = getHandType(hand1);
    const type2 = getHandType(hand2);

    if (type1 === type2) {
        return compareCards(hand1, hand2);
    }

    return type1 - type2;
}

export default function (data) {
    //data.forEach(hand => getHandType(hand.cards.sort(compareCards)))
    //return;
    data.sort((a, b) => compareHands(a.cards, b.cards));
    return data.reduce((acc, item, index) => {
        acc += item.bet * (index + 1);
        return acc
    }, 0);
}
