import { club, type RawLeague } from '../types';

export const ita1: RawLeague = {
  id: 'ita1',
  name: 'Serie A',
  short: 'SEA',
  country: 'ITA',
  tier: 1,
  tv: 40,
  europe: 6,
  clubs: [
    club('Napoli', 'NAP', 87, 'Stadio Diego Armando Maradona', 54726, ['#12A0D7', '#FFFFFF'], 70, `
Alex Meret|GK|28|ITA|81
Vanja Milinković-Savić|GK|28|SRB|79
Giovanni Di Lorenzo|DR/DC|31|ITA|82|leader
Amir Rrahmani|DC|31|KVX|81
Alessandro Buongiorno|DC|26|ITA|82
Sam Beukema|DC|26|NED|80
Juan Jesus|DC|34|BRA|74
Mathías Olivera|DL/DC|27|URU|79
Miguel Gutiérrez|DL|24|ESP|79
Leonardo Spinazzola|DL|32|ITA|76
Pasquale Mazzocchi|DR|29|ITA|72
Stanislav Lobotka|DM|30|SVK|84|playmaker
Frank Anguissa|MC|29|CMR|82|strong,engine
Scott McTominay|MC/AMC|28|SCO|85|engine,finisher
Kevin De Bruyne|AMC/MC|34|BEL|86|playmaker,set
Billy Gilmour|MC/DM|24|SCO|79
Eljif Elmas|MC/AMC|25|MKD|77
Matteo Politano|AMR|31|ITA|80
David Neres|AMR/AML|28|BRA|80|dribbler
Noa Lang|AML|26|NED|80|flair
Rasmus Højlund|ST|22|DEN|79/84|pace,strong
Romelu Lukaku|ST|32|BEL|81|strong
Lorenzo Lucca|ST|24|ITA|76|aerial
`),
    club('Inter', 'INT', 90, 'San Siro', 75817, ['#010E80', '#000000'], 90, `
Yann Sommer|GK|36|SUI|84
Josep Martínez|GK|27|ESP|77
Alessandro Bastoni|DC|26|ITA|87|playmaker
Francesco Acerbi|DC|37|ITA|79|leader
Stefan de Vrij|DC|33|NED|80
Yann Bisseck|DC|24|GER|80/83
Manuel Akanji|DC|30|SUI|82
Denzel Dumfries|WBR/DR|29|NED|83|pace,aerial
Federico Dimarco|WBL/DL|27|ITA|85|crosser,set
Carlos Augusto|WBL/DC|26|BRA|78
Matteo Darmian|WBR/DC|35|ITA|76
Luis Henrique|WBR|23|BRA|77
Nicolò Barella|MC|28|ITA|87|engine
Hakan Çalhanoğlu|DM|31|TUR|85|playmaker,set
Henrikh Mkhitaryan|MC|36|ARM|80
Davide Frattesi|MC|25|ITA|80
Petar Sučić|MC|21|CRO|77/84
Piotr Zieliński|MC/AMC|31|POL|81
Andy Diouf|MC|22|FRA|76
Lautaro Martínez|ST|27|ARG|88|finisher,leader
Marcus Thuram|ST|28|FRA|85|strong,pace
Ange-Yoan Bonny|ST|21|FRA|76/82
Francesco Pio Esposito|ST|20|ITA|74/85
`),
    club('Atalanta', 'ATA', 83, 'Gewiss Stadium', 24950, ['#1E71B8', '#000000'], 80, `
Marco Carnesecchi|GK|25|ITA|82/85
Marco Sportiello|GK|33|ITA|72
Berat Djimsiti|DC|32|ALB|79
Isak Hien|DC|26|SWE|80|strong
Sead Kolašinac|DC|32|BIH|76
Odilon Kossounou|DC|24|CIV|78
Giorgio Scalvini|DC|21|ITA|80/86
Honest Ahanor|DC|17|NGA|70/84
Raoul Bellanova|WBR|25|ITA|78|pace
Davide Zappacosta|WBR|33|ITA|76
Nicola Zalewski|WBL|23|POL|76
Marten de Roon|DM|34|NED|79|leader
Éderson|MC|26|BRA|82|engine
Mario Pašalić|MC/AMC|30|CRO|79
Yunus Musah|MC|22|USA|76
Lazar Samardžić|AMC|23|SRB|77
Daniel Maldini|AMC|23|ITA|74
Charles De Ketelaere|AMC/ST|24|BEL|82
Ademola Lookman|AML/ST|27|NGA|84|dribbler
Kamaldeen Sulemana|AML|23|GHA|74|pace
Gianluca Scamacca|ST|26|ITA|79
Nikola Krstović|ST|25|MNE|78
`),
    club('Juventus', 'JUV', 88, 'Allianz Stadium', 41507, ['#000000', '#FFFFFF'], 60, `
Michele Di Gregorio|GK|28|ITA|82
Mattia Perin|GK|32|ITA|77
Gleison Bremer|DC|28|BRA|85|tackler
Federico Gatti|DC|27|ITA|80|aerial
Pierre Kalulu|DC/DR|25|FRA|80
Lloyd Kelly|DC|26|ENG|77
Juan Cabal|DL|24|COL|76
Andrea Cambiaso|WBL/WBR|25|ITA|83
Filip Kostić|WBL|32|SRB|76|crosser
João Mário|WBR|25|POR|74
Manuel Locatelli|DM|27|ITA|83|playmaker
Khéphren Thuram|MC|24|FRA|81
Weston McKennie|MC|26|USA|79
Teun Koopmeiners|MC/AMC|27|NED|82|sniper
Vasilije Adžić|MC|19|MNE|70/80
Kenan Yıldız|AML|20|TUR|84/90|dribbler,flair
Francisco Conceição|AMR|22|POR|80/84|dribbler
Edon Zhegrova|AMR|26|KVX|80
Jonathan David|ST|25|CAN|84|finisher
Dušan Vlahović|ST|25|SRB|82|strong
Loïs Openda|ST|25|BEL|81|pace
Arkadiusz Milik|ST|31|POL|74
`),
    club('Roma', 'ROM', 84, 'Stadio Olimpico', 70634, ['#8E1F2F', '#F0BC42'], 30, `
Mile Svilar|GK|25|SRB|84
Pierluigi Gollini|GK|30|ITA|71
Gianluca Mancini|DC|29|ITA|80|hardman
Evan Ndicka|DC|25|CIV|81
Mario Hermoso|DC|30|ESP|76
Jan Ziółkowski|DC|20|POL|70/79
Zeki Çelik|DR|28|TUR|76
Wesley|DR|21|BRA|77/83
Devyne Rensch|DR|22|NED|75
Angeliño|DL|28|ESP|79
Kostas Tsimikas|DL|29|GRE|76
Bryan Cristante|DM/MC|30|ITA|79
Manu Koné|MC|24|FRA|82|engine
Neil El Aynaoui|MC|24|MAR|76
Niccolò Pisilli|MC|20|ITA|74/81
Lorenzo Pellegrini|AMC|29|ITA|79|set
Tommaso Baldanzi|AMC|22|ITA|74
Matías Soulé|AMR|22|ARG|80/84
Paulo Dybala|AMC/ST|31|ARG|82|flair,set
Stephan El Shaarawy|AML|32|ITA|76
Leon Bailey|AMR|27|JAM|77|pace
Artem Dovbyk|ST|28|UKR|80|aerial
Evan Ferguson|ST|20|IRL|75/83
`),
    club('Fiorentina', 'FIO', 79, 'Stadio Artemio Franchi', 43147, ['#482E92', '#FFFFFF'], 35, `
David de Gea|GK|34|ESP|83|shotstopper
Oliver Christensen|GK|26|DEN|72
Luca Ranieri|DC|26|ITA|77
Marin Pongračić|DC|27|CRO|76
Pablo Marí|DC|31|ESP|76
Dodô|WBR/DR|26|BRA|80
Robin Gosens|WBL|31|GER|78
Fabiano Parisi|WBL|24|ITA|75
Tariq Lamptey|WBR|24|GHA|73
Niccolò Fortini|WBR|19|ITA|70/78
Rolando Mandragora|MC|28|ITA|78
Nicolò Fagioli|MC/DM|24|ITA|78
Simon Sohm|MC|24|SUI|76
Hans Nicolussi Caviglia|DM|25|ITA|76
Cher Ndour|MC|20|ITA|74/80
Amir Richardson|MC|23|MAR|73
Albert Guðmundsson|AMC/ST|28|ISL|79
Jacopo Fazzini|AMC|22|ITA|74
Moise Kean|ST|25|ITA|83|pace,strong
Edin Džeko|ST|39|BIH|75|aerial
Roberto Piccoli|ST|24|ITA|76
`),
    club('Lazio', 'LAZ', 80, 'Stadio Olimpico', 70634, ['#87D8F7', '#FFFFFF'], 15, `
Ivan Provedel|GK|31|ITA|80
Christos Mandas|GK|23|GRE|77
Alessio Romagnoli|DC|30|ITA|80
Mario Gila|DC|24|ESP|80
Samuel Gigot|DC|31|FRA|74
Oliver Provstgaard|DC|21|DEN|70/77
Adam Marušić|DR|32|MNE|77
Manuel Lazzari|DR|31|ITA|74
Nuno Tavares|DL|25|POR|77|pace
Luca Pellegrini|DL|26|ITA|74
Nicolò Rovella|DM|23|ITA|80/84|playmaker
Matteo Guendouzi|MC|26|FRA|80|engine
Matías Vecino|MC|33|URU|74
Fisayo Dele-Bashiru|MC|24|NGA|74
Toma Bašić|MC|28|CRO|72
Reda Belahyane|DM|21|MAR|70
Mattia Zaccagni|AML|30|ITA|81|dribbler
Gustav Isaksen|AMR|24|DEN|77
Mattéo Cancellieri|AMR|23|ITA|73
Pedro|AMR|38|ESP|74
Taty Castellanos|ST|26|ARG|79
Boulaye Dia|ST|28|SEN|77
Tijjani Noslin|ST|26|NED|74
`),
    club('Milan', 'MIL', 87, 'San Siro', 75817, ['#FB090B', '#000000'], 70, `
Mike Maignan|GK|29|FRA|86|shotstopper,leader
Pietro Terracciano|GK|35|ITA|72
Fikayo Tomori|DC|27|ENG|80|pace
Strahinja Pavlović|DC|24|SRB|79|aerial
Matteo Gabbia|DC|25|ITA|77
Koni De Winter|DC|23|BEL|76
Pervis Estupiñán|DL|27|ECU|78
Davide Bartesaghi|DL|19|ITA|70/79
Zachary Athekame|DR|20|SUI|72/80
Alexis Saelemaekers|DR/AMR|26|BEL|79
Luka Modrić|MC|39|CRO|83|playmaker
Youssouf Fofana|DM/MC|26|FRA|80
Adrien Rabiot|MC|30|FRA|82
Ruben Loftus-Cheek|MC|29|ENG|77
Samuele Ricci|DM|23|ITA|78/82
Ardon Jashari|DM|22|SUI|77/82
Christian Pulisic|AMR/AML|26|USA|84
Rafael Leão|AML|26|POR|85|pace,dribbler
Christopher Nkunku|AMC/ST|27|FRA|81
Santiago Giménez|ST|24|MEX|79
`),
    club('Bologna', 'BOL', 79, "Stadio Renato Dall'Ara", 38279, ['#1A2F48', '#A21C26'], 40, `
Łukasz Skorupski|GK|34|POL|79
Federico Ravaglia|GK|25|ITA|72
Jhon Lucumí|DC|26|COL|80
Torbjørn Heggem|DC|26|NOR|73
Nicolò Casale|DC|27|ITA|74
Martin Vitík|DC|22|CZE|74/80
Emil Holm|DR|25|SWE|76
Lorenzo De Silvestri|DR|37|ITA|70
Juan Miranda|DL|25|ESP|76
Charalampos Lykogiannis|DL|31|GRE|73
Remo Freuler|DM|33|SUI|78
Lewis Ferguson|MC|26|SCO|79|leader
Nikola Moro|MC|27|CRO|75
Tommaso Pobega|MC|26|ITA|75
Giovanni Fabbian|AMC|22|ITA|74
Jens Odgaard|AMC|26|DEN|75
Riccardo Orsolini|AMR|28|ITA|81|sniper
Federico Bernardeschi|AMR/AML|31|ITA|76
Jonathan Rowe|AML|22|ENG|75
Nicolò Cambiaghi|AML|24|ITA|74
Santiago Castro|ST|20|ARG|77/84
Thijs Dallinga|ST|24|NED|75
Ciro Immobile|ST|35|ITA|75|finisher
`),
    club('Como', 'COM', 74, 'Stadio Giuseppe Sinigaglia', 13602, ['#0D3F8F', '#FFFFFF'], 100, `
Jean Butez|GK|30|FRA|78
Marc-Oliver Kempf|DC|30|GER|75
Diego Carlos|DC|32|BRA|76
Jacobo Ramón|DC|20|ESP|73/81
Edoardo Goldaniga|DC|31|ITA|71
Ignace Van der Brempt|DR|23|BEL|73
Ivan Smolčić|DR|24|CRO|73
Álex Valle|DL|21|ESP|74/80
Alberto Moreno|DL|33|ESP|72
Maximo Perrone|DM|22|ARG|78/82
Lucas Da Cunha|MC|24|FRA|77
Sergi Roberto|MC|33|ESP|74
Nico Paz|AMC|20|ARG|81/89|playmaker,flair
Martin Baturina|AMC|22|CRO|77/82
Jesús Rodríguez|AML|19|ESP|74/84|dribbler
Assane Diao|AMR|19|SEN|76/84|pace
Jayden Addai|AML|19|NED|70/78
Nicolas Kühn|AMR|25|GER|77
Gabriel Strefezza|AMR|28|BRA|74
Anastasios Douvikas|ST|26|GRE|75
Álvaro Morata|ST|32|ESP|77
`),
    club('Torino', 'TOR', 73, 'Stadio Olimpico Grande Torino', 27958, ['#8A1E03', '#FFFFFF'], 15, `
Franco Israel|GK|25|URU|74
Alberto Paleari|GK|32|ITA|70
Saúl Coco|DC|26|EQG|75
Guillermo Maripán|DC|31|CHI|75
Adam Masina|DC|31|MAR|72
Ardian Ismajli|DC|28|ALB|73
Marcus Pedersen|DR|25|NOR|73
Valentino Lazaro|DR|29|AUT|73
Cristiano Biraghi|DL|33|ITA|72
Kristjan Asllani|DM|23|ALB|74
Gvidas Gineitis|MC|21|LTU|73/79
Ivan Ilić|MC|24|SRB|75
Adrien Tamèze|MC|31|FRA|72
Cesare Casadei|MC|22|ITA|75
Nikola Vlašić|AMC|27|CRO|77
Cyril Ngonge|AMR|25|BEL|74
Che Adams|ST|28|SCO|75
Duván Zapata|ST|34|COL|75|strong
Giovanni Simeone|ST|30|ARG|75
Alieu Njie|ST|20|SWE|70/77
`),
    club('Udinese', 'UDI', 70, 'Bluenergy Stadium', 25144, ['#000000', '#FFFFFF'], 15, `
Maduka Okoye|GK|25|NGA|75
Răzvan Sava|GK|23|ROU|72
Thomas Kristensen|DC|23|DEN|74
Oumar Solet|DC|25|FRA|77
Christian Kabasele|DC|34|BEL|72
Nicolò Bertola|DC|22|ITA|71
Kingsley Ehizibue|WBR|30|NED|72
Hassane Kamara|WBL|31|CIV|72
Jordan Zemura|WBL|25|ZIM|72
Jesper Karlström|DM|30|SWE|74
Jakub Piotrowski|MC|27|POL|74
Sandi Lovrić|MC|27|SVN|74
Arthur Atta|MC|22|FRA|74
Lennon Miller|MC|19|SCO|72/82
Oier Zarraga|MC|26|ESP|72
Jurgen Ekkelenkamp|MC/AMC|25|NED|75
Nicolò Zaniolo|AMC/AMR|26|ITA|75
Keinan Davis|ST|27|ENG|75|strong
Iker Bravo|ST|20|ESP|72/79
Adam Buksa|ST|29|POL|73
`),
    club('Genoa', 'GEN', 68, 'Stadio Luigi Ferraris', 33205, ['#A11D3D', '#0E1D3B'], 10, `
Nicola Leali|GK|32|ITA|74
Benjamin Siegrist|GK|33|SUI|72
Johan Vásquez|DC|26|MEX|77
Leo Østigård|DC|25|NOR|75
Sebastian Otoa|DC|21|DEN|70
Alessandro Marcandalli|DC|22|ITA|70
Brooke Norton-Cuffy|DR|21|ENG|73/79
Stefano Sabelli|DR|32|ITA|71
Aaron Martín|DL|28|ESP|75
Morten Frendrup|MC|24|DEN|77|engine
Milan Badelj|DM|36|CRO|72
Patrizio Masini|MC|24|ITA|71
Morten Thorsby|MC|29|NOR|73
Ruslan Malinovskyi|AMC|32|UKR|76|sniper
Nicolae Stanciu|AMC|32|ROU|74
Valentín Carboni|AMC|20|ARG|73/82
Junior Messias|AMR|34|BRA|73
Vitinha|AML|25|POR|74
Mikael Ellertsson|AML|23|ISL|70
Lorenzo Colombo|ST|23|ITA|73
Jeff Ekhator|ST|18|ITA|70/80
Caleb Ekuban|ST|31|GHA|70
`),
    club('Hellas Verona', 'VER', 64, 'Stadio Marcantonio Bentegodi', 39211, ['#FFE600', '#003C82'], 5, `
Lorenzo Montipò|GK|29|ITA|75
Nicolás Valentini|DC|24|ARG|72
Victor Nelsson|DC|26|DEN|74
Domagoj Bradarić|DL|25|CRO|72
Rafik Belghali|DR|23|ALG|72
Martin Frese|WBL|27|DEN|71
Suat Serdar|MC|28|GER|74
Roberto Gagliardini|DM|31|ITA|72
Abdou Harroui|MC|27|MAR|72
Antoine Bernede|MC|26|FRA|72
Grigoris Kastanos|MC|27|CYP|71
Tomáš Suslov|AMC|23|SVK|73
Giovane|AMC|22|BRA|71
Amin Sarr|ST|24|SWE|73
Gift Orban|ST|23|NGA|72
Daniel Mosquera|ST|25|COL|72
`),
    club('Cagliari', 'CAG', 65, 'Unipol Domus', 16416, ['#A61B2B', '#002350'], 8, `
Elia Caprile|GK|24|ITA|76
Alen Sherri|GK|28|ALB|69
Yerry Mina|DC|30|COL|73|aerial
Sebastiano Luperto|DC|28|ITA|73
Alberto Dossena|DC|26|ITA|72
Gabriele Zappa|DR|25|ITA|72
Marco Palestra|DR|20|ITA|73/80
Adam Obert|DL|22|SVK|71
Michel Adopo|MC|24|FRA|73
Alessandro Deiola|MC|30|ITA|71
Matteo Prati|DM|21|ITA|71
Michael Folorunsho|MC|27|ITA|73
Luca Mazzitelli|MC|29|ITA|71
Gianluca Gaetano|AMC|25|ITA|74
Mattia Felici|AML|23|ITA|70
Zito Luvumbo|AML|23|ANG|73|pace
Sebastiano Esposito|ST/AMC|23|ITA|74
Andrea Belotti|ST|31|ITA|72
Semih Kılıçsoy|ST|20|TUR|72/80
Leonardo Pavoletti|ST|36|ITA|68|aerial
`),
    club('Parma', 'PAR', 66, 'Stadio Ennio Tardini', 22352, ['#FFFFFF', '#1B3C87'], 20, `
Zion Suzuki|GK|22|JPN|78/83
Edoardo Corvi|GK|24|ITA|66
Alessandro Circati|DC|21|AUS|74/80
Mariano Troilo|DC|22|ARG|72
Botond Balogh|DC|23|HUN|72
Lautaro Valenti|DC|26|ARG|72
Enrico Delprato|DR/DC|25|ITA|73
Emanuele Valeri|DL|27|ITA|74
Nahuel Estévez|DM|30|ARG|72
Mandela Keita|DM|23|BEL|74
Adrián Bernabé|MC|24|ESP|76|playmaker
Christian Ordóñez|MC|21|ARG|72
Oliver Sørensen|MC|23|DEN|72
Hernani|MC|31|BRA|72
Jacob Ondrejka|AML|23|SWE|73
Pontus Almqvist|AMR|26|SWE|72
Mateo Pellegrino|ST|23|ARG|74
Patrick Cutrone|ST|27|ITA|74
Adrian Benedyczak|ST|24|POL|72
Matija Frigan|ST|22|CRO|71
`),
    club('Lecce', 'LEC', 62, 'Stadio Via del Mare', 31533, ['#FFE800', '#E2001A'], 5, `
Wladimiro Falcone|GK|30|ITA|78
Christian Früchtl|GK|25|GER|70
Kialonda Gaspar|DC|28|ANG|73
Tiago Gabriel|DC|20|POR|71/78
Jamil Siebert|DC|23|GER|71
Danilo Veiga|DR|23|POR|71
Antonino Gallo|DL|25|ITA|74
Ylber Ramadani|DM|29|ALB|74
Lassana Coulibaly|MC|29|MLI|73
Medon Berisha|MC|21|ALB|71
Thorir Helgason|MC|25|ISL|71
Omri Gandelman|MC|25|ISR|71
Filip Marchwiński|AMC|23|POL|71
Santiago Pierotti|AMR|24|ARG|73
Konan N'Dri|AML|24|BEL|72
Riccardo Sottil|AML|26|ITA|73
Lameck Banda|AML|24|ZAM|72
Nikola Štulić|ST|23|SRB|73
Francesco Camarda|ST|17|ITA|72/87
`),
    club('Sassuolo', 'SAS', 64, 'Mapei Stadium', 21584, ['#00A752', '#000000'], 15, `
Arijanet Muric|GK|26|KVX|75
Stefano Turati|GK|23|ITA|72
Jay Idzes|DC|25|IDN|73
Tarik Muharemović|DC|22|BIH|73/79
Filippo Romagna|DC|28|ITA|71
Sebastian Walukiewicz|DR/DC|25|POL|73
Woyo Coulibaly|DR|26|FRA|70
Josh Doig|DL|23|SCO|72
Nemanja Matić|DM|37|SRB|74|leader
Kristian Thorstvedt|MC|26|NOR|74
Daniel Boloca|MC|26|ITA|72
Aster Vranckx|MC|22|BEL|72
Ismael Koné|MC|23|CAN|74
Luca Lipani|MC|20|ITA|71/78
Cristian Volpato|AMC|21|ITA|72/78
Domenico Berardi|AMR|31|ITA|79|sniper,set
Armand Laurienté|AML|26|FRA|77|dribbler
Alieu Fadera|AML|24|GAM|72
Andrea Pinamonti|ST|26|ITA|75
Samuele Mulattieri|ST|24|ITA|70
`),
    club('Pisa', 'PIS', 60, 'Arena Garibaldi', 10560, ['#000000', '#0067B1'], 10, `
Adrian Šemper|GK|27|CRO|72
Nicolas|GK|36|BRA|68
Raúl Albiol|DC|39|ESP|72|leader
Arturo Calabresi|DC|29|ITA|70
Antonio Caracciolo|DC|35|ITA|69
Simone Canestrelli|DC|24|ITA|71
Mehdi Léris|DR|27|ALG|71
Idrissa Touré|WBR|27|GER|71
Samuele Angori|DL|21|ITA|70/76
Marius Marin|DM|26|ROU|72
Michel Aebischer|MC|28|SUI|73
Ebenezer Akinsanmiro|MC|20|NGA|70/77
Malthe Højholt|MC|24|DEN|70
Gabriele Piccinini|MC|24|ITA|70
Matteo Tramoni|AMC|25|FRA|72
Lorran|AMC|19|BRA|69/79
Juan Cuadrado|AMR|37|COL|72
M'Bala Nzola|ST|28|ANG|73
Stefano Moreo|ST|31|ITA|70
Henrik Meister|ST|21|DEN|70/77
`),
    club('Cremonese', 'CRE', 60, 'Stadio Giovanni Zini', 16003, ['#E0001A', '#A0A0A0'], 10, `
Emil Audero|GK|28|ITA|74
Marco Silvestri|GK|34|ITA|70
Federico Baschirotto|DC|28|ITA|74|aerial
Matteo Bianchetti|DC|32|ITA|70
Filippo Terracciano|DC/DR|22|ITA|70
Mikayil Faye|DC|21|SEN|71/78
Giuseppe Pezzella|WBL|27|ITA|72
Tommaso Barbieri|WBR|22|ITA|70
Romano Floriani Mussolini|WBR|22|ITA|70
Alberto Grassi|MC|30|ITA|70
Martín Payero|MC|26|ARG|72
Warren Bondo|MC|21|FRA|71/77
Michele Collocolo|MC|25|ITA|69
Franco Vázquez|AMC|36|ARG|70
Jari Vandeputte|AML|29|BEL|71
Dennis Johnsen|AMR|27|NOR|70
Alessio Zerbin|AMR|26|ITA|70
Jamie Vardy|ST|38|ENG|74|finisher
Federico Bonazzoli|ST|28|ITA|72
Antonio Sanabria|ST|29|PAR|72
`),
  ],
};
