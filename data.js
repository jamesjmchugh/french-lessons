// French Flashcard Data - extracted from lesson notes
// Categories: vocabulary, sentence, verb, conjugation

const flashcardData = [
  // ============================================================
  // CRITICAL IRREGULARS - ÊTRE, AVOIR, ALLER (B1 Level Sentences)
  // ============================================================

  // === ÊTRE (to be) - Conjugations with example sentences ===
  { type: "verb", french: "être", english: "to be", example: "Être ou ne pas être, telle est la question.", priority: true, verb: "être" },

  // ÊTRE - Présent
  { type: "sentence", french: "Je suis content de te voir.", english: "I am happy to see you.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Je suis en train de travailler.", english: "I am working (right now).", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Je suis fatigué après cette longue journée.", english: "I am tired after this long day.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Je suis français mais j'habite aux États-Unis.", english: "I am French but I live in the United States.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Je suis sûr que c'est la bonne réponse.", english: "I am sure that's the right answer.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Tu es prêt pour la réunion ?", english: "Are you ready for the meeting?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Tu es vraiment doué pour la musique.", english: "You are really talented at music.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Tu es en retard, dépêche-toi !", english: "You are late, hurry up!", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Tu es libre ce weekend ?", english: "Are you free this weekend?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Il est médecin dans un hôpital.", english: "He is a doctor in a hospital.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Elle est très intelligente.", english: "She is very intelligent.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "C'est normal d'avoir peur.", english: "It's normal to be afraid.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "On est bien ici, non ?", english: "We're comfortable here, aren't we?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Nous sommes désolés pour le retard.", english: "We are sorry for the delay.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Nous sommes en vacances jusqu'à lundi.", english: "We are on vacation until Monday.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Nous sommes ravis de vous rencontrer.", english: "We are delighted to meet you.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Vous êtes d'accord avec cette décision ?", english: "Do you agree with this decision?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Vous êtes invités à dîner chez nous.", english: "You are invited to dinner at our place.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Ils sont toujours en retard.", english: "They are always late.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Elles sont parties faire du shopping.", english: "They (f) went shopping.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Ce n'est pas grave.", english: "It's not a big deal.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Où est la gare ?", english: "Where is the train station?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "Quelle heure est-il ?", english: "What time is it?", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "C'est trop cher pour moi.", english: "It's too expensive for me.", verb: "être", tense: "présent", priority: true },
  { type: "sentence", french: "C'est une bonne idée !", english: "That's a good idea!", verb: "être", tense: "présent", priority: true },

  // ÊTRE - Passé composé
  { type: "sentence", french: "J'ai été malade la semaine dernière.", english: "I was sick last week.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "J'ai été surpris par sa réaction.", english: "I was surprised by his reaction.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Tu as été formidable aujourd'hui.", english: "You were fantastic today.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Il a été promu directeur.", english: "He was promoted to director.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Nous avons été impressionnés par le spectacle.", english: "We were impressed by the show.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Vous avez été très patient avec moi.", english: "You were very patient with me.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ils ont été gentils avec nous.", english: "They were kind to us.", verb: "être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ça a été difficile mais on a réussi.", english: "It was difficult but we succeeded.", verb: "être", tense: "passé composé", priority: true },

  // ÊTRE - Imparfait
  { type: "sentence", french: "J'étais petit quand j'ai déménagé.", english: "I was young when I moved.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "J'étais en train de dormir quand tu as appelé.", english: "I was sleeping when you called.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu étais où hier soir ?", english: "Where were you last night?", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu étais vraiment fatigué après le voyage.", english: "You were really tired after the trip.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Il était une fois une princesse.", english: "Once upon a time there was a princess.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Elle était très belle quand elle était jeune.", english: "She was very beautiful when she was young.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "C'était vraiment délicieux !", english: "It was really delicious!", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "C'était comment tes vacances ?", english: "How was your vacation?", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Nous étions au restaurant quand il a commencé à pleuvoir.", english: "We were at the restaurant when it started raining.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Nous étions tellement heureux à cette époque.", english: "We were so happy at that time.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Vous étiez déjà partis quand je suis arrivé.", english: "You had already left when I arrived.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Ils étaient en réunion toute la journée.", english: "They were in a meeting all day.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Il était tard et j'avais sommeil.", english: "It was late and I was sleepy.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Le temps était magnifique ce jour-là.", english: "The weather was beautiful that day.", verb: "être", tense: "imparfait", priority: true },
  { type: "sentence", french: "Quand j'étais enfant, j'adorais le chocolat.", english: "When I was a child, I loved chocolate.", verb: "être", tense: "imparfait", priority: true },

  // ÊTRE - Futur simple
  { type: "sentence", french: "Je serai là à 8 heures.", english: "I will be there at 8 o'clock.", verb: "être", tense: "futur", priority: true },
  { type: "sentence", french: "Tu seras content quand tu verras ça.", english: "You will be happy when you see this.", verb: "être", tense: "futur", priority: true },
  { type: "sentence", french: "Ce sera difficile mais pas impossible.", english: "It will be difficult but not impossible.", verb: "être", tense: "futur", priority: true },
  { type: "sentence", french: "Nous serons en France l'été prochain.", english: "We will be in France next summer.", verb: "être", tense: "futur", priority: true },
  { type: "sentence", french: "Ils seront surpris par la nouvelle.", english: "They will be surprised by the news.", verb: "être", tense: "futur", priority: true },

  // ÊTRE - Conditionnel
  { type: "sentence", french: "Je serais ravi de vous aider.", english: "I would be delighted to help you.", verb: "être", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Ce serait bien si tu pouvais venir.", english: "It would be nice if you could come.", verb: "être", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Tu serais plus heureux avec un autre travail.", english: "You would be happier with another job.", verb: "être", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Nous serions perdus sans GPS.", english: "We would be lost without GPS.", verb: "être", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Ce serait possible de reporter la réunion ?", english: "Would it be possible to postpone the meeting?", verb: "être", tense: "conditionnel", priority: true },

  // === AVOIR (to have) - Sentences ===
  { type: "verb", french: "avoir", english: "to have", example: "Avoir ou ne pas avoir, that is not the question.", priority: true, verb: "avoir" },

  // AVOIR - Présent
  { type: "sentence", french: "J'ai faim, on mange bientôt ?", english: "I'm hungry, are we eating soon?", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai besoin de ton aide.", english: "I need your help.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai rendez-vous chez le médecin.", english: "I have an appointment at the doctor's.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai mal à la tête.", english: "I have a headache.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai 25 ans.", english: "I am 25 years old.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai hâte de te voir !", english: "I can't wait to see you!", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai peur des araignées.", english: "I'm afraid of spiders.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai de la chance d'avoir des amis comme vous.", english: "I'm lucky to have friends like you.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Tu as raison, je me suis trompé.", english: "You're right, I was wrong.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Tu as l'air fatigué aujourd'hui.", english: "You look tired today.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Tu as le temps de prendre un café ?", english: "Do you have time for a coffee?", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Tu as tort de t'inquiéter.", english: "You're wrong to worry.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Il a beaucoup de travail en ce moment.", english: "He has a lot of work right now.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Elle a deux enfants.", english: "She has two children.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "On a un problème avec l'ordinateur.", english: "We have a problem with the computer.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Il y a quelqu'un à la porte.", english: "There is someone at the door.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Il y a trop de bruit ici.", english: "There is too much noise here.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Nous avons une bonne nouvelle à annoncer.", english: "We have good news to announce.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Nous avons besoin de plus de temps.", english: "We need more time.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Vous avez des questions ?", english: "Do you have any questions?", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Vous avez du feu ?", english: "Do you have a light?", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Ils ont une grande maison à la campagne.", english: "They have a big house in the countryside.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Elles ont l'habitude de se lever tôt.", english: "They are used to waking up early.", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Qu'est-ce que tu as ?", english: "What's wrong with you?", verb: "avoir", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai sommeil, je vais me coucher.", english: "I'm sleepy, I'm going to bed.", verb: "avoir", tense: "présent", priority: true },

  // AVOIR - Passé composé
  { type: "sentence", french: "J'ai eu une idée géniale !", english: "I had a brilliant idea!", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "J'ai eu peur quand j'ai vu le film.", english: "I was scared when I saw the movie.", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Tu as eu de la chance de trouver ce travail.", english: "You were lucky to find this job.", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Il a eu un accident de voiture.", english: "He had a car accident.", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Nous avons eu du mal à comprendre.", english: "We had trouble understanding.", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Vous avez eu mon message ?", english: "Did you get my message?", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ils ont eu beaucoup de succès.", english: "They had a lot of success.", verb: "avoir", tense: "passé composé", priority: true },
  { type: "sentence", french: "Il y a eu un problème avec la commande.", english: "There was a problem with the order.", verb: "avoir", tense: "passé composé", priority: true },

  // AVOIR - Imparfait
  { type: "sentence", french: "J'avais froid ce matin.", english: "I was cold this morning.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "J'avais envie de partir en vacances.", english: "I wanted to go on vacation.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu avais l'air bizarre hier.", english: "You looked strange yesterday.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu avais raison depuis le début.", english: "You were right from the beginning.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Il avait beaucoup d'amis à l'école.", english: "He had many friends at school.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Elle avait les cheveux longs avant.", english: "She used to have long hair.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "On avait prévu d'aller au cinéma.", english: "We had planned to go to the movies.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Nous avions une maison près de la mer.", english: "We used to have a house near the sea.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Vous aviez dit que vous viendriez.", english: "You had said you would come.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Ils avaient tout préparé pour la fête.", english: "They had prepared everything for the party.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Il y avait beaucoup de monde au concert.", english: "There were a lot of people at the concert.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Quand j'avais 10 ans, j'adorais jouer dehors.", english: "When I was 10, I loved playing outside.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Elle avait toujours peur du noir.", english: "She was always afraid of the dark.", verb: "avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "Nous avions l'habitude de dîner ensemble.", english: "We used to have dinner together.", verb: "avoir", tense: "imparfait", priority: true },

  // AVOIR - Futur simple
  { type: "sentence", french: "J'aurai le résultat demain.", english: "I will have the result tomorrow.", verb: "avoir", tense: "futur", priority: true },
  { type: "sentence", french: "Tu auras plus de temps ce weekend.", english: "You will have more time this weekend.", verb: "avoir", tense: "futur", priority: true },
  { type: "sentence", french: "Il aura 30 ans le mois prochain.", english: "He will be 30 next month.", verb: "avoir", tense: "futur", priority: true },
  { type: "sentence", french: "Nous aurons besoin d'aide.", english: "We will need help.", verb: "avoir", tense: "futur", priority: true },
  { type: "sentence", french: "Vous aurez des nouvelles très bientôt.", english: "You will have news very soon.", verb: "avoir", tense: "futur", priority: true },
  { type: "sentence", french: "Il y aura une réunion à 15 heures.", english: "There will be a meeting at 3 pm.", verb: "avoir", tense: "futur", priority: true },

  // AVOIR - Conditionnel
  { type: "sentence", french: "J'aurais voulu te parler.", english: "I would have liked to talk to you.", verb: "avoir", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Tu aurais dû me le dire.", english: "You should have told me.", verb: "avoir", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Il aurait pu m'aider.", english: "He could have helped me.", verb: "avoir", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Nous aurions préféré rester.", english: "We would have preferred to stay.", verb: "avoir", tense: "conditionnel", priority: true },
  { type: "sentence", french: "J'aurais besoin de plus d'informations.", english: "I would need more information.", verb: "avoir", tense: "conditionnel", priority: true },

  // === ALLER (to go) - Sentences ===
  { type: "verb", french: "aller", english: "to go", example: "Je vais au travail tous les jours.", priority: true, verb: "aller" },

  // ALLER - Présent
  { type: "sentence", french: "Je vais au travail en métro.", english: "I go to work by subway.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Je vais bien, merci.", english: "I'm doing well, thank you.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Je vais chez le médecin cet après-midi.", english: "I'm going to the doctor this afternoon.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Je vais faire les courses.", english: "I'm going grocery shopping.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Comment ça va ?", english: "How are you?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Tu vas où ce soir ?", english: "Where are you going tonight?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Tu vas mieux qu'hier ?", english: "Are you feeling better than yesterday?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Tu vas voir, c'est super !", english: "You'll see, it's great!", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Il va au cinéma ce weekend.", english: "He's going to the movies this weekend.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Elle va souvent au restaurant.", english: "She often goes to restaurants.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Ça va aller, ne t'inquiète pas.", english: "It's going to be okay, don't worry.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "On va à la plage demain.", english: "We're going to the beach tomorrow.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "On va prendre un verre ?", english: "Shall we grab a drink?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Nous allons en France cet été.", english: "We're going to France this summer.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Nous allons commencer la réunion.", english: "We're going to start the meeting.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Vous allez bien ?", english: "Are you doing well?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Vous allez où en vacances ?", english: "Where are you going on vacation?", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Ils vont à l'école à pied.", english: "They walk to school.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Elles vont faire du shopping.", english: "They're going shopping.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "Ce pantalon te va très bien.", english: "These pants look great on you.", verb: "aller", tense: "présent", priority: true },

  // ALLER - Futur proche (very important!)
  { type: "sentence", french: "Je vais manger dans cinq minutes.", english: "I'm going to eat in five minutes.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Je vais t'appeler ce soir.", english: "I'm going to call you tonight.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Je vais réfléchir à ta proposition.", english: "I'm going to think about your proposal.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Tu vas adorer ce film.", english: "You're going to love this movie.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Tu vas voir, c'est facile.", english: "You'll see, it's easy.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Il va pleuvoir cet après-midi.", english: "It's going to rain this afternoon.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Elle va arriver d'une minute à l'autre.", english: "She's going to arrive any minute.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "On va se retrouver à 19 heures.", english: "We're going to meet at 7 pm.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "On va bien s'amuser !", english: "We're going to have a great time!", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Nous allons déménager le mois prochain.", english: "We're going to move next month.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Vous allez comprendre très vite.", english: "You're going to understand quickly.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Ils vont être contents de te voir.", english: "They're going to be happy to see you.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Qu'est-ce que tu vas faire ce weekend ?", english: "What are you going to do this weekend?", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Je ne vais pas pouvoir venir.", english: "I'm not going to be able to come.", verb: "aller", tense: "futur proche", priority: true },
  { type: "sentence", french: "Ça va être super !", english: "It's going to be great!", verb: "aller", tense: "futur proche", priority: true },

  // ALLER - Passé composé (uses ÊTRE!)
  { type: "sentence", french: "Je suis allé au supermarché.", english: "I went to the supermarket.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Je suis allé en France l'année dernière.", english: "I went to France last year.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Tu es allé où hier soir ?", english: "Where did you go last night?", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Tu es allée chez le coiffeur ?", english: "Did you go to the hairdresser?", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Il est allé voir ses parents.", english: "He went to see his parents.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Elle est allée à la gym ce matin.", english: "She went to the gym this morning.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "On est allés au restaurant.", english: "We went to the restaurant.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Nous sommes allés à la montagne.", english: "We went to the mountains.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Vous êtes allés au concert ?", english: "Did you go to the concert?", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ils sont allés en vacances en Espagne.", english: "They went on vacation to Spain.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Elles sont allées faire du shopping.", english: "They (f) went shopping.", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ça s'est bien passé ?", english: "Did it go well?", verb: "aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Comment ça s'est passé ?", english: "How did it go?", verb: "aller", tense: "passé composé", priority: true },

  // ALLER - Imparfait
  { type: "sentence", french: "J'allais souvent à la bibliothèque.", english: "I used to go to the library often.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "J'allais justement t'appeler.", english: "I was just about to call you.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu allais où quand je t'ai vu ?", english: "Where were you going when I saw you?", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Il allait à l'école à vélo.", english: "He used to bike to school.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Elle allait mieux avant.", english: "She was doing better before.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "On allait au cinéma tous les samedis.", english: "We used to go to the movies every Saturday.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Nous allions partir quand il est arrivé.", english: "We were about to leave when he arrived.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tout allait bien jusqu'à hier.", english: "Everything was going well until yesterday.", verb: "aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Comment allait ta mère ?", english: "How was your mother doing?", verb: "aller", tense: "imparfait", priority: true },

  // ALLER - Futur simple
  { type: "sentence", french: "J'irai te voir ce weekend.", english: "I will go see you this weekend.", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Tu iras à la fête ?", english: "Will you go to the party?", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Il ira loin dans la vie.", english: "He will go far in life.", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Nous irons en Italie l'été prochain.", english: "We will go to Italy next summer.", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Vous irez au bureau demain ?", english: "Will you go to the office tomorrow?", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Ils iront à la plage s'il fait beau.", english: "They will go to the beach if the weather is nice.", verb: "aller", tense: "futur", priority: true },
  { type: "sentence", french: "Ça ira mieux demain.", english: "It will be better tomorrow.", verb: "aller", tense: "futur", priority: true },

  // ALLER - Conditionnel
  { type: "sentence", french: "J'irais bien au cinéma ce soir.", english: "I would like to go to the movies tonight.", verb: "aller", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Tu irais où si tu pouvais voyager ?", english: "Where would you go if you could travel?", verb: "aller", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Ça irait si on se voyait demain ?", english: "Would it work if we met tomorrow?", verb: "aller", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Nous irions volontiers avec vous.", english: "We would gladly go with you.", verb: "aller", tense: "conditionnel", priority: true },
  { type: "sentence", french: "Il irait en France s'il avait de l'argent.", english: "He would go to France if he had money.", verb: "aller", tense: "conditionnel", priority: true },

  // === Mixed sentences using multiple verbs ===
  { type: "sentence", french: "Je suis fatigué parce que j'ai beaucoup travaillé.", english: "I'm tired because I worked a lot.", verb: "être/avoir", tense: "présent/passé", priority: true },
  { type: "sentence", french: "J'ai été content quand je suis allé à Paris.", english: "I was happy when I went to Paris.", verb: "avoir/être/aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Tu vas avoir du mal si tu n'es pas préparé.", english: "You're going to have trouble if you're not prepared.", verb: "aller/avoir/être", tense: "mixed", priority: true },
  { type: "sentence", french: "Nous allons être en retard si tu n'as pas fini.", english: "We're going to be late if you haven't finished.", verb: "aller/être/avoir", tense: "mixed", priority: true },
  { type: "sentence", french: "J'avais peur d'aller chez le dentiste.", english: "I was afraid to go to the dentist.", verb: "avoir/aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Elle a eu le temps d'aller au supermarché.", english: "She had time to go to the supermarket.", verb: "avoir/aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "On va avoir besoin d'être patients.", english: "We're going to need to be patient.", verb: "aller/avoir/être", tense: "mixed", priority: true },
  { type: "sentence", french: "J'étais sûr que tu allais être en retard.", english: "I was sure you were going to be late.", verb: "être/aller", tense: "imparfait", priority: true },
  { type: "sentence", french: "Tu as été où ? Je suis allé au parc.", english: "Where have you been? I went to the park.", verb: "être/aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Ils vont avoir une surprise quand ils seront là.", english: "They're going to have a surprise when they get there.", verb: "aller/avoir/être", tense: "mixed", priority: true },

  // More everyday expressions
  { type: "sentence", french: "Comment vas-tu ? Je vais très bien.", english: "How are you? I'm very well.", verb: "aller", tense: "présent", priority: true },
  { type: "sentence", french: "J'ai du travail à faire avant d'aller dormir.", english: "I have work to do before going to sleep.", verb: "avoir/aller", tense: "présent", priority: true },
  { type: "sentence", french: "Tu as le temps ? On va prendre un café.", english: "Do you have time? Let's go get a coffee.", verb: "avoir/aller", tense: "présent", priority: true },
  { type: "sentence", french: "Je n'ai pas été au bureau hier.", english: "I wasn't at the office yesterday.", verb: "avoir/être", tense: "passé composé", priority: true },
  { type: "sentence", french: "Elle est allée voir un film qu'elle avait envie de voir.", english: "She went to see a movie she wanted to see.", verb: "être/aller/avoir", tense: "mixed", priority: true },
  { type: "sentence", french: "Nous avons été contents d'aller vous voir.", english: "We were happy to go see you.", verb: "avoir/être/aller", tense: "passé composé", priority: true },
  { type: "sentence", french: "Il va y avoir du monde à la fête.", english: "There's going to be a lot of people at the party.", verb: "aller/avoir", tense: "futur proche", priority: true },
  { type: "sentence", french: "J'allais te demander si tu avais faim.", english: "I was going to ask you if you were hungry.", verb: "aller/avoir", tense: "imparfait", priority: true },
  { type: "sentence", french: "On est bien quand on a tout ce qu'il faut.", english: "We're comfortable when we have everything we need.", verb: "être/avoir", tense: "présent", priority: true },
  { type: "sentence", french: "Tu seras content quand tu auras fini.", english: "You'll be happy when you're done.", verb: "être/avoir", tense: "futur", priority: true },

  // === OTHER VERBS ===
  { type: "verb", french: "faire", english: "to do / to make", example: "Je fais du sport. (I do sports.)" },
  { type: "verb", french: "prendre", english: "to take", example: "J'ai pris le bus. (I took the bus.)" },
  { type: "verb", french: "venir", english: "to come", example: "Elle est venue. (She came.)" },
  { type: "verb", french: "voir", english: "to see / to meet up", example: "J'ai vu le film. (I saw the film.)" },
  { type: "verb", french: "partir", english: "to leave", example: "Je pars dans trois minutes. (I'm leaving in three minutes.)" },
  { type: "verb", french: "habiter", english: "to live", example: "J'habite à Houston. (I live in Houston.)" },
  { type: "verb", french: "manger", english: "to eat", example: "Je mange une pomme. (I eat an apple.)" },
  { type: "verb", french: "boire", english: "to drink", example: "J'ai bu de l'eau. (I drank water.)" },
  { type: "verb", french: "lire", english: "to read", example: "J'ai lu le livre. (I read the book.)" },
  { type: "verb", french: "écrire", english: "to write", example: "" },
  { type: "verb", french: "parler", english: "to speak", example: "Vous parlez français ? (Do you speak French?)" },
  { type: "verb", french: "écouter", english: "to listen", example: "J'écoute de la musique. (I listen to music.)" },
  { type: "verb", french: "acheter", english: "to buy", example: "J'ai acheté une peluche. (I bought a plushie.)" },
  { type: "verb", french: "vendre", english: "to sell", example: "Il vend des voitures. (He sells cars.)" },
  { type: "verb", french: "finir", english: "to finish", example: "J'ai déjà fini. (I already finished.)" },
  { type: "verb", french: "rester", english: "to stay", example: "Je suis resté trois jours. (I stayed three days.)" },
  { type: "verb", french: "travailler", english: "to work", example: "J'ai travaillé pendant 4 heures. (I worked for 4 hours.)" },
  { type: "verb", french: "entendre", english: "to hear", example: "Je t'entends. (I hear you.)" },
  { type: "verb", french: "connaître", english: "to know (person/place)", example: "Tu connais DJ Mehdi ? (Do you know DJ Mehdi?)" },
  { type: "verb", french: "savoir", english: "to know (fact)", example: "Je sais. (I know.)" },
  { type: "verb", french: "aimer", english: "to like / to love", example: "J'aime beaucoup le rock. (I really like rock.)" },
  { type: "verb", french: "tousser", english: "to cough", example: "Je tousse depuis deux jours. (I've been coughing for two days.)" },
  { type: "verb", french: "pleuvoir", english: "to rain", example: "Il pleut. (It's raining.)" },
  { type: "verb", french: "neiger", english: "to snow", example: "Il neige. (It's snowing.)" },
  { type: "verb", french: "conduire", english: "to drive", example: "Tu sais quelle voiture je conduis ? (Do you know what car I drive?)" },
  { type: "verb", french: "recevoir", english: "to receive / to get", example: "J'ai reçu des airpods. (I received airpods.)" },
  { type: "verb", french: "commander", english: "to order", example: "J'ai commandé le cybertruck. (I ordered the cybertruck.)" },
  { type: "verb", french: "courir", english: "to run", example: "Je vais aller courir. (I'm going to go running.)" },
  { type: "verb", french: "devoir", english: "must / to have to", example: "Je dois courir un semi-marathon. (I have to run a half-marathon.)" },
  { type: "verb", french: "retourner", english: "to go back / to return", example: "Je retourne à Berlin demain. (I'm going back to Berlin tomorrow.)" },
  { type: "verb", french: "mentir", english: "to lie", example: "Tu mens. (You're lying.)" },
  { type: "verb", french: "décorer", english: "to decorate", example: "On a décoré le sapin de Noël. (We decorated the Christmas tree.)" },
  { type: "verb", french: "cuisiner", english: "to cook", example: "J'ai cuisiné de la dinde. (I cooked turkey.)" },
  { type: "verb", french: "fumer", english: "to smoke", example: "J'ai fumé des joints hier. (I smoked joints yesterday.)" },
  { type: "verb", french: "se souvenir", english: "to remember", example: "Je me souviens pas. (I don't remember.)" },
  { type: "verb", french: "se doucher", english: "to shower (oneself)", example: "Je me suis douché. (I showered.)" },
  { type: "verb", french: "se détendre", english: "to relax", example: "Je suis détendu. (I am relaxed.)" },
  { type: "verb", french: "s'amuser", english: "to have fun", example: "Tu t'es trop amusé. (You had too much fun.)" },
  { type: "verb", french: "se débarrasser de", english: "to get rid of", example: "On va se débarrasser d'un mauvais employé. (We're going to get rid of a bad employee.)" },
  { type: "verb", french: "ressembler", english: "to look like", example: "Tu ressembles à Elon Musk. (You look like Elon Musk.)" },
  { type: "verb", french: "attendre", english: "to wait / hold on", example: "Attends. (Wait.)" },
  { type: "verb", french: "se passer", english: "to happen", example: "Qu'est-ce qu'il se passe ? (What's happening?)" },
  { type: "verb", french: "arrêter", english: "to stop", example: "J'ai arrêté pour me détendre. (I stopped to relax.)" },
  { type: "verb", french: "se brûler", english: "to burn oneself", example: "Je me suis brûlé. (I burned myself.)" },
  { type: "verb", french: "ouvrir", english: "to open", example: "J'ai ouvert la porte. (I opened the door.)" },

  // === EXPRESSIONS WITH AVOIR ===
  { type: "vocabulary", french: "avoir faim", english: "to be hungry", example: "J'ai faim. (I'm hungry.)" },
  { type: "vocabulary", french: "avoir soif", english: "to be thirsty", example: "" },
  { type: "vocabulary", french: "avoir besoin de", english: "to need", example: "J'ai besoin de plus de temps. (I need more time.)" },
  { type: "vocabulary", french: "avoir peur de", english: "to be scared of", example: "Elles ont peur de l'avion. (They're scared of flying.)" },
  { type: "vocabulary", french: "avoir de la chance", english: "to be lucky", example: "Vous avez de la chance ! (You're lucky!)" },
  { type: "vocabulary", french: "avoir le temps", english: "to have time", example: "J'ai pas le temps. (I don't have time.)" },

  // === EXPRESSIONS WITH ÊTRE ===
  { type: "vocabulary", french: "être fatigué(e)", english: "to be tired", example: "Je suis fatigué aujourd'hui. (I'm tired today.)" },
  { type: "vocabulary", french: "être en retard", english: "to be late", example: "Tu es très en retard ce matin. (You're very late this morning.)" },
  { type: "vocabulary", french: "être prêt(e)", english: "to be ready", example: "Elle est déjà prête. (She's already ready.)" },
  { type: "vocabulary", french: "être content(e)", english: "to be glad/happy", example: "On est content de te voir. (We're glad to see you.)" },
  { type: "vocabulary", french: "être en vacances", english: "to be on vacation", example: "Nous sommes en vacances cette semaine. (We're on vacation this week.)" },
  { type: "vocabulary", french: "être sûr(e)", english: "to be sure", example: "Vous êtes sûrs ? (Are you sure?)" },
  { type: "vocabulary", french: "être malade", english: "to be sick", example: "Je suis malade. (I'm sick.)" },
  { type: "vocabulary", french: "être en forme", english: "to have energy", example: "Je suis en forme. (I have energy.)" },
  { type: "vocabulary", french: "être à l'heure", english: "to be on time", example: "" },
  { type: "vocabulary", french: "être d'accord", english: "to agree", example: "On est d'accord. (We agree.)" },
  { type: "vocabulary", french: "être de retour", english: "to be back", example: "Je suis de retour à Berlin. (I'm back in Berlin.)" },

  // === EXPRESSIONS WITH FAIRE ===
  { type: "vocabulary", french: "faire les courses", english: "to run errands / grocery shopping", example: "Je vais faire les courses. (I'm going grocery shopping.)" },
  { type: "vocabulary", french: "faire du shopping", english: "to go shopping", example: "J'ai fait du shopping. (I went shopping.)" },
  { type: "vocabulary", french: "faire du sport", english: "to do sports", example: "On fait du sport le week-end. (We do sports on weekends.)" },
  { type: "vocabulary", french: "faire la cuisine", english: "to cook", example: "" },
  { type: "vocabulary", french: "faire la vaisselle", english: "to do the dishes", example: "" },
  { type: "vocabulary", french: "faire une erreur", english: "to make a mistake", example: "Il a fait une erreur. (He made a mistake.)" },
  { type: "vocabulary", french: "faire un jogging", english: "to go jogging", example: "Je vais faire un jogging. (I'm going jogging.)" },

  // === WEATHER ===
  { type: "vocabulary", french: "Il fait beau", english: "It's nice weather", example: "" },
  { type: "vocabulary", french: "Il fait moche", english: "It's bad weather", example: "Il fait moche, il fait gris. (It's ugly weather, it's grey.)" },
  { type: "vocabulary", french: "Il fait froid", english: "It's cold", example: "" },
  { type: "vocabulary", french: "Il fait chaud", english: "It's hot", example: "" },
  { type: "vocabulary", french: "Il pleut", english: "It's raining", example: "" },
  { type: "vocabulary", french: "Il neige", english: "It's snowing", example: "Il neige ici. (It's snowing here.)" },
  { type: "vocabulary", french: "Il fait nuageux", english: "It's cloudy", example: "" },

  // === TIME EXPRESSIONS ===
  { type: "vocabulary", french: "aujourd'hui", english: "today", example: "" },
  { type: "vocabulary", french: "hier", english: "yesterday", example: "" },
  { type: "vocabulary", french: "demain", english: "tomorrow", example: "" },
  { type: "vocabulary", french: "avant-hier", english: "the day before yesterday", example: "J'étais au sauna avant-hier. (I was at the sauna the day before yesterday.)" },
  { type: "vocabulary", french: "après-demain", english: "the day after tomorrow", example: "" },
  { type: "vocabulary", french: "maintenant", english: "now", example: "" },
  { type: "vocabulary", french: "toujours", english: "always", example: "" },
  { type: "vocabulary", french: "souvent", english: "often", example: "Tu cours souvent ? (Do you run often?)" },
  { type: "vocabulary", french: "tous les jours", english: "every day", example: "Je jouais dehors tous les jours. (I used to play outside every day.)" },
  { type: "vocabulary", french: "depuis", english: "since / for (ongoing)", example: "Je tousse depuis deux jours. (I've been coughing for two days.)" },
  { type: "vocabulary", french: "pendant", english: "during / for (completed)", example: "J'ai travaillé pendant 4 heures. (I worked for 4 hours.)" },
  { type: "vocabulary", french: "il y a", english: "ago", example: "Il y a 5 ans. (5 years ago.)" },
  { type: "vocabulary", french: "dans", english: "in (future time)", example: "Dans 5 minutes. (In 5 minutes.)" },

  // === DAYS OF THE WEEK ===
  { type: "vocabulary", french: "lundi", english: "Monday", example: "" },
  { type: "vocabulary", french: "mardi", english: "Tuesday", example: "" },
  { type: "vocabulary", french: "mercredi", english: "Wednesday", example: "" },
  { type: "vocabulary", french: "jeudi", english: "Thursday", example: "" },
  { type: "vocabulary", french: "vendredi", english: "Friday", example: "" },
  { type: "vocabulary", french: "samedi", english: "Saturday", example: "" },
  { type: "vocabulary", french: "dimanche", english: "Sunday", example: "" },

  // === TIME DURATIONS ===
  { type: "vocabulary", french: "une seconde", english: "a second", example: "" },
  { type: "vocabulary", french: "une minute", english: "a minute", example: "" },
  { type: "vocabulary", french: "une heure", english: "an hour", example: "" },
  { type: "vocabulary", french: "un jour / une journée", english: "a day", example: "" },
  { type: "vocabulary", french: "une semaine", english: "a week", example: "" },
  { type: "vocabulary", french: "un mois", english: "a month", example: "" },
  { type: "vocabulary", french: "un an / une année", english: "a year", example: "" },

  // === CONNECTORS ===
  { type: "vocabulary", french: "et", english: "and", example: "" },
  { type: "vocabulary", french: "ou", english: "or", example: "Tu préfères Londres ou Paris ? (Do you prefer London or Paris?)" },
  { type: "vocabulary", french: "mais", english: "but", example: "Il a faim mais il est pauvre. (He's hungry but he's poor.)" },
  { type: "vocabulary", french: "pour", english: "for", example: "" },
  { type: "vocabulary", french: "alors", english: "then / so", example: "" },
  { type: "vocabulary", french: "donc", english: "so / therefore", example: "" },
  { type: "vocabulary", french: "avec", english: "with", example: "" },
  { type: "vocabulary", french: "parce que", english: "because", example: "" },
  { type: "vocabulary", french: "que", english: "than / that", example: "" },
  { type: "vocabulary", french: "très", english: "very", example: "" },
  { type: "vocabulary", french: "ensuite", english: "afterwards / then", example: "" },
  { type: "vocabulary", french: "après", english: "after", example: "" },
  { type: "vocabulary", french: "avant", english: "before", example: "" },

  // === GENERAL VOCABULARY ===
  { type: "vocabulary", french: "beaucoup", english: "a lot / much", example: "Beaucoup de choses à faire. (A lot of things to do.)" },
  { type: "vocabulary", french: "trop", english: "too / too much", example: "Tu t'es trop amusé. (You had too much fun.)" },
  { type: "vocabulary", french: "propre", english: "clean", example: "C'est plus propre que Londres. (It's cleaner than London.)" },
  { type: "vocabulary", french: "sale", english: "dirty", example: "Londres est sale. (London is dirty.)" },
  { type: "vocabulary", french: "cher", english: "expensive", example: "" },
  { type: "vocabulary", french: "pas cher", english: "cheap / not expensive", example: "" },
  { type: "vocabulary", french: "bon(ne)", english: "good", example: "Tu as une bonne idée. (You have a good idea.)" },
  { type: "vocabulary", french: "mauvais(e)", english: "bad", example: "Un mauvais employé. (A bad employee.)" },
  { type: "vocabulary", french: "premier(e)", english: "first", example: "" },
  { type: "vocabulary", french: "dernier(e)", english: "last", example: "Le dernier week-end. (The last weekend.)" },
  { type: "vocabulary", french: "prochain(e)", english: "next", example: "La semaine prochaine. (Next week.)" },

  // === PEOPLE & THINGS ===
  { type: "vocabulary", french: "quelqu'un", english: "someone / somebody", example: "On va virer quelqu'un. (We're going to fire someone.)" },
  { type: "vocabulary", french: "quelque chose", english: "something", example: "" },
  { type: "vocabulary", french: "tout le monde", english: "everybody / everyone", example: "Tout le monde me dit... (Everyone tells me...)" },
  { type: "vocabulary", french: "une chose / un truc", english: "a thing", example: "" },
  { type: "vocabulary", french: "un jouet", english: "a toy", example: "" },
  { type: "vocabulary", french: "des restes", english: "leftovers", example: "C'était les restes de thanksgiving. (It was the Thanksgiving leftovers.)" },

  // === FOOD & DRINK ===
  { type: "vocabulary", french: "du pain", english: "bread", example: "" },
  { type: "vocabulary", french: "une pomme", english: "an apple", example: "" },
  { type: "vocabulary", french: "de la dinde", english: "turkey", example: "J'ai cuisiné de la dinde. (I cooked turkey.)" },
  { type: "vocabulary", french: "de la purée", english: "mashed potatoes", example: "" },
  { type: "vocabulary", french: "du vin", english: "wine", example: "" },
  { type: "vocabulary", french: "du vin chaud", english: "mulled wine", example: "" },
  { type: "vocabulary", french: "de la bière", english: "beer", example: "J'ai bu des bières. (I drank beers.)" },
  { type: "vocabulary", french: "un café", english: "a coffee", example: "Je voudrais un café, s'il vous plaît. (I would like a coffee, please.)" },
  { type: "vocabulary", french: "de l'eau", english: "water", example: "" },
  { type: "vocabulary", french: "des bonbons", english: "candies", example: "" },
  { type: "vocabulary", french: "un gâteau", english: "a cake", example: "" },

  // === PLACES ===
  { type: "vocabulary", french: "un ordinateur", english: "a computer", example: "" },
  { type: "vocabulary", french: "une maison", english: "a house", example: "" },
  { type: "vocabulary", french: "le magasin", english: "the shop", example: "" },
  { type: "vocabulary", french: "le sapin de Noël", english: "the Christmas tree", example: "On a décoré le sapin de Noël. (We decorated the Christmas tree.)" },
  { type: "vocabulary", french: "la boulangerie", english: "the bakery", example: "Je vais à la boulangerie. (I'm going to the bakery.)" },
  { type: "vocabulary", french: "la piscine", english: "the pool", example: "Tu vas à la piscine. (You're going to the pool.)" },
  { type: "vocabulary", french: "le médecin", english: "the doctor", example: "Tu es allé chez le médecin ? (Did you go to the doctor?)" },
  { type: "vocabulary", french: "le dentiste", english: "the dentist", example: "" },

  // === TRANSPORT ===
  { type: "vocabulary", french: "prendre le métro", english: "to take the subway", example: "On a pris le métro. (We took the subway.)" },
  { type: "vocabulary", french: "prendre l'avion", english: "to take the plane", example: "Je prends l'avion demain matin. (I'm taking the plane tomorrow morning.)" },
  { type: "vocabulary", french: "prendre le train", english: "to take the train", example: "" },
  { type: "vocabulary", french: "prendre la voiture", english: "to take the car", example: "" },
  { type: "vocabulary", french: "un vol direct", english: "a direct flight", example: "C'est un vol direct ? (Is it a direct flight?)" },

  // === NEGATION ===
  { type: "vocabulary", french: "ne...pas", english: "not", example: "Je suis pas français. (I'm not French.)" },
  { type: "vocabulary", french: "ne...pas encore", english: "not yet", example: "Je suis pas encore allé chez le médecin. (I haven't gone to the doctor yet.)" },
  { type: "vocabulary", french: "pas grand chose", english: "not much", example: "Pas grand chose à faire. (Not much to do.)" },

  // === DEMONSTRATIVES ===
  { type: "vocabulary", french: "ce / cet (masc)", english: "this", example: "Cet ordinateur. (This computer.)" },
  { type: "vocabulary", french: "cette (fem)", english: "this", example: "Cette semaine. (This week.)" },
  { type: "vocabulary", french: "ces", english: "these", example: "" },

  // === QUESTIONS ===
  { type: "vocabulary", french: "combien de temps", english: "how long", example: "Combien de temps ? (How long?)" },
  { type: "vocabulary", french: "quoi d'autre", english: "what else", example: "Tu as fait quoi d'autre ? (What else did you do?)" },
  { type: "vocabulary", french: "pourquoi", english: "why", example: "" },
  { type: "vocabulary", french: "quand", english: "when", example: "Quand ça ? (When?)" },
  { type: "vocabulary", french: "où", english: "where", example: "Tu habites où ? (Where do you live?)" },
  { type: "vocabulary", french: "qui", english: "who", example: "" },
  { type: "vocabulary", french: "comment", english: "how", example: "Comment ça va ? (How are you?)" },
  { type: "vocabulary", french: "qu'est-ce que", english: "what (question)", example: "Qu'est-ce que tu as fait ? (What did you do?)" },

  // === USEFUL PHRASES ===
  { type: "vocabulary", french: "de l'argent", english: "money", example: "J'ai reçu de l'argent. (I received money.)" },
  { type: "vocabulary", french: "Bonne année", english: "Happy New Year", example: "" },
  { type: "vocabulary", french: "Bonne chance", english: "Good luck", example: "" },
  { type: "vocabulary", french: "c'est pas grave", english: "it's not a big deal", example: "" },
  { type: "vocabulary", french: "ça va nickel", english: "it's going great", example: "" },
  { type: "vocabulary", french: "tranquille", english: "calm / chill", example: "Oui tranquille. (Yeah, chill.)" },

  // === EXAMPLE SENTENCES ===
  { type: "sentence", french: "Je mange une pomme.", english: "I am eating an apple.", example: "" },
  { type: "sentence", french: "J'ai rencontré Marie hier.", english: "I met Marie yesterday.", example: "" },
  { type: "sentence", french: "Quand j'étais enfant, je jouais dehors tous les jours.", english: "When I was a child, I used to play outside every day.", example: "" },
  { type: "sentence", french: "Je vais partir dans cinq minutes.", english: "I'm gonna leave in five minutes.", example: "" },
  { type: "sentence", french: "Je voyagerai en France l'année prochaine.", english: "I will travel to France next year.", example: "" },
  { type: "sentence", french: "Je voudrais un café, s'il vous plaît.", english: "I would like a coffee, please.", example: "" },
  { type: "sentence", french: "Il faut que tu viennes demain.", english: "It's necessary that you come tomorrow.", example: "" },
  { type: "sentence", french: "Ferme la porte, s'il te plaît.", english: "Close the door, please.", example: "" },
  { type: "sentence", french: "Quand tu arriveras, j'aurai déjà mangé.", english: "When you arrive, I will have already eaten.", example: "" },
  { type: "sentence", french: "J'avais déjà fini quand il est arrivé.", english: "I had already finished when he arrived.", example: "" },
  { type: "sentence", french: "J'aurais acheté la maison si j'avais eu l'argent.", english: "I would have bought the house if I had had the money.", example: "" },
  { type: "sentence", french: "Je suis monté.", english: "I went up.", example: "" },
  { type: "sentence", french: "J'ai monté une boîte.", english: "I founded a company.", example: "" },
  { type: "sentence", french: "Les fleurs que j'ai achetées sont jolies.", english: "The flowers that I bought are pretty.", example: "" },
  { type: "sentence", french: "Je dirige une entreprise qui gère des logiciels.", english: "I run a company that manages software.", example: "" },
  { type: "sentence", french: "On va partir à 4h.", english: "We're gonna leave at 4 o'clock.", example: "" },
  { type: "sentence", french: "On va partir dans 6 heures.", english: "We're gonna leave in 6 hours.", example: "" },
  { type: "sentence", french: "On a visité le musée d'Harry Potter.", english: "We visited the Harry Potter museum.", example: "" },
  { type: "sentence", french: "C'est plus propre que Londres.", english: "It's cleaner than London.", example: "" },
  { type: "sentence", french: "Combien de temps est-ce que vous êtes restés à Londres ?", english: "How long did you stay in London?", example: "" },
  { type: "sentence", french: "J'ai bu des bières de noël en mangeant.", english: "I drank Christmas beers while eating.", example: "" },
  { type: "sentence", french: "On a acheté le sapin il y a 5 ans.", english: "We bought the tree 5 years ago.", example: "" },
  { type: "sentence", french: "J'ai commandé le cybertruck il y a 4 ans.", english: "I ordered the cybertruck 4 years ago.", example: "" },
  { type: "sentence", french: "Tu l'as reçu quand ?", english: "When did you receive it?", example: "" },
  { type: "sentence", french: "Je dois courir un semi-marathon avec ma femme dans une semaine.", english: "I have to run a half-marathon with my wife in a week.", example: "" },
  { type: "sentence", french: "Ce n'est plus ta petite amie depuis le marathon.", english: "She hasn't been your girlfriend since the marathon.", example: "" },
  { type: "sentence", french: "C'était le dernier week-end avant la rentrée.", english: "It was the last weekend before school started.", example: "" },
  { type: "sentence", french: "Il y a de la neige.", english: "There is snow.", example: "" },
  { type: "sentence", french: "Ce sont des menteurs.", english: "They are liars.", example: "" },
  { type: "sentence", french: "Qu'est-ce que tu as prévu pour cette semaine ?", english: "What do you have planned for this week?", example: "" },
  { type: "sentence", french: "Un client est parti à cause de lui.", english: "A client left because of him.", example: "" },
  { type: "sentence", french: "Je vais te parler dans deux semaines, le 3 décembre.", english: "I'll talk to you in two weeks, on December 3rd.", example: "" },

  // ============================================================
  // NUMBERS - Les Nombres
  // ============================================================

  // 1-20 (all)
  { type: "vocabulary", french: "un", english: "1 (one)", example: "" },
  { type: "vocabulary", french: "deux", english: "2 (two)", example: "" },
  { type: "vocabulary", french: "trois", english: "3 (three)", example: "" },
  { type: "vocabulary", french: "quatre", english: "4 (four)", example: "" },
  { type: "vocabulary", french: "cinq", english: "5 (five)", example: "" },
  { type: "vocabulary", french: "six", english: "6 (six)", example: "" },
  { type: "vocabulary", french: "sept", english: "7 (seven)", example: "" },
  { type: "vocabulary", french: "huit", english: "8 (eight)", example: "" },
  { type: "vocabulary", french: "neuf", english: "9 (nine)", example: "" },
  { type: "vocabulary", french: "dix", english: "10 (ten)", example: "" },
  { type: "vocabulary", french: "onze", english: "11 (eleven)", example: "" },
  { type: "vocabulary", french: "douze", english: "12 (twelve)", example: "" },
  { type: "vocabulary", french: "treize", english: "13 (thirteen)", example: "" },
  { type: "vocabulary", french: "quatorze", english: "14 (fourteen)", example: "" },
  { type: "vocabulary", french: "quinze", english: "15 (fifteen)", example: "" },
  { type: "vocabulary", french: "seize", english: "16 (sixteen)", example: "" },
  { type: "vocabulary", french: "dix-sept", english: "17 (seventeen)", example: "" },
  { type: "vocabulary", french: "dix-huit", english: "18 (eighteen)", example: "" },
  { type: "vocabulary", french: "dix-neuf", english: "19 (nineteen)", example: "" },
  { type: "vocabulary", french: "vingt", english: "20 (twenty)", example: "" },

  // 20-30
  { type: "vocabulary", french: "vingt et un", english: "21 (twenty-one)", example: "" },
  { type: "vocabulary", french: "vingt-cinq", english: "25 (twenty-five)", example: "" },

  // 30-40
  { type: "vocabulary", french: "trente", english: "30 (thirty)", example: "" },
  { type: "vocabulary", french: "trente-six", english: "36 (thirty-six)", example: "" },

  // 40-50
  { type: "vocabulary", french: "quarante", english: "40 (forty)", example: "" },
  { type: "vocabulary", french: "quarante-huit", english: "48 (forty-eight)", example: "" },

  // 50-60
  { type: "vocabulary", french: "cinquante", english: "50 (fifty)", example: "" },
  { type: "vocabulary", french: "cinquante-quatre", english: "54 (fifty-four)", example: "" },

  // 60-70
  { type: "vocabulary", french: "soixante", english: "60 (sixty)", example: "" },
  { type: "vocabulary", french: "soixante-sept", english: "67 (sixty-seven)", example: "" },

  // 70-80 (note: French uses 60+10 system)
  { type: "vocabulary", french: "soixante-dix", english: "70 (seventy)", example: "Literally: sixty-ten" },
  { type: "vocabulary", french: "soixante-quinze", english: "75 (seventy-five)", example: "Literally: sixty-fifteen" },

  // 80-90 (note: French uses 4×20 system)
  { type: "vocabulary", french: "quatre-vingts", english: "80 (eighty)", example: "Literally: four-twenties" },
  { type: "vocabulary", french: "quatre-vingt-six", english: "86 (eighty-six)", example: "" },

  // 90-100 (note: French uses 4×20+10 system)
  { type: "vocabulary", french: "quatre-vingt-dix", english: "90 (ninety)", example: "Literally: four-twenties-ten" },
  { type: "vocabulary", french: "quatre-vingt-dix-sept", english: "97 (ninety-seven)", example: "" },

  // 100
  { type: "vocabulary", french: "cent", english: "100 (one hundred)", example: "" },

  // 100-120
  { type: "vocabulary", french: "cent cinq", english: "105 (one hundred five)", example: "" },
  { type: "vocabulary", french: "cent douze", english: "112 (one hundred twelve)", example: "" },

  // 120-140
  { type: "vocabulary", french: "cent vingt", english: "120 (one hundred twenty)", example: "" },
  { type: "vocabulary", french: "cent trente-trois", english: "133 (one hundred thirty-three)", example: "" },

  // 140-160
  { type: "vocabulary", french: "cent quarante", english: "140 (one hundred forty)", example: "" },
  { type: "vocabulary", french: "cent cinquante-cinq", english: "155 (one hundred fifty-five)", example: "" },

  // 160-180
  { type: "vocabulary", french: "cent soixante", english: "160 (one hundred sixty)", example: "" },
  { type: "vocabulary", french: "cent soixante-dix-huit", english: "178 (one hundred seventy-eight)", example: "" },

  // 180-200
  { type: "vocabulary", french: "cent quatre-vingts", english: "180 (one hundred eighty)", example: "" },
  { type: "vocabulary", french: "cent quatre-vingt-dix-neuf", english: "199 (one hundred ninety-nine)", example: "" },
  { type: "vocabulary", french: "deux cents", english: "200 (two hundred)", example: "" },
];

// Make data available globally
window.flashcardData = flashcardData;
