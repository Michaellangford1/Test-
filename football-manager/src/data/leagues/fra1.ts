import { club, type RawLeague } from '../types';

export const fra1: RawLeague = {
  id: 'fra1',
  name: 'Ligue 1',
  short: 'LI1',
  country: 'FRA',
  tier: 1,
  tv: 25,
  europe: 5,
  clubs: [
    club('Paris Saint-Germain', 'PSG', 95, 'Parc des Princes', 47929, ['#004170', '#DA291C'], 250, `
Lucas Chevalier|GK|23|FRA|82/87
Matvey Safonov|GK|26|RUS|78
Achraf Hakimi|DR|26|MAR|88|pace,crosser
Marquinhos|DC|31|BRA|86|leader
Willian Pacho|DC|23|ECU|84/87
Illia Zabarnyi|DC|22|UKR|82/86
Lucas Beraldo|DC|21|BRA|78/84
Nuno Mendes|DL|23|POR|87/89|pace,dribbler
Lucas Hernández|DL/DC|29|FRA|80
Vitinha|MC|25|POR|89|playmaker
João Neves|MC|20|POR|86/91|engine
Fabián Ruiz|MC|29|ESP|84
Warren Zaïre-Emery|MC/DR|19|FRA|82/89
Senny Mayulu|MC|19|FRA|74/84
Lee Kang-in|AMC/AMR|24|KOR|80|set
Ousmane Dembélé|ST/AMR|28|FRA|90|dribbler,pace
Khvicha Kvaratskhelia|AML|24|GEO|88|dribbler,flair
Désiré Doué|AMR/AML|20|FRA|85/91|dribbler
Bradley Barcola|AML|22|FRA|84/87|pace
Ibrahim Mbaye|AML|17|FRA|70/86
Gonçalo Ramos|ST|24|POR|80
`),
    club('Marseille', 'OM', 84, 'Stade Vélodrome', 67394, ['#2FAEE0', '#FFFFFF'], 50, `
Gerónimo Rulli|GK|33|ARG|82
Jeffrey de Lange|GK|27|NED|70
Leonardo Balerdi|DC|26|ARG|80
Benjamin Pavard|DC/DR|29|FRA|80
Nayef Aguerd|DC|29|MAR|79
Facundo Medina|DC/DL|26|ARG|78
CJ Egan-Riley|DC|22|ENG|73
Timothy Weah|DR/AMR|25|USA|77
Amir Murillo|DR|29|PAN|75
Emerson Palmieri|DL|31|ITA|76
Pierre-Emile Højbjerg|DM|29|DEN|81|leader
Geoffrey Kondogbia|DM|32|CTA|77
Arthur Vermeeren|MC|20|BEL|77/84
Matt O'Riley|MC|24|DEN|78
Angel Gomes|AMC/MC|24|ENG|77
Hamed Junior Traorè|AMC|25|CIV|76
Bilal Nadir|AMC|21|FRA|72
Mason Greenwood|AMR|23|JAM|83|finisher,sniper
Igor Paixão|AML|25|BRA|79
Amine Gouiri|ST/AML|25|ALG|80
Pierre-Emerick Aubameyang|ST|36|GAB|78|finisher
`),
    club('Monaco', 'MON', 82, 'Stade Louis II', 18523, ['#E2001A', '#FFFFFF'], 60, `
Philipp Köhn|GK|27|SUI|77
Lukáš Hrádecký|GK|35|FIN|79
Thilo Kehrer|DC|28|GER|78
Mohammed Salisu|DC|26|GHA|78
Eric Dier|DC|31|ENG|76
Christian Mawissa|DC|20|FRA|73/80
Jordan Teze|DR/DC|25|NED|75
Vanderson|DR|24|BRA|79
Caio Henrique|DL|27|BRA|79|crosser
Kassoum Ouattara|DL|21|BFA|72
Denis Zakaria|DM|28|SUI|81|leader
Lamine Camara|MC|21|SEN|78/84
Mamadou Coulibaly|DM|21|FRA|73
Paul Pogba|MC|32|FRA|75
Aleksandr Golovin|AMC|29|RUS|79
Maghnes Akliouche|AMR/AMC|23|FRA|81/85|dribbler
Takumi Minamino|AML/AMC|30|JPN|78
Krépin Diatta|AMR|26|SEN|75
Ansu Fati|AML|22|ESP|74
Folarin Balogun|ST|24|USA|78
Mika Biereth|ST|22|DEN|78/83
George Ilenikhena|ST|19|NGA|73/82
`),
    club('Nice', 'NIC', 77, 'Allianz Riviera', 36178, ['#E30613', '#000000'], 30, `
Yehvann Diouf|GK|26|FRA|77
Maxime Dupé|GK|32|FRA|70
Dante|DC|41|BRA|72|leader
Antoine Mendy|DC|21|FRA|73
Moïse Bombito|DC|25|CAN|77|pace
Juma Bah|DC|19|SLE|72/81
Kojo Peprah Oppong|DC|21|GHA|72
Jonathan Clauss|DR|32|FRA|76|crosser
Melvin Bard|DL|24|FRA|76
Ali Abdi|DL|31|TUN|72
Hicham Boudaoui|MC|25|ALG|77
Charles Vanhoutte|DM|26|BEL|75
Morgan Sanson|MC|31|FRA|74
Tanguy Ndombele|MC|28|FRA|74
Tom Louchet|MC|22|FRA|71
Sofiane Diop|AMC/AML|25|MAR|77
Jérémie Boga|AML|28|CIV|75
Mohamed-Ali Cho|AML|21|FRA|74
Tiago Gouveia|AMR|24|POR|73
Isak Jansson|AMR|23|SWE|73
Terem Moffi|ST|26|NGA|75
Kevin Carlos|ST|24|SUI|72
`),
    club('Lille', 'LIL', 80, 'Stade Pierre-Mauroy', 50186, ['#E01E13', '#1B2A5D'], 40, `
Berke Özer|GK|25|TUR|77
Arnaud Bodart|GK|27|BEL|70
Alexsandro Ribeiro|DC|26|BRA|79
Nathan Ngoy|DC|21|BEL|74/80
Chancel Mbemba|DC|30|COD|77
Aïssa Mandi|DC/DR|33|ALG|75
Thomas Meunier|DR|33|BEL|74
Tiago Santos|DR|22|POR|75
Romain Perraud|DL|27|FRA|75
Calvin Verdonk|DL|28|NED|73
Benjamin André|DM|34|FRA|77|leader
Ayyoub Bouaddi|DM|17|FRA|74/88
Nabil Bentaleb|MC|30|ALG|74
André Gomes|MC|32|POR|73
Ngal'ayel Mukau|MC|20|BEL|73/80
Hákon Arnar Haraldsson|AMC|22|ISL|78/82
Osame Sahraoui|AML|24|NOR|75
Matías Fernández-Pardo|AML|20|BEL|75/82
Félix Correia|AMR|24|POR|73
Hamza Igamane|ST|22|MAR|74
Olivier Giroud|ST|38|FRA|74|aerial
`),
    club('Lyon', 'OL', 81, 'Groupama Stadium', 59186, ['#FFFFFF', '#1C3F94'], 20, `
Dominik Greif|GK|28|SVK|75
Rémy Descamps|GK|29|FRA|70
Moussa Niakhaté|DC|29|SEN|78
Clinton Mata|DC/DR|32|ANG|75
Ruben Kluivert|DC|24|NED|73
Ainsley Maitland-Niles|DR|27|ENG|75
Hans Hateboer|DR|31|NED|70
Nicolás Tagliafico|DL|32|ARG|77
Abner|DL|25|BRA|74
Tanner Tessmann|DM|23|USA|76
Orel Mangala|DM|27|BEL|75
Tyler Morton|DM|22|ENG|75
Corentin Tolisso|MC|30|FRA|77
Khalis Merah|MC|19|FRA|70/80
Pavel Šulc|AMC|24|CZE|76
Malick Fofana|AML|20|BEL|79/86|pace,dribbler
Ernest Nuamah|AMR|21|GHA|73
Afonso Moreira|AML|20|POR|72/80
Adam Karabec|AML|21|CZE|73
Martín Satriano|ST|24|URU|73
`),
    club('Strasbourg', 'RCS', 74, 'Stade de la Meinau', 26109, ['#009FE3', '#FFFFFF'], 30, `
Mike Penders|GK|19|BEL|72/83
Karl-Johan Johnsson|GK|35|SWE|70
Guéla Doué|DR/DC|22|CIV|76
Andrew Omobamidele|DC|23|IRL|73
Mamadou Sarr|DC|19|FRA|74/83
Ismaël Doukouré|DC|22|FRA|74
Abakar Sylla|DC|22|CIV|72
Lucas Høgsberg|DC|19|DEN|70/78
Ben Chilwell|DL|28|ENG|74
Valentín Barco|DL/MC|21|ARG|75/81
Diego Moreira|AML/DL|21|BEL|75/81
Mathis Amougou|DM|19|FRA|72/80
Félix Lemaréchal|MC|21|FRA|73
Kendry Páez|AMC|18|ECU|74/86
Julio Enciso|AMC|21|PAR|75/81
Sebastian Nanasi|AMR|23|SWE|75
Óscar Perea|AMR|20|COL|71/78
Emanuel Emegha|ST|22|NED|75/81
Joaquín Panichelli|ST|22|ARG|74
Sékou Mara|ST|22|FRA|72
`),
    club('Lens', 'RCL', 76, 'Stade Bollaert-Delelis', 38223, ['#FFE600', '#E2001A'], 15, `
Robin Risser|GK|20|FRA|74/82
Régis Gurtner|GK|38|FRA|68
Jonathan Gradit|DC|32|FRA|74
Malang Sarr|DC|26|FRA|74
Samson Baidoo|DC|21|AUT|73/79
Ismaëlo Ganiou|DC|20|FRA|71
Ruben Aguilar|DR|32|FRA|72
Saud Abdulhamid|DR|26|KSA|72
Matthieu Udol|DL|29|FRA|73
Deiver Machado|DL|32|COL|72
Adrien Thomasson|MC|31|FRA|75
Mamadou Sangaré|MC|23|MLI|74
Florian Thauvin|AMR|32|FRA|77|sniper
Abdallah Sima|AMR|24|SEN|74
Allan Saint-Maximin|AML|28|FRA|75|dribbler
Anthony Bermont|AMR|20|FRA|70
Wesley Saïd|ST/AML|30|FRA|74
Odsonne Édouard|ST|27|FRA|74
Rémy Labeau Lascary|ST|22|FRA|71
`),
    club('Brest', 'SB29', 70, 'Stade Francis-Le Blé', 15931, ['#E2001A', '#FFFFFF'], 15, `
Radosław Majecki|GK|25|POL|73
Grégoire Coudert|GK|26|FRA|70
Brendan Chardonnet|DC|30|FRA|74
Soumaïla Coulibaly|DC|21|FRA|73
Julien Le Cardinal|DC|27|FRA|72
Kenny Lala|DR|34|FRA|71
Bradley Locko|DL|23|FRA|74
Mahdi Camara|DM|27|FRA|74
Joris Chotard|DM|23|FRA|72
Hugo Magnetti|MC|27|FRA|74
Edimilson Fernandes|MC|29|SUI|73
Kamory Doumbia|AMC|22|MLI|73
Romain Del Castillo|AMR|29|FRA|76|set
Mama Baldé|AML|29|GNB|72
Ludovic Ajorque|ST|31|FRA|74|aerial
`),
    club('Toulouse', 'TFC', 69, 'Stadium de Toulouse', 33150, ['#6B3FA0', '#FFFFFF'], 20, `
Guillaume Restes|GK|20|FRA|76/84
Kjetil Haug|GK|27|NOR|68
Rasmus Nicolaisen|DC|28|DEN|74
Mark McKenzie|DC|26|USA|74
Charlie Cresswell|DC|22|ENG|74
Warren Kamanzi|DR|24|NOR|72
Djibril Sidibé|DR|32|FRA|70
Cristian Cásseres Jr.|MC|25|VEN|74
Abu Francis|MC|24|GHA|72
Dayann Methalie|DM|23|FRA|70
Santiago Hidalgo|AMC|20|ARG|71/78
Aron Dønnum|AMR|27|NOR|74
Zakaria Aboukhlal|AMR|25|MAR|75
Yann Gboho|AMR|24|CIV|73
Mario Sauer|AML|21|SVK|70
Frank Magri|ST|26|CMR|73
Emersonn|ST|22|BRA|70
`),
    club('Auxerre', 'AJA', 64, "Stade de l'Abbé-Deschamps", 18541, ['#FFFFFF', '#0056A7'], 8, `
Donovan Léon|GK|33|GUF|74
Théo De Percin|GK|24|FRA|70
Jubal|DC|31|BRA|72
Sinaly Diomandé|DC|24|CIV|72
Clément Akpa|DC|24|FRA|70
Paul Joly|DR|25|FRA|71
Gideon Mensah|DL|27|GHA|73
Fredrik Oppegård|DL|23|NOR|71
Elisha Owusu|DM|27|GHA|73
Oussama El Azzouzi|MC|24|MAR|72
Kévin Danois|MC|21|FRA|71
Lasso Coulibaly|MC|22|CIV|71
Romain Faivre|AMC|27|FRA|73
Lassine Sinayoko|ST/AMR|25|MLI|74
Ado Onaiwu|ST|29|JPN|71
Danny Namaso|ST|25|ENG|71
`),
    club('Rennes', 'SRFC', 77, 'Roazhon Park', 29778, ['#E13327', '#000000'], 40, `
Brice Samba|GK|31|FRA|79
Mathys Silistrie|GK|21|FRA|66
Anthony Rouault|DC|24|FRA|74
Jérémy Jacquet|DC|20|FRA|73/80
Christopher Wooh|DC|23|CMR|73
Lilian Brassier|DC/DL|25|FRA|74
Abdelhamid Aït Boudlal|DC|19|MAR|70/78
Alidu Seidu|DR/DC|25|GHA|74
Przemysław Frankowski|WBR|30|POL|74
Quentin Merlin|DL|23|FRA|74
Valentin Rongier|DM|30|FRA|77
Seko Fofana|MC|30|CIV|77
Djaoui Cissé|MC|21|FRA|73
Glen Kamara|MC|29|FIN|74
Sebastian Szymański|AMC|26|POL|77
Ludovic Blas|AMC|27|FRA|75
Mousa Al-Tamari|AMR|28|JOR|75
Breel Embolo|ST|28|SUI|77|strong
Esteban Lepaul|ST|25|FRA|75
Mohamed Kader Meïté|ST|18|FRA|70/80
`),
    club('Nantes', 'FCN', 66, 'Stade de la Beaujoire', 35322, ['#FCD405', '#00843D'], 5, `
Anthony Lopes|GK|34|POR|77
Patrik Carlgren|GK|33|SWE|68
Nicolas Pallois|DC|37|FRA|70
Chidozie Awaziem|DC|28|NGA|72
Jean-Kévin Duverne|DC|27|FRA|72
Uroš Radaković|DC|31|SRB|70
Tylel Tati|DC|17|FRA|70/80
Kelvin Amian|DR|27|FRA|72
Nicolas Cozza|DL|26|FRA|72
Johann Lepenant|DM|22|FRA|74
Francis Coquelin|DM|34|FRA|71
Louis Leroux|MC|24|FRA|70
Yassine Benhattab|AMC|24|FRA|70
Bahereba Guirassy|AML|19|FRA|70/78
Dehmaine Tabibou|AMR|18|FRA|68/78
Matthis Abline|ST/AML|22|FRA|76/81
Mostafa Mohamed|ST|27|EGY|73
Ignatius Ganago|ST|26|CMR|71
`),
    club('Angers', 'SCO', 60, 'Stade Raymond-Kopa', 18752, ['#000000', '#FFFFFF'], 5, `
Hervé Koffi|GK|28|BFA|74
Jordan Lefort|DC|31|FRA|72
Emmanuel Biumla|DC|23|CMR|70
Carlens Arcus|DR|28|HAI|71
Florent Hanin|DL|34|FRA|68
Jacques Ekomié|DL|22|GAB|70
Haris Belkebla|DM|31|ALG|72
Himad Abdelli|MC/AMC|26|ALG|75
Zinédine Ould Khaled|MC|25|FRA|70
Pierrick Capelle|MC|38|FRA|67
Farid El Melali|AML|27|ALG|72
Amine Sbaï|AML|24|FRA|71
Lanroy Machine|AMR|22|FRA|70
Prosper Peter|ST|21|NGA|70
Sidiki Chérif|ST|18|FRA|70/81
`),
    club('Le Havre', 'HAC', 60, 'Stade Océane', 25178, ['#1D3A73', '#8CC4E8'], 5, `
Arthur Desmas|GK|31|FRA|72
Mathieu Gorgelin|GK|34|FRA|70
Gautier Lloris|DC|30|FRA|72
Arouna Sangante|DC|23|SEN|73
Étienne Youté Kinkoué|DC|23|FRA|72
Loïc Nego|DR|34|HUN|70
Timothée Pembélé|DR|22|FRA|70
Abdoulaye Touré|DM|31|GUI|72
Rassoul Ndiaye|MC|23|SEN|73
Yassine Kechta|MC|23|MAR|72
Issa Soumaré|AMR|24|SEN|72
Josué Casimir|AMR|24|FRA|71
André Ayew|ST/AML|35|GHA|72
Ahmed Hassan|ST|32|EGY|68
`),
    club('Lorient', 'FCL', 60, 'Stade du Moustoir', 18110, ['#F58220', '#000000'], 5, `
Yvon Mvogo|GK|31|SUI|74
Montassar Talbi|DC|27|TUN|74
Bamo Meïté|DC|24|CIV|72
Isaak Touré|DC|21|FRA|71
Formose Mendy|DC|24|SEN|70
Igor Silva|WBR|28|BRA|70
Darlin Yongwa|WBL|24|CMR|70
Laurent Abergel|DM|32|FRA|73
Arthur Avom|MC|20|CMR|72/78
Jean-Victor Makengo|MC|27|FRA|71
Arsène Kouassi|MC|21|CIV|70
Pablo Pagis|AMC|22|FRA|73
Théo Le Bris|AMR|23|FRA|72
Tosin Aiyegun|ST|27|BEN|72
Bamba Dieng|ST|25|SEN|72
Mohamed Bamba|ST|23|CIV|72
`),
    club('Paris FC', 'PFC', 62, 'Stade Jean-Bouin', 19904, ['#1A2A5B', '#E2001A'], 80, `
Kevin Trapp|GK|35|GER|77
Obed Nkambadio|GK|22|FRA|70
Otavio|DC|31|BRA|72
Moustapha Mbow|DC|25|SEN|71
Samir Chergui|DC|26|FRA|70
Timothée Kolodziejczak|DC|33|FRA|70
Thibault De Smet|DL|27|BEL|71
Nhoa Sangui|DL|19|FRA|70/78
Julien López|DM|33|FRA|70
Maxime López|MC|27|FRA|75|playmaker
Vincent Marchetti|MC|28|FRA|70
Pierre Lees-Melou|MC|32|FRA|74
Ilan Kebbal|AMC|27|ALG|75|dribbler
Jonathan Ikoné|AMR|27|FRA|74
Luca Koleosho|AML|20|ITA|71/80
Alimami Gory|AML|29|FRA|72
Jean-Philippe Krasso|ST|28|CIV|73
Willem Geubbels|ST|23|FRA|72
Pierre-Yves Hamel|ST|31|FRA|70
`),
    club('Metz', 'FCM', 58, 'Stade Saint-Symphorien', 30000, ['#8B1538', '#FFFFFF'], 5, `
Jonathan Fischer|GK|24|DEN|70
Sadibou Sané|DC|20|FRA|70/77
Terry Yegbe|DC|24|GHA|71
Ismaël Traoré|DC|38|CIV|68
Koffi Kouao|DR|26|CIV|70
Fali Candé|DL|27|GNB|70
Benjamin Stambouli|DM|35|FRA|70
Boubacar Traoré|DM|23|MLI|72
Jessy Deminguet|MC|27|FRA|72
Alpha Touré|MC|19|MLI|70/78
Gauthier Hein|AMC|29|FRA|73
Cheikh Sabaly|AML|26|SEN|72
Giorgi Abuashvili|AMR|22|GEO|70
Habib Diallo|ST|30|SEN|72
Joël Asoro|ST|26|SWE|70
`),
  ],
};
