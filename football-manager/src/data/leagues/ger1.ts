import { club, type RawLeague } from '../types';

export const ger1: RawLeague = {
  id: 'ger1',
  name: 'Bundesliga',
  short: 'BUN',
  country: 'GER',
  tier: 1,
  tv: 50,
  europe: 6,
  clubs: [
    club('Bayern Munich', 'FCB', 95, 'Allianz Arena', 75024, ['#DC052D', '#FFFFFF'], 200, `
Manuel Neuer|GK|39|GER|85|sweeper,leader
Jonas Urbig|GK|21|GER|74/83
Sven Ulreich|GK|36|GER|70
Dayot Upamecano|DC|26|FRA|84|pace
Jonathan Tah|DC|29|GER|84|aerial
Kim Min-jae|DC|28|KOR|83|strong
Hiroki Ito|DC/DL|26|JPN|79
Josip Stanišić|DR/DC|25|CRO|79
Sacha Boey|DR|24|FRA|76
Konrad Laimer|DR/MC|28|AUT|81|engine
Alphonso Davies|DL|24|CAN|83|pace
Raphaël Guerreiro|DL/MC|31|POR|79
Joshua Kimmich|DM/DR|30|GER|88|playmaker,set,leader
Leon Goretzka|MC|30|GER|81
Aleksandar Pavlović|DM|21|GER|81/88|playmaker
Tom Bischof|MC/DL|19|GER|76/85
Jamal Musiala|AMC|22|GER|89/93|dribbler,flair
Michael Olise|AMR|23|FRA|87/90|dribbler,set
Serge Gnabry|AMR/AML|29|GER|81
Luis Díaz|AML|28|COL|85|dribbler,pace
Lennart Karl|AMR|17|GER|72/88
Nicolas Jackson|ST|24|SEN|80
Harry Kane|ST|31|ENG|90|finisher,playmaker
`),
    club('Bayer Leverkusen', 'B04', 87, 'BayArena', 30210, ['#E32221', '#000000'], 120, `
Mark Flekken|GK|32|NED|78
Janis Blaswich|GK|34|GER|72
Edmond Tapsoba|DC|26|BFA|82
Loïc Badé|DC|25|FRA|79
Jarell Quansah|DC|22|ENG|78/83
Arthur|DR|22|BRA|74
Lucas Vázquez|DR|34|ESP|75
Alejandro Grimaldo|DL/WBL|29|ESP|84|crosser,set
Robert Andrich|DM|30|GER|79|hardman
Ezequiel Fernández|DM|23|ARG|78
Exequiel Palacios|MC|26|ARG|80
Aleix García|MC|28|ESP|80|playmaker
Malik Tillman|AMC|23|USA|79
Eliesse Ben Seghir|AMC|20|MAR|77/85
Ibrahim Maza|AMC|19|ALG|74/84
Claudio Echeverri|AMC|19|ARG|74/85
Ernest Poku|AMR|21|NED|74/81
Nathan Tella|AMR|26|NGA|76
Martin Terrier|AML|28|FRA|77
Patrik Schick|ST|29|CZE|82|finisher
Christian Kofane|ST|19|CMR|72/82
`),
    club('Eintracht Frankfurt', 'SGE', 80, 'Deutsche Bank Park', 58000, ['#E1000F', '#000000'], 60, `
Kauã Santos|GK|22|BRA|76/82
Michael Zetterer|GK|30|GER|74
Robin Koch|DC|29|GER|80|leader
Arthur Theate|DC/DL|25|BEL|79
Rasmus Kristensen|DR/DC|28|DEN|77
Nnamdi Collins|DC/DR|21|GER|73/80
Aurèle Amenda|DC|21|SUI|72/79
Nathaniel Brown|DL|22|GER|76/82
Ellyes Skhiri|DM|30|TUN|78
Hugo Larsson|MC|20|SWE|79/86|engine
Oscar Højlund|MC|20|DEN|74/81
Mahmoud Dahoud|MC|29|GER|73
Fares Chaïbi|AMC|22|ALG|76
Mario Götze|AMC|33|GER|76
Can Uzun|AMC|19|GER|77/87
Ansgar Knauff|AMR|23|GER|76
Ritsu Dōan|AMR|27|JPN|79
Jean-Mattéo Bahoya|AML|20|FRA|75/82
Jonathan Burkardt|ST|25|GER|79|finisher
Elye Wahi|ST|22|FRA|75
Michy Batshuayi|ST|31|BEL|72
`),
    club('Borussia Dortmund', 'BVB', 88, 'Signal Iduna Park', 81365, ['#FDE100', '#000000'], 90, `
Gregor Kobel|GK|27|SUI|86
Alexander Meyer|GK|34|GER|70
Nico Schlotterbeck|DC|25|GER|83|playmaker
Waldemar Anton|DC|28|GER|80
Niklas Süle|DC|29|GER|78|strong
Emre Can|DM/DC|31|GER|77|leader
Ramy Bensebaini|DL/DC|30|ALG|77
Filippo Mané|DC|19|ITA|68/78
Julian Ryerson|WBR/DR|27|NOR|78
Yan Couto|WBR|23|BRA|77
Daniel Svensson|WBL|23|SWE|76
Marcel Sabitzer|MC|31|AUT|79
Pascal Groß|MC/DM|34|GER|79|playmaker,set
Felix Nmecha|MC|24|GER|79
Jobe Bellingham|MC|19|ENG|76/87
Carney Chukwuemeka|MC|21|ENG|72/80
Julian Brandt|AMC|29|GER|81|playmaker
Karim Adeyemi|AML/ST|23|GER|80|pace
Maximilian Beier|ST/AML|22|GER|78/83
Julien Duranville|AML|19|BEL|70/82
Serhou Guirassy|ST|29|GUI|84|finisher,strong
Fábio Silva|ST|23|POR|75
`),
    club('SC Freiburg', 'SCF', 76, 'Europa-Park Stadion', 34700, ['#000000', '#E2001A'], 40, `
Noah Atubolu|GK|23|GER|79/83
Florian Müller|GK|27|GER|72
Matthias Ginter|DC|31|GER|79
Philipp Lienhart|DC|29|AUT|78
Max Rosenfelder|DC|22|GER|74/79
Bruno Ogbus|DC|19|SUI|70/78
Lukas Kübler|DR|32|GER|75
Philipp Treu|DR|24|GER|74
Christian Günter|DL|32|GER|75|leader
Jordy Makengo|DL|24|FRA|72
Maximilian Eggestein|MC|28|GER|77|engine
Nicolas Höfler|DM|35|GER|73
Patrick Osterhage|MC|25|GER|74
Johan Manzambi|MC|19|SUI|74/83
Yuito Suzuki|AMC|23|JPN|75
Vincenzo Grifo|AML|32|ITA|78|set,sniper
Jan-Niklas Beste|AML|26|GER|76|crosser
Derry Scherhant|AMR|22|GER|71
Eren Dinkçi|AMR|23|GER|73
Lucas Höler|ST|31|GER|74
Junior Adamu|ST|24|AUT|74
Igor Matanović|ST|22|CRO|74
`),
    club('Mainz 05', 'M05', 72, 'Mewa Arena', 33305, ['#C3141E', '#FFFFFF'], 25, `
Robin Zentner|GK|30|GER|77
Lasse Rieß|GK|24|GER|68
Stefan Bell|DC|33|GER|74
Andreas Hanche-Olsen|DC|28|NOR|75
Dominik Kohr|DC/DM|31|GER|74|hardman
Kacper Potulski|DC|17|POL|68/80
Danny da Costa|WBR|31|GER|72
Anthony Caci|WBR|28|FRA|74
Silvan Widmer|WBR|32|SUI|73
Phillipp Mwene|WBL|31|AUT|73
Kaishu Sano|DM|24|JPN|77|tackler
Nadiem Amiri|AMC/MC|28|GER|79
Lee Jae-sung|AMC|33|KOR|76
Paul Nebel|AMC/AMR|22|GER|75/80
Arnaud Nordin|AML|27|FRA|72
Benedict Hollerbach|AML/ST|24|GER|74
Armindo Sieb|ST|22|GER|73
Nelson Weiper|ST|20|GER|72/79
`),
    club('RB Leipzig', 'RBL', 84, 'Red Bull Arena', 47069, ['#DD0741', '#FFFFFF'], 80, `
Péter Gulácsi|GK|35|HUN|78
Maarten Vandevoordt|GK|23|BEL|77/83
Willi Orbán|DC|32|HUN|80|leader
Castello Lukeba|DC|22|FRA|80/85
El Chadaille Bitshiabu|DC|20|FRA|72/80
David Raum|DL|27|GER|79|crosser
Benjamin Henrichs|DR|28|GER|77
Ridle Baku|DR|27|GER|77
Kosta Nedeljković|DR|19|SRB|72/80
Xaver Schlager|MC/DM|27|AUT|79|engine
Nicolas Seiwald|DM|24|AUT|77
Amadou Haidara|MC|27|MLI|76
Kevin Kampl|MC|34|SVN|74
Assan Ouédraogo|AMC|19|GER|74/84
Christoph Baumgartner|AMC|25|AUT|79
Antonio Nusa|AML|20|NOR|79/88|dribbler,pace
Yan Diomande|AMR|18|CIV|74/86|dribbler
Johan Bakayoko|AMR|22|BEL|79/83
Conrad Harder|ST|20|DEN|74/82
Rômulo|ST|23|BRA|74
`),
    club('Werder Bremen', 'SVW', 72, 'Weserstadion', 42100, ['#1D9053', '#FFFFFF'], 20, `
Mio Backhaus|GK|21|GER|72/80
Karl Hein|GK|23|EST|71
Marco Friedl|DC|27|AUT|77
Niklas Stark|DC|30|GER|75
Amos Pieper|DC|27|GER|74
Karim Coulibaly|DC|18|GER|69/80
Mitchell Weiser|WBR|31|GER|76
Felix Agu|WBL|25|GER|72
Olivier Deman|WBL|25|BEL|72
Senne Lynen|DM|26|BEL|76
Jens Stage|MC|28|DEN|78
Romano Schmid|AMC|25|AUT|77
Leonardo Bittencourt|AMC|31|GER|74
Cameron Puertas|AMC|26|ESP|74
Marco Grüll|AML|26|AUT|73
Samuel Mbangula|AML|21|BEL|73/79
Justin Njinmah|ST|24|GER|72
Keke Topp|ST|21|GER|71
Victor Boniface|ST|24|NGA|79|strong
`),
    club('VfB Stuttgart', 'VFB', 81, 'MHPArena', 60449, ['#FFFFFF', '#E32219'], 45, `
Alexander Nübel|GK|28|GER|81
Fabian Bredlow|GK|30|GER|70
Jeff Chabot|DC|27|GER|77
Finn Jeltsch|DC|19|GER|74/84
Ameen Al-Dakhil|DC|23|BEL|74
Luca Jaquez|DC|22|SUI|72
Dan-Axel Zagadou|DC|26|FRA|75
Josha Vagnoman|DR|24|GER|74
Lorenz Assignon|DR|25|FRA|74
Pascal Stenzel|DR|29|GER|72
Maximilian Mittelstädt|DL|28|GER|79
Angelo Stiller|DM/MC|24|GER|82|playmaker
Atakan Karazor|DM|28|GER|76
Chema Andrés|DM|20|ESP|73/80
Nikolas Nartey|MC|25|DEN|73
Bilal El Khannouss|AMC|21|MAR|77/83
Chris Führich|AML|27|GER|78|dribbler
Jamie Leweling|AMR|24|GER|78
Badredine Bouanani|AMR|20|FRA|72/80
Justin Diehl|AML|20|GER|70/78
Deniz Undav|ST|28|GER|80
Ermedin Demirović|ST|27|BIH|79
Tiago Tomás|ST|23|POR|74
`),
    club("Borussia Mönchengladbach", 'BMG', 74, 'Borussia-Park', 54057, ['#000000', '#FFFFFF'], 30, `
Moritz Nicolas|GK|28|GER|75
Jonas Omlin|GK|31|SUI|74
Nico Elvedi|DC|28|SUI|78
Ko Itakura|DC|28|JPN|78
Kevin Diks|DC/DR|28|NED|75
Marvin Friedrich|DC|29|GER|73
Joe Scally|DR|22|USA|75
Luca Netz|DL|22|GER|74
Lukas Ullrich|DL|21|GER|72
Julian Weigl|DM|29|GER|77
Rocco Reitz|MC|23|GER|76
Philipp Sander|MC|27|GER|74
Yannik Engelhardt|DM|24|GER|72
Florian Neuhaus|AMC|28|GER|76
Kevin Stöger|AMC|31|AUT|76|set
Giovanni Reyna|AMC|22|USA|74
Franck Honorat|AMR|28|FRA|76
Robin Hack|AML|26|GER|76
Nathan Ngoumou|AMR|25|FRA|72
Tim Kleindienst|ST|29|GER|78|aerial
Haris Tabaković|ST|31|BIH|75
Shūto Machino|ST|25|JPN|74
`),
    club('VfL Wolfsburg', 'WOB', 74, 'Volkswagen Arena', 28917, ['#65B32E', '#FFFFFF'], 40, `
Kamil Grabara|GK|26|POL|78
Marius Müller|GK|31|GER|70
Denis Vavro|DC|29|SVK|76
Konstantinos Koulierakis|DC|21|GRE|75/81
Moritz Jenz|DC|26|GER|73
Jenson Seelt|DC|22|NED|72
Kilian Fischer|DR|24|GER|74
Joakim Mæhle|DL/DR|28|DEN|76
Rogério|DL|27|BRA|73
Aaron Zehnter|DL|20|GER|70
Vinícius Souza|DM|26|BRA|74
Maximilian Arnold|MC|31|GER|78|set
Mattias Svanberg|MC|26|SWE|76
Yannick Gerhardt|MC|31|GER|73
Christian Eriksen|AMC|33|DEN|76|playmaker
Lovro Majer|AMC|27|CRO|77
Patrick Wimmer|AMR|24|AUT|76
Andreas Skov Olsen|AMR|25|DEN|76
Kevin Paredes|AML|22|USA|72
Mohamed Amoura|ST/AML|25|ALG|79|pace
Jonas Wind|ST|26|DEN|77
Dženan Pejčinović|ST|20|GER|72/80
`),
    club('FC Augsburg', 'FCA', 68, 'WWK Arena', 30660, ['#BA3733', '#46714D'], 15, `
Finn Dahmen|GK|27|GER|77
Nediljko Labrović|GK|26|CRO|72
Jeffrey Gouweleeuw|DC|34|NED|74|leader
Keven Schlotterbeck|DC|28|GER|74
Chrislain Matsima|DC|23|FRA|74
Cédric Zesiger|DC|27|SUI|73
Noahkai Banks|DC|18|USA|70/80
Marius Wolf|DR|30|GER|74
Dimitrios Giannoulis|DL|29|GRE|75
Kristijan Jakić|DM|28|CRO|75
Elvis Rexhbeçaj|MC|27|KVX|73
Han-Noah Massengo|MC|24|FRA|72
Arne Maier|MC|26|GER|74
Fredrik Jensen|AMC|28|FIN|73
Anton Kade|AMC|21|GER|73/79
Alexis Claude-Maurice|AML|27|FRA|75
Mert Kömür|AMR|20|GER|71/78
Phillip Tietz|ST|27|GER|72
Samuel Essende|ST|27|COD|73
Steve Mounié|ST|30|BEN|70
`),
    club('Union Berlin', 'FCU', 70, 'Stadion An der Alten Försterei', 22012, ['#EB1923', '#FFFFFF'], 20, `
Frederik Rønnow|GK|32|DEN|77
Carl Klaus|GK|31|GER|68
Diogo Leite|DC|26|POR|77
Danilho Doekhi|DC|26|NED|77
Leopold Querfeld|DC|21|AUT|76/81
Christopher Trimmel|DR|38|AUT|70|set
Josip Juranović|DR|29|CRO|74
Tom Rothe|DL|20|GER|73/80
Derrick Köhn|DL|26|GER|72
Rani Khedira|DM|31|GER|76
Aljoscha Kemlein|DM|21|GER|72
András Schäfer|MC|26|HUN|73
Alex Král|MC|27|CZE|73
Janik Haberer|MC|31|GER|72
László Bénes|AMC|27|SVK|73
Tim Skarke|AML|28|GER|72
Jeong Woo-yeong|AMR|25|KOR|72
Andrej Ilić|ST|25|SRB|73
Oliver Burke|ST|28|SCO|72
Ilyas Ansah|ST|20|GER|72/78
`),
    club('FC St. Pauli', 'STP', 66, 'Millerntor-Stadion', 29546, ['#6B4E3D', '#FFFFFF'], 10, `
Nikola Vasilj|GK|29|BIH|77
Ben Voll|GK|24|GER|68
Hauke Wahl|DC|31|GER|75
Eric Smith|DC/DM|28|SWE|75
Karol Mets|DC|32|EST|72
David Nemeth|DC|24|AUT|72
Adam Dźwigała|DC|30|POL|71
Arkadiusz Pyrka|WBR|22|POL|72
Manolis Saliakas|WBR|29|GRE|73
Louis Oppie|WBL|23|GER|70
Lars Ritzka|WBL|27|GER|71
Jackson Irvine|MC|32|AUS|76|leader
Joel Chima Fujita|DM|23|JPN|74
James Sands|DM|25|USA|73
Connor Metcalfe|MC|25|AUS|72
Danel Sinani|AMC|28|LUX|73
Mathias Pereira Lage|AMR|28|FRA|72
Oladapo Afolayan|AML|27|NGA|72
Andréas Hountondji|ST|23|BEN|72
Martijn Kaars|ST|26|NED|72
Ricky-Jade Jones|ST|22|ENG|72
Morgan Guilavogui|ST|27|FRA|72
`),
    club('TSG Hoffenheim', 'TSG', 72, 'PreZero Arena', 30150, ['#1961B5', '#FFFFFF'], 30, `
Oliver Baumann|GK|35|GER|80
Luca Philipp|GK|24|GER|68
Ozan Kabak|DC|25|TUR|77
Kevin Akpoguma|DC|30|NGA|72
Albian Hajdari|DC|22|SUI|73
Robin Hranáč|DC|25|CZE|74
Koki Machida|DC|27|JPN|74
Vladimír Coufal|DR|32|CZE|73
Valentin Gendrey|DR|25|FRA|72
Bernardo|DL|30|BRA|72
Alexander Prass|WBL|24|AUT|74
Grischa Prömel|MC|30|GER|76
Dennis Geiger|DM|27|GER|74
Leon Avdullahu|DM|21|KVX|73/80
Wouter Burger|DM|24|NED|74
Andrej Kramarić|AMC/ST|34|CRO|79|finisher
Adam Hložek|ST/AMC|22|CZE|75
Bazoumana Touré|AML|19|CIV|73/83
Cole Campbell|AMR|19|USA|70/79
Tim Lemperle|ST|23|GER|74
Fisnik Asllani|ST|23|KVX|74
Ihlas Bebou|ST|31|TOG|72
`),
    club('1. FC Heidenheim', 'FCH', 62, 'Voith-Arena', 15000, ['#E2001A', '#003B79'], 8, `
Diant Ramaj|GK|23|GER|72
Kevin Müller|GK|34|GER|71
Patrick Mainka|DC|30|GER|73|leader
Benedikt Gimber|DC|28|GER|72
Tim Siersleben|DC|25|GER|71
Omar Traoré|DR|27|GER|72
Marnon Busch|DR|30|GER|70
Jonas Föhrenbach|DL|29|GER|71
Niklas Dorsch|DM|27|GER|73
Jan Schöppner|MC|26|GER|72
Luka Janeš|MC|22|CRO|70
Adrian Beck|AMC|28|GER|72
Mathias Honsak|AML|28|AUT|72
Sirlord Conteh|AMR|28|GER|71
Budu Zivzivadze|ST|31|GEO|72
Mikkel Kaufmann|ST|24|DEN|72
Stefan Schimmer|ST|30|GER|71
Marvin Pieringer|ST|25|GER|71
`),
    club('1. FC Köln', 'KOE', 66, 'RheinEnergieStadion', 50000, ['#ED1C24', '#FFFFFF'], 15, `
Marvin Schwäbe|GK|30|GER|75
Ron-Robert Zieler|GK|36|GER|70
Timo Hübers|DC|28|GER|74
Rav van den Berg|DC|21|NED|72/78
Joël Schmied|DC|26|SUI|72
Cenk Özkacar|DC|24|TUR|72
Jan Thielmann|DR/AMR|23|GER|74
Sebastian Sebulonsen|DR|25|NOR|71
Kristoffer Lund|DL|23|USA|72
Leart Paqarada|DL|30|KVX|72
Eric Martel|DM|23|GER|75
Tom Krauß|DM|24|GER|73
Isak Johannesson|MC|22|ISL|74/80
Dejan Ljubičić|MC|27|AUT|74
Florian Kainz|AMC|32|AUT|73
Linton Maina|AML|26|GER|73
Jakub Kamiński|AML|23|POL|75
Said El Mala|AML|19|GER|74/86|dribbler
Ragnar Ache|ST|27|GER|73
Marius Bülter|ST|32|GER|72
Luca Waldschmidt|ST|29|GER|72
`),
    club('Hamburger SV', 'HSV', 68, 'Volksparkstadion', 57000, ['#0A3F86', '#FFFFFF'], 20, `
Daniel Heuer Fernandes|GK|32|POR|74
Matheo Raab|GK|26|GER|70
Luka Vušković|DC|18|CRO|76/88|aerial
Dennis Hadžikadunić|DC|26|BIH|72
Jordan Torunarigha|DC|27|NGA|72
Warmed Omari|DC|25|FRA|72
William Mikelbrencis|DR|21|FRA|72
Miro Muheim|DL|27|SUI|72
Daniel Elfadli|DM/DC|28|GER|72
Jonas Meffert|DM|30|GER|73
Nicolás Capaldo|MC|26|ARG|74
Albert Sambi Lokonga|MC|25|BEL|74
Fábio Vieira|AMC|25|POR|76|playmaker
Immanuel Pherai|AMC|24|NED|72
Jean-Luc Dompé|AML|30|FRA|73
Bakery Jatta|AMR|27|GAM|72
Emir Sahiti|AMR|26|KVX|72
Ransford Königsdörffer|ST|23|GHA|73
Robert Glatzel|ST|31|GER|73
Yussuf Poulsen|ST|31|DEN|74
Rayan Philippe|ST|25|FRA|72
`),
  ],
};
