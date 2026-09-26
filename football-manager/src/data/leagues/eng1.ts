import { club, type RawLeague } from '../types';

export const eng1: RawLeague = {
  id: 'eng1',
  name: 'Premier League',
  short: 'EPL',
  country: 'ENG',
  tier: 1,
  tv: 110,
  europe: 5,
  relegateTo: 'eng2',
  relegated: 3,
  clubs: [
    club('Arsenal', 'ARS', 91, 'Emirates Stadium', 60704, ['#EF0107', '#FFFFFF'], 160, `
David Raya|GK|29|ESP|86|sweeper
Kepa Arrizabalaga|GK|30|ESP|79
Tommy Setford|GK|19|ENG|60/74
William Saliba|DC|24|FRA|88/90|pace,playmaker
Gabriel Magalhães|DC|27|BRA|87|aerial,leader
Jurriën Timber|DR/DC|24|NED|83/85|tackler
Ben White|DR/DC|27|ENG|82
Riccardo Calafiori|DL/DC|23|ITA|81/84
Piero Hincapié|DC/DL|23|ECU|81/84|pace
Cristhian Mosquera|DC|21|ESP|77/84
Myles Lewis-Skelly|DL/DM|18|ENG|77/88
Martin Ødegaard|AMC/MC|26|NOR|87|playmaker,leader
Declan Rice|MC/DM|26|ENG|87|engine,set
Martín Zubimendi|DM/MC|26|ESP|85|playmaker
Mikel Merino|MC/ST|29|ESP|83|aerial
Christian Nørgaard|DM|31|DEN|78
Eberechi Eze|AMC/AML|27|ENG|84|dribbler,sniper
Ethan Nwaneri|AMR/AMC|18|ENG|77/89|flair
Bukayo Saka|AMR|23|ENG|88/90|dribbler,crosser
Noni Madueke|AMR|23|ENG|80/83|dribbler
Gabriel Martinelli|AML|24|BRA|82|pace
Leandro Trossard|AML/ST|30|BEL|81
Viktor Gyökeres|ST|27|SWE|86|strong,finisher
Kai Havertz|ST/AMC|26|GER|83|aerial
Gabriel Jesus|ST|28|BRA|78
Max Dowman|AMR|15|ENG|62/89|dribbler
`),
    club('Liverpool', 'LIV', 94, 'Anfield', 61276, ['#C8102E', '#F6EB61'], 170, `
Alisson Becker|GK|32|BRA|88|shotstopper,leader
Giorgi Mamardashvili|GK|24|GEO|82/86
Freddie Woodman|GK|28|ENG|65
Virgil van Dijk|DC|33|NED|88|aerial,leader
Ibrahima Konaté|DC|26|FRA|85|pace,strong
Joe Gomez|DC/DR|28|ENG|77
Giovanni Leoni|DC|18|ITA|72/87
Jeremie Frimpong|DR/WBR|24|NED|83|pace,dribbler
Conor Bradley|DR|21|NIR|78/84|engine
Milos Kerkez|DL|21|HUN|80/85|engine
Andrew Robertson|DL|31|SCO|81|crosser
Alexis Mac Allister|MC|26|ARG|87|playmaker
Ryan Gravenberch|DM/MC|23|NED|85/87|dribbler
Dominik Szoboszlai|MC/AMC|24|HUN|84|sniper,engine
Florian Wirtz|AMC|22|GER|88/92|playmaker,dribbler
Curtis Jones|MC|24|ENG|80
Wataru Endo|DM|32|JPN|75|tackler
Trey Nyoni|MC|18|ENG|67/82
Mohamed Salah|AMR|33|EGY|89|finisher,dribbler
Cody Gakpo|AML/ST|26|NED|84|sniper
Federico Chiesa|AMR/AML|27|ITA|77
Rio Ngumoha|AML|16|ENG|64/86|dribbler
Alexander Isak|ST|25|SWE|88|finisher,dribbler
Hugo Ekitike|ST|23|FRA|83/87|dribbler
`),
    club('Manchester City', 'MCI', 93, 'Etihad Stadium', 53400, ['#6CABDD', '#1C2C5B'], 200, `
Gianluigi Donnarumma|GK|26|ITA|88|shotstopper
James Trafford|GK|22|ENG|78/83
Stefan Ortega|GK|32|GER|78|sweeper
Rúben Dias|DC|28|POR|87|leader,tackler
Joško Gvardiol|DC/DL|23|CRO|85/88
John Stones|DC|31|ENG|82|playmaker
Nathan Aké|DC/DL|30|NED|80
Abdukodir Khusanov|DC|21|UZB|77/84|pace
Rayan Aït-Nouri|DL|24|ALG|82|dribbler
Matheus Nunes|DR/MC|26|POR|80
Rico Lewis|DR/MC|20|ENG|79/85
Rodri|DM|29|ESP|90|playmaker,leader
Tijjani Reijnders|MC|26|NED|85
Bernardo Silva|MC/AMR|30|POR|86|engine,dribbler
Phil Foden|AMC/AML|25|ENG|86|flair,sniper
Rayan Cherki|AMC/AMR|21|FRA|83/89|flair,dribbler
Mateo Kovačić|MC|31|CRO|81
Nico González|DM|23|ESP|80/83
Jérémy Doku|AML|23|BEL|82/85|dribbler,pace
Savinho|AMR|21|BRA|81/87|dribbler
Oscar Bobb|AMR|21|NOR|75/82
Omar Marmoush|ST/AML|26|EGY|84|pace
Erling Haaland|ST|24|NOR|91/92|finisher,strong,pace
`),
    club('Chelsea', 'CHE', 88, 'Stamford Bridge', 40343, ['#034694', '#FFFFFF'], 130, `
Robert Sánchez|GK|27|ESP|80
Filip Jørgensen|GK|23|DEN|76/80
Levi Colwill|DC|22|ENG|83/87
Wesley Fofana|DC|24|FRA|80
Trevoh Chalobah|DC|26|ENG|80
Tosin Adarabioyo|DC|27|ENG|78|aerial
Benoît Badiashile|DC|24|FRA|78
Jorrel Hato|DL/DC|19|NED|78/88
Marc Cucurella|DL|26|ESP|84|engine
Reece James|DR/DM|25|ENG|84|crosser,set
Malo Gusto|DR|22|FRA|81/85|pace
Josh Acheampong|DR/DC|19|ENG|72/83
Moisés Caicedo|DM|23|ECU|87|tackler,engine
Enzo Fernández|MC|24|ARG|85|playmaker
Roméo Lavia|DM|21|BEL|78/85
Andrey Santos|MC|21|BRA|78/85
Dário Essugo|DM|20|POR|73/82
Cole Palmer|AMC/AMR|23|ENG|88/90|playmaker,set
Estêvão|AMR|18|BRA|80/92|dribbler,flair
Facundo Buonanotte|AMC|20|ARG|74/82
Pedro Neto|AMR/AML|25|POR|82|pace
Jamie Gittens|AML|20|ENG|79/86|dribbler,pace
Alejandro Garnacho|AML|21|ARG|80/85|pace
Tyrique George|AML|19|ENG|71/80
João Pedro|ST/AMC|23|BRA|82/85
Liam Delap|ST|22|ENG|79/85|strong
`),
    club('Manchester United', 'MUN', 86, 'Old Trafford', 74310, ['#DA291C', '#FBE122'], 120, `
Senne Lammens|GK|23|BEL|77/83
Altay Bayındır|GK|27|TUR|74
Tom Heaton|GK|39|ENG|62
Matthijs de Ligt|DC|25|NED|82|aerial
Lisandro Martínez|DC|27|ARG|83|hardman
Harry Maguire|DC|32|ENG|78|aerial
Leny Yoro|DC|19|FRA|79/89
Ayden Heaven|DC|18|ENG|70/82
Luke Shaw|DL/DC|30|ENG|78
Diogo Dalot|DR/DL|26|POR|80
Noussair Mazraoui|DR|27|MAR|80
Patrick Dorgu|WBL/DL|20|DEN|77/84|pace
Tyrell Malacia|DL|25|NED|70
Bruno Fernandes|AMC/MC|30|POR|87|playmaker,set,leader
Casemiro|DM|33|BRA|79|tackler
Manuel Ugarte|DM|24|URU|79|tackler
Kobbie Mainoo|MC|20|ENG|79/88
Mason Mount|AMC|26|ENG|78
Amad Diallo|AMR/WBR|22|CIV|81/85|dribbler
Bryan Mbeumo|AMR/ST|25|CMR|84|set
Matheus Cunha|AMC/ST|26|BRA|84|dribbler
Benjamin Šeško|ST|22|SVN|82/89|aerial,pace
Joshua Zirkzee|ST|24|NED|76
Chido Obi|ST|17|DEN|64/82
`),
    club('Tottenham Hotspur', 'TOT', 85, 'Tottenham Hotspur Stadium', 62850, ['#132257', '#FFFFFF'], 140, `
Guglielmo Vicario|GK|28|ITA|83|shotstopper
Antonín Kinský|GK|22|CZE|72/80
Brandon Austin|GK|26|ENG|62
Cristian Romero|DC|27|ARG|85|hardman,tackler
Micky van de Ven|DC|24|NED|84|pace
Kevin Danso|DC|26|AUT|78|strong
Radu Drăgușin|DC|23|ROU|77
Kota Takai|DC|20|JPN|70/80
Pedro Porro|DR|25|ESP|82|crosser
Djed Spence|DL/DR|24|ENG|77
Destiny Udogie|DL|22|ITA|80/84
Ben Davies|DL/DC|32|WAL|73
João Palhinha|DM|29|POR|82|tackler
Rodrigo Bentancur|MC/DM|28|URU|80
Yves Bissouma|DM|28|MLI|78
Pape Matar Sarr|MC|22|SEN|79/83|engine
Lucas Bergvall|MC|19|SWE|76/87
Archie Gray|DM/DR|19|ENG|75/86
James Maddison|AMC|28|ENG|82|set,playmaker
Xavi Simons|AMC/AML|22|NED|84/88|dribbler
Dejan Kulusevski|AMR|25|SWE|82
Mohammed Kudus|AMR|24|GHA|82|dribbler
Brennan Johnson|AMR|24|WAL|79|pace
Wilson Odobert|AML|20|FRA|75/83
Mathys Tel|ST/AML|20|FRA|76/85
Dominic Solanke|ST|27|ENG|80
Richarlison|ST|28|BRA|77
Randal Kolo Muani|ST|26|FRA|81|pace
`),
    club('Newcastle United', 'NEW', 84, "St James' Park", 52305, ['#241F20', '#FFFFFF'], 90, `
Nick Pope|GK|33|ENG|81
Aaron Ramsdale|GK|27|ENG|78
John Ruddy|GK|38|ENG|60
Sven Botman|DC|25|NED|81
Fabian Schär|DC|33|SUI|79|playmaker
Dan Burn|DC/DL|33|ENG|78|aerial
Malick Thiaw|DC|23|GER|80/84
Jamaal Lascelles|DC|31|ENG|70
Tino Livramento|DR/DL|22|ENG|80/84|pace
Kieran Trippier|DR|34|ENG|77|crosser,set
Lewis Hall|DL|20|ENG|80/86
Emil Krafth|DR|31|SWE|70
Bruno Guimarães|MC/DM|27|BRA|86|playmaker,leader
Sandro Tonali|MC/DM|25|ITA|85|engine
Joelinton|MC|28|BRA|82|strong,engine
Jacob Ramsey|MC/AMC|24|ENG|77
Joe Willock|MC|25|ENG|75
Lewis Miley|MC|19|ENG|73/83
Anthony Gordon|AML|24|ENG|83|pace
Harvey Barnes|AML|27|ENG|78
Jacob Murphy|AMR|30|ENG|78|crosser
Anthony Elanga|AMR|23|SWE|80/83|pace
Nick Woltemade|ST|23|GER|80/85|dribbler,aerial
Yoane Wissa|ST|28|COD|80
William Osula|ST|21|DEN|71/78
`),
    club('Aston Villa', 'AVL', 83, 'Villa Park', 42640, ['#670E36', '#95BFE5'], 70, `
Emiliano Martínez|GK|32|ARG|85|shotstopper,leader
Marco Bizot|GK|34|NED|72
Ezri Konsa|DC/DR|27|ENG|82
Pau Torres|DC|28|ESP|81|playmaker
Tyrone Mings|DC|32|ENG|77
Victor Lindelöf|DC|31|SWE|76
Lamare Bogarde|DC/DM|21|NED|70/78
Matty Cash|DR|27|POL|79
Lucas Digne|DL|31|FRA|78|crosser,set
Ian Maatsen|DL|23|NED|78
Andrés García|DR|22|ESP|72/78
Boubacar Kamara|DM|25|FRA|82|tackler
Amadou Onana|DM/MC|23|BEL|81|strong
Youri Tielemans|MC|28|BEL|83|playmaker
John McGinn|MC/AML|30|SCO|80|engine,leader
Ross Barkley|AMC|31|ENG|74
Emiliano Buendía|AMC|28|ARG|77
Morgan Rogers|AMC/AML|22|ENG|82/87|dribbler,strong
Harvey Elliott|AMC/AMR|22|ENG|78/83
Jadon Sancho|AML|25|ENG|77
Evann Guessand|ST/AMR|24|CIV|76
Donyell Malen|ST/AMR|26|NED|78
Ollie Watkins|ST|29|ENG|84|finisher,pace
`),
    club('Brighton & Hove Albion', 'BHA', 78, 'Amex Stadium', 31876, ['#0057B8', '#FFFFFF'], 80, `
Bart Verbruggen|GK|22|NED|80/84
Jason Steele|GK|34|ENG|70
Lewis Dunk|DC|33|ENG|78|playmaker,leader
Jan Paul van Hecke|DC|25|NED|80
Adam Webster|DC|30|ENG|74
Olivier Boscagli|DC|27|FRA|76
Diego Coppola|DC|21|ITA|73/80
Joël Veltman|DR|33|NED|73
Ferdi Kadıoğlu|DL/DR|25|TUR|79
Maxim De Cuyper|DL|24|BEL|77
Mats Wieffer|DR/DM|25|NED|76
Carlos Baleba|DM|21|CMR|81/87|engine
Jack Hinshelwood|MC/DR|20|ENG|74/82
Yasin Ayari|MC|21|SWE|75/81
Diego Gómez|MC|22|PAR|74/80
James Milner|MC|39|ENG|67|leader
Georginio Rutter|AMC/ST|23|FRA|78/82|dribbler
Kaoru Mitoma|AML|28|JPN|81|dribbler
Yankuba Minteh|AMR|20|GAM|78/85|pace
Brajan Gruda|AMR/AMC|21|GER|75/82
Solly March|MR|31|ENG|72
Tommy Watson|AML|19|ENG|68/80
Danny Welbeck|ST|34|ENG|75
Stefanos Tzimas|ST|19|GRE|72/82
Charalampos Kostoulas|ST|18|GRE|70/83
`),
    club('Bournemouth', 'BOU', 74, 'Vitality Stadium', 11307, ['#DA291C', '#000000'], 50, `
Đorđe Petrović|GK|25|SRB|79
Fraser Forster|GK|37|ENG|70
Marcos Senesi|DC|28|ARG|80
Bafodé Diakité|DC|24|FRA|77
James Hill|DC|23|ENG|72
Veljko Milosavljević|DC|17|SRB|68/82
Adam Smith|DR|34|ENG|72
Álex Jiménez|DR|20|ESP|74/82
Adrien Truffert|DL|23|FRA|77/80
Julio Soler|DL|20|ARG|72/79
Tyler Adams|DM|26|USA|79|tackler
Lewis Cook|MC|28|ENG|77
Alex Scott|MC|21|ENG|77/83
Ryan Christie|MC|30|SCO|76|engine
Marcus Tavernier|AML/AMC|26|ENG|78|set
Justin Kluivert|AMC/AML|26|NED|80
David Brooks|AMR|28|WAL|75
Amine Adli|AML/AMR|25|MAR|77
Ben Gannon-Doak|AMR|19|SCO|71/81
Antoine Semenyo|AMR/ST|25|GHA|82|pace,strong
Evanilson|ST|25|BRA|79
Eli Junior Kroupi|ST|19|FRA|71/82
Enes Ünal|ST|28|TUR|74
`),
    club('Brentford', 'BRE', 72, 'Gtech Community Stadium', 17250, ['#E30613', '#FFFFFF'], 40, `
Caoimhín Kelleher|GK|26|IRL|80
Hákon Valdimarsson|GK|23|ISL|70
Nathan Collins|DC|24|IRL|79|aerial
Kristoffer Ajer|DC/DR|27|NOR|76
Ethan Pinnock|DC|32|JAM|76|aerial
Sepp van den Berg|DC|23|NED|77
Aaron Hickey|DR/DL|23|SCO|75
Rico Henry|DL|28|ENG|74
Michael Kayode|DR|20|ITA|74/80|set
Keane Lewis-Potter|DL/AML|24|ENG|76
Vitaly Janelt|DM|27|GER|76
Mikkel Damsgaard|AMC/MC|25|DEN|79|playmaker,set
Yehor Yarmoliuk|MC|21|UKR|73/80
Mathias Jensen|MC|29|DEN|77
Jordan Henderson|MC|35|ENG|75|leader
Fábio Carvalho|AMC|22|POR|74/80
Kevin Schade|AML/ST|23|GER|77|pace
Dango Ouattara|AMR|23|BFA|77/80|pace
Gustavo Nunes|AMR|19|BRA|68/80
Igor Thiago|ST|24|BRA|77|strong
`),
    club('Crystal Palace', 'CRY', 74, 'Selhurst Park', 25486, ['#1B458F', '#C4122E'], 45, `
Dean Henderson|GK|28|ENG|81
Walter Benítez|GK|32|ARG|74
Marc Guéhi|DC|24|ENG|84|leader
Maxence Lacroix|DC|25|FRA|81|pace
Chris Richards|DC|25|USA|77
Jaydee Canvot|DC|19|FRA|70/81
Chadi Riad|DC|21|MAR|72/80
Daniel Muñoz|WBR/DR|29|COL|81|engine
Tyrick Mitchell|WBL/DL|25|ENG|79
Borna Sosa|WBL|27|CRO|74|crosser
Nathaniel Clyne|DR|34|ENG|70
Adam Wharton|MC|21|ENG|80/88|playmaker
Jefferson Lerma|DM/MC|30|COL|78|hardman
Will Hughes|MC|30|ENG|75
Cheick Doucouré|DM|25|MLI|76
Daichi Kamada|MC/AMC|28|JPN|77
Justin Devenny|MC|21|NIR|70/77
Yéremy Pino|AMR/AML|22|ESP|79/83
Ismaïla Sarr|AMR/ST|27|SEN|80|pace
Christantus Uche|AMC/ST|22|NGA|72/78
Jean-Philippe Mateta|ST|28|FRA|80|strong
Eddie Nketiah|ST|26|ENG|75
`),
    club('Everton', 'EVE', 75, 'Hill Dickinson Stadium', 52888, ['#003399', '#FFFFFF'], 60, `
Jordan Pickford|GK|31|ENG|83|shotstopper
Mark Travers|GK|26|IRL|72
James Tarkowski|DC|32|ENG|79|aerial,leader
Jarrad Branthwaite|DC|23|ENG|80/85
Michael Keane|DC|32|ENG|75
Jake O'Brien|DC/DR|24|IRL|75
Vitaliy Mykolenko|DL|26|UKR|78
Nathan Patterson|DR|23|SCO|72
Séamus Coleman|DR|36|IRL|68|leader
Adam Aznou|DL|19|MAR|70/80
James Garner|MC/DM|24|ENG|77|set
Idrissa Gueye|DM|35|SEN|75|tackler
Tim Iroegbunam|DM|22|ENG|72/78
Kiernan Dewsbury-Hall|MC/AMC|26|ENG|77
Carlos Alcaraz|MC|22|ARG|73/78
Merlin Röhl|MC|22|GER|72/78
Jack Grealish|AML/AMC|29|ENG|80|dribbler
Iliman Ndiaye|AML/AMC|25|SEN|79|dribbler
Dwight McNeil|AML/AMR|25|ENG|77|crosser,set
Tyler Dibling|AMR|19|ENG|75/86|dribbler
Thierno Barry|ST|22|FRA|76/82|aerial
Beto|ST|27|GNB|74|strong
`),
    club('Fulham', 'FUL', 72, 'Craven Cottage', 29589, ['#FFFFFF', '#000000'], 45, `
Bernd Leno|GK|33|GER|81
Benjamin Lecomte|GK|34|FRA|68
Calvin Bassey|DC/DL|25|NGA|77
Joachim Andersen|DC|29|DEN|79|playmaker
Issa Diop|DC|28|FRA|75
Jorge Cuenca|DC|25|ESP|73
Kenny Tete|DR|29|NED|76
Timothy Castagne|DR|29|BEL|76
Antonee Robinson|DL|27|USA|80|pace,crosser
Ryan Sessegnon|DL/ML|25|ENG|74
Sander Berge|DM/MC|27|NOR|79
Saša Lukić|MC|28|SRB|77
Harrison Reed|DM|30|ENG|73
Tom Cairney|MC|34|SCO|72
Emile Smith Rowe|AMC|24|ENG|78
Andreas Pereira|AMC/MC|29|BRA|78|set
Alex Iwobi|AML/MC|29|NGA|79
Adama Traoré|AMR|29|ESP|76|pace,dribbler
Harry Wilson|AMR|28|WAL|77|sniper
Samuel Chukwueze|AMR|26|NGA|76
Kevin|AML|22|BRA|74/81
Josh King|AMC|18|ENG|68/80
Raúl Jiménez|ST|34|MEX|77
Rodrigo Muniz|ST|24|BRA|76
`),
    club('Nottingham Forest', 'NFO', 76, 'City Ground', 30404, ['#DD0000', '#FFFFFF'], 55, `
Matz Sels|GK|33|BEL|81
John Victor|GK|29|BRA|72
Angus Gunn|GK|29|SCO|70
Murillo|DC|22|BRA|82/86|playmaker
Nikola Milenković|DC|27|SRB|81|aerial
Morato|DC|24|BRA|74
Jair Cunha|DC|20|BRA|70/79
Willy Boly|DC|34|CIV|70
Neco Williams|DR/DL|24|WAL|78
Ola Aina|DR|28|NGA|79
Oleksandr Zinchenko|DL/MC|28|UKR|76
Nicolò Savona|DR|22|ITA|74/79
Elliot Anderson|MC/DM|22|ENG|83/87|engine
Ibrahim Sangaré|DM|27|CIV|78
Nicolás Domínguez|MC|27|ARG|76
Douglas Luiz|MC|27|BRA|78
Ryan Yates|MC|27|ENG|74
Morgan Gibbs-White|AMC|25|ENG|83|playmaker
James McAtee|AMC|22|ENG|75/80
Omari Hutchinson|AMR|21|ENG|76/82
Callum Hudson-Odoi|AML|24|ENG|78
Dan Ndoye|AMR|24|SUI|79
Dilane Bakwa|AMR|22|FRA|74
Chris Wood|ST|33|NZL|80|aerial,finisher
Igor Jesus|ST|24|BRA|76
Arnaud Kalimuendo|ST|23|FRA|77
Taiwo Awoniyi|ST|27|NGA|73
`),
    club('West Ham United', 'WHU', 76, 'London Stadium', 62500, ['#7A263A', '#1BB1E7'], 50, `
Alphonse Areola|GK|32|FRA|78
Mads Hermansen|GK|25|DEN|77
Łukasz Fabiański|GK|40|POL|69
Max Kilman|DC|28|ENG|78
Konstantinos Mavropanos|DC|27|GRE|76|strong
Jean-Clair Todibo|DC|25|FRA|78
Igor Julio|DC|27|BRA|74
Aaron Wan-Bissaka|DR|27|ENG|78|tackler
El Hadji Malick Diouf|DL|20|SEN|75/82
Kyle Walker-Peters|DR/DL|28|ENG|75
Oliver Scarles|DL|19|ENG|68/78
Tomáš Souček|MC|30|CZE|77|aerial
Mateus Fernandes|MC|21|POR|76/82
Soungoutou Magassa|DM|21|FRA|73/81
Guido Rodríguez|DM|31|ARG|76
James Ward-Prowse|MC|30|ENG|76|set
Lucas Paquetá|AMC/MC|27|BRA|81|flair
Jarrod Bowen|AMR/ST|28|ENG|82|pace
Crysencio Summerville|AML|23|NED|77
Luis Guilherme|AMR|19|BRA|68/79
Niclas Füllkrug|ST|32|GER|76|aerial
Callum Wilson|ST|33|ENG|75
Callum Marshall|ST|20|NIR|65/75
`),
    club('Wolverhampton Wanderers', 'WOL', 72, 'Molineux', 31750, ['#FDB913', '#231F20'], 35, `
José Sá|GK|32|POR|78
Sam Johnstone|GK|32|ENG|75
Daniel Bentley|GK|31|ENG|67
Emmanuel Agbadou|DC|28|CIV|76
Santiago Bueno|DC|26|URU|74
Toti Gomes|DC|26|POR|75
Yerson Mosquera|DC|24|COL|75
Ladislav Krejčí|DC/DM|26|CZE|76
Matt Doherty|DR|33|IRL|72
Jackson Tchatchoua|WBR|23|CMR|73
Hugo Bueno|WBL|22|ESP|72
David Møller Wolfe|WBL|23|NOR|72
André|DM|24|BRA|77
João Gomes|DM/MC|24|BRA|79|tackler
Jean-Ricner Bellegarde|AMC|27|FRA|75
Marshall Munetsi|MC|29|ZIM|75
Rodrigo Gomes|AMR|21|POR|72/78
Fer López|AMC|21|ESP|72/79
Hwang Hee-chan|AMC/ST|29|KOR|74
Jhon Arias|AMR|27|COL|78
Jørgen Strand Larsen|ST|25|NOR|78|aerial
Tolu Arokodare|ST|24|NGA|74
Saša Kalajdžić|ST|28|AUT|71
`),
    club('Leeds United', 'LEE', 72, 'Elland Road', 37645, ['#FFFFFF', '#1D428A'], 35, `
Lucas Perri|GK|27|BRA|76
Illan Meslier|GK|25|FRA|74
Karl Darlow|GK|34|WAL|70
Pascal Struijk|DC/DL|26|NED|76
Joe Rodon|DC|27|WAL|77
Jaka Bijol|DC|26|SVN|77
Sebastiaan Bornauw|DC|26|BEL|74
Jayden Bogle|DR|24|ENG|75
Gabriel Gudmundsson|DL|26|SWE|74
James Justin|DR/DL|27|ENG|75
Sam Byram|DL/DR|31|ENG|70
Ethan Ampadu|DM|24|WAL|77|leader
Ao Tanaka|MC|26|JPN|76
Anton Stach|MC/DM|26|GER|77|sniper
Sean Longstaff|MC|27|ENG|75
Ilia Gruev|DM|25|BUL|73
Brenden Aaronson|AMC/AMR|24|USA|75|engine
Daniel James|AMR/AML|27|WAL|75|pace
Willy Gnonto|AMR/AML|21|ITA|75/80
Noah Okafor|AML|25|SUI|77
Jack Harrison|AML|28|ENG|74
Dominic Calvert-Lewin|ST|28|ENG|76|aerial
Lukas Nmecha|ST|26|GER|74
Joël Piroe|ST|26|NED|74
`),
    club('Burnley', 'BUR', 68, 'Turf Moor', 21944, ['#6C1D45', '#99D6EA'], 30, `
Martin Dúbravka|GK|36|SVK|76
Max Weiß|GK|21|GER|70/77
Maxime Estève|DC|23|FRA|77/81
Joe Worrall|DC|28|ENG|72
Hjalmar Ekdal|DC|26|SWE|73
Axel Tuanzebe|DC/DR|27|COD|72
Bashir Humphreys|DC/DL|22|ENG|72/77
Kyle Walker|DR|35|ENG|77|pace,leader
Quilindschy Hartman|DL|23|NED|74
Lucas Pires|DL|24|BRA|72
Connor Roberts|DR|29|WAL|72
Oliver Sonne|DR|24|DEN|71
Josh Cullen|DM|29|IRL|76
Lesley Ugochukwu|DM|21|FRA|73/80
Florentino Luís|DM|26|POR|77|tackler
Josh Laurent|MC|30|ENG|72
Hannibal Mejbri|AMC/MC|22|TUN|74
Jaidon Anthony|AML|25|ENG|74
Loum Tchaouna|AMR|22|FRA|73
Marcus Edwards|AMR|26|ENG|74|dribbler
Jacob Bruun Larsen|AML|26|DEN|72
Zian Flemming|AMC/ST|26|NED|75
Armando Broja|ST|23|ALB|74
Lyle Foster|ST|24|RSA|73
`),
    club('Sunderland', 'SUN', 68, 'Stadium of Light', 48707, ['#EB172B', '#FFFFFF'], 40, `
Robin Roefs|GK|22|NED|76/81
Anthony Patterson|GK|25|ENG|72
Dan Ballard|DC|25|NIR|74|aerial
Luke O'Nien|DC/DR|30|ENG|72
Omar Alderete|DC|28|PAR|76
Nordi Mukiele|DR/DC|27|FRA|77
Lutsharel Geertruida|DR/DC|24|NED|76
Trai Hume|DR|23|NIR|73
Reinildo Mandava|DL|31|MOZ|76
Dennis Cirkin|DL|23|ENG|71
Arthur Masuaku|DL|31|COD|72
Granit Xhaka|MC/DM|32|SUI|83|playmaker,leader
Noah Sadiki|DM|20|COD|75/83
Habib Diarra|MC|21|SEN|76/82
Enzo Le Fée|MC/AMC|25|FRA|77
Dan Neil|MC|23|ENG|72
Chris Rigg|MC/AMC|18|ENG|72/86
Patrick Roberts|AMR|28|ENG|72
Simon Adingra|AML|23|CIV|76
Chemsdine Talbi|AMR|20|MAR|74/81
Bertrand Traoré|AMR|29|BFA|74
Romaine Mundle|AML|22|ENG|70
Wilson Isidor|ST|24|FRA|76
Brian Brobbey|ST|23|NED|77|strong
Eliezer Mayenda|ST|20|ESP|72/80
`),
  ],
};
