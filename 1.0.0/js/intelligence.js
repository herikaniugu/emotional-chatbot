(function(window) {
    var intelligence = new Object();
    intelligence.NAME = "Chatbot Intelligence"
    intelligence.VERSION = "1.0.0";
    intelligence.AUTHOR = "Heri Kaniugu";
    intelligence.input = function(value) {
        var contraction = [ ["'s", "is"], ["'re", "are"], ["'m", "am"], ["'t", "not"], ["'d", "had"], ["'ve", "have"], ["'ll", "will"] ];
        var abbreviation = [ ["u", "you"], ["r", "are"], ["ya", "you"], ["ur", "you are"], ["im", "i am"] ];
        var calculation = intelligence.calculation(value); if (calculation) return calculation;
        var coordination = intelligence.coordination(value, contraction, abbreviation);
        var allocation = intelligence.allocation(coordination);
        return intelligence.volition(allocation, coordination);
    };
    intelligence.response = {
        // DIRECT
        good: ["good", "better", "best", "perfect", "beautiful", "awesome", "pretty", "likes", "like", "lovely", "loves", "love",
            "skillful", "healthy", "fine", "strong", "excellent", "smarty", "smart", "charming", "stunning", "glamorous", "handsome", "magnificent"],
        joke: ["joke", "crazy", "dope", "silly", "weird", "unique", "wacky", "funny", "fun", "amusing", "humorous", "entertaining", "creepy", "freaky"],
        bad: ["bad", "bored", "mad", "hungry", "ill", "insane", "numb", "dump", "stupid", "poor", "inferior", "careless", "sick", "unwell",
            "useless", "pathetic", "dirty", "nasty", "terrible", "hates", "hate", "sucks", "suck", "fucks", "fuck"],
        hello: ["hi", "hey", "hello", "howdy", "hiya", "aloha", "sup", "hi there", "hello there", "what is up", "how are you"],
        welcome: ["hi", "hey", "hello"],
        goodbye: ["goodbye", "good bye", "bye bye", "bye", "ciao", "see you later", "see you"],
        thank: ["thanks", "thanks a lot", "thank you", "thank you so much", "you are welcome"],
        greetings: ["good morning", "good afternoon", "good evening", "good night"],
        wishes: ["best wishes", "good wishes", "good luck", "kind regards", "congratulations", "happy birthday", "happy new year", "merry christmas", "happy halloween"],
        appreciation: ["i appreciate you", "respects", "you are the best", "you make me happy", "you are a true friend", "i am grateful", "sincere thanks", "thank you", "thanks"],
        distress: ["sad", "unhappy", "heartbroken", "awful", "unlucky", "sorrowful", "pitiful", "bored", "i am bored", "sad", "i feel sad"],
        interjection: ["oops", "ouch", "huh", "oh", "ok", "okay", "cool", "wow", "damn", "omg", "oh my god"],
        hesitation: ["eh", "oh", "uh"],
        respond: ["okay", "ok", "cool"],
        curse: ["damn"],
        possibly: ["i think so"],
        profanity: ["shit", "fuck"],
        // LINK
        discourse: ["like", "because", "and", "but", "or", "where", "when"],
        filler: ["well", "now", "you know", "simply", "actually", "basically", "i mean", "okay", "so", "while", "then"],
        filter: ["a", "an", "the", "too much", "too", "so very much", "so very", "so much", "so", "real", "really"],
        excessively: ["so much", "too much", "very much", "so", "too", "a lot"],
        connection: ["just", "yet", "such", "a", "the"],
        apologize: ["i am sorry", "oh sorry", "sorry"],
        none: ["i do not understand", "i do not get it", "i did not catch that"],
        suggestion: ["find on the internet"],
        pronoun: ["i", "we", "you", "she", "he", "it", "they"],
        conjoin: ["who", "whom", "what", "when", "where", "which", "whose", "how"],
        request: ["please"],
        command: ["define", "search", "find"],
        verb: ["am", "is", "are", "has", "have", "had", "was", "were", "shall", "will", "should", "would", 
            "be", "being", "been", "do", "does", "did", "done", "can", "could", "may", "must", "might", "feel"],
        // SWAHILI
        poa: ["poa", "safi"],
        habari: ["habari","mambo", "niaje"],
        salamu: ["za asubuhi", "za mshana", "za kushinda", "za jioni"],
        mshangao: ["oh", "wow", "waoh", "aah"],
        itikia: ["aya", "oh"],
        swali: ["nini", "nani", "wapi", "je", "ipi"],
        kamili: ["si", "ni", "hapana", "ndio"]
    };
    intelligence.compare = function(value, source, position) {
        var index = value.indexOf(source.split(" ") [position]); return index >= 0 ? value[index] : Type.EMPTY;
    };
    intelligence.sentence = function(value, source) {
        var sentence = new Array(), response = intelligence.response;
        var command = intelligence.recognition(value, response.command);
        var verb = intelligence.recognition(value, response.verb);
        var conjoin = intelligence.recognition(value, response.conjoin);
        var pronoun = intelligence.recognition(value, response.pronoun);
        var imperative = intelligence.compare(command, source, 0);
        var interrogative = intelligence.compare(verb, source, 0) || intelligence.compare(conjoin, source, 0) || intelligence.compare(pronoun, source, 1);
        var declarative = [intelligence.compare(pronoun, source, 0), intelligence.compare(response.verb, source, 1)].join(" ").trim();
        var allocation = declarative ? intelligence.allocation(source.substring(source.indexOf(declarative) + declarative.length).trim()) : Type.EMPTY;
        if (imperative) sentence.push(response.suggestion);
        else if (interrogative) sentence.push(response.suggestion);
        else if (declarative) sentence = [].concat(sentence, intelligence.expression(allocation)); return sentence;
    };
    intelligence.expression = function(value) {
        var expression = new Array(), response = intelligence.response;
        var greetings = intelligence.recognition(value, response.greetings);
        var hello = intelligence.recognition(value, response.hello);
        var goodbye = intelligence.recognition(value, response.goodbye);
        var thank = intelligence.recognition(value, response.thank);
        var wishes = intelligence.recognition(value, response.wishes);
        var appreciation = intelligence.recognition(value, response.appreciation);
        var distress = intelligence.recognition(value, response.distress);
        var hesitation = intelligence.recognition(value, response.hesitation);
        var curse = intelligence.recognition(value, response.curse);
        var profanity = intelligence.recognition(value, response.profanity);
        var appreciation = intelligence.recognition(value, response.appreciation);
        var apologize = intelligence.recognition(value, response.apologize);
        var respond = intelligence.recognition(value, response.respond);
        var interjection = intelligence.recognition(value, response.interjection);
        var bad = intelligence.recognition(value, response.bad);
        var joke = intelligence.recognition(value, response.joke);
        var good = intelligence.recognition(value, response.good);
        var habari = intelligence.recognition(value, response.habari);
        var salamu = intelligence.recognition(value, response.salamu);
        if (greetings.length > 0) expression.push(response.greetings);
        else if (hello.length > 0) expression.push(response.welcome);
        else if (goodbye.length > 0) expression.push(response.goodbye);
        else if (thank.length > 0) expression.push(response.thank);
        else if (wishes.length > 0) expression.push(response.wishes);
        else if (appreciation.length > 0) expression.push(response.thank);
        else if (distress.length > 0) expression.push(response.apologize);
        else if (hesitation.length > 0) expression.push(response.respond);
        else if (curse.length > 0) expression.push(response.respond);
        else if (profanity.length > 0) expression.push(response.respond);
        else if (respond.length > 0) expression.push(response.respond);
        else if (appreciation.length > 0) expression.push(response.thank);
        else if (apologize.length > 0) expression.push(response.thank);
        else if (interjection.length > 0) expression.push(response.respond);
        else if (bad.length > 0) expression.push(response.apologize);
        else if (joke.length > 0) expression.push(response.possibly);
        else if (good.length > 0) expression.push(response.thank);
        else if (habari.length > 0) expression.push(response.poa);
        else if (salamu.length > 0) expression.push(response.poa);
        return expression;
    };
    intelligence.volition = function(value, source) {
        var volition = new Array(), response = intelligence.response;
        var expression = intelligence.expression(value);
        var sentence = intelligence.sentence(value, source);
        if (expression.length > 0) volition = [].concat(volition, expression);
        else if (sentence.length > 0) volition = [].concat(volition, sentence);
        if (volition.length == 0) volition.push(response.hesitation);
        var decision = volition[Math.floor(Math.random() * volition.length)];
        return decision[Math.floor(Math.random() * decision.length)];
    };
    intelligence.allocation = function(value) {
        var array = value.split(/\s+/), output = [], index = 1, min = 0, max = index, count = ((array.length * (array.length + 1)) / 2);
        var indices = [0], index = -1; while ((index = value.indexOf(" ", index + 1)) >= 0) indices.push(index); indices.push(value.length);
        for (var index = 0; index < count; index++) { output.push(value.slice(indices[min], indices[max]).trim()); if (max < array.length) { max++; } else { index++; min++; max = index; } } return output;
    };
    intelligence.coordination = function(value, contraction, abbreviation) {
        var coordination = (value || Type.EMPTY).toLowerCase().replace(/[^\w\d\s\'\"]/g, "").replace(/\"/g, "'").replace (/^|$/g, " ");
        for (var index = 0; index < contraction.length; index++) coordination = coordination.replace(contraction[index][0] + " ", " " + contraction[index][1] + " ");
        for (var index = 0; index < abbreviation.length; index++) coordination = coordination.replace(" " + abbreviation[index][0] + " ", " " + abbreviation[index][1] + " "); return coordination.trim();
    };
    intelligence.calculation = function(value) {
        return Number(value.replace(/[.+\-*/]/g, "")) >= 0 ? new Function(["return(", value, ")"].join(""))() : false;
    };
    intelligence.recognition = function(allocation, response) {
        return allocation.map(function(value) { if (response.indexOf(value) >= 0) return response[response.indexOf(value)]; }).filter(function(value) { if (value) return value; });
    };
    window.Extension("intelligence", intelligence);
}) (window);