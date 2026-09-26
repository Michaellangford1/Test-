import { club, type RawLeague } from '../types';

export const eng2: RawLeague = {
  id: 'eng2',
  name: 'Championship',
  short: 'CHA',
  country: 'ENG',
  tier: 2,
  tv: 9,
  europe: 0,
  promoteTo: 'eng1',
  promotedAuto: 2,
  playoffs: true,
  clubs: [
    club('Leicester City', 'LEI', 66, 'King Power Stadium', 32259, ['#003090', '#FDBE11'], 25, `
Jakub Stolarczyk|GK|24|POL|70/75
Asmir Begović|GK|38|BIH|67
Jannik Vestergaard|DC|32|DEN|74|aerial
Caleb Okoli|DC|23|ITA|72
Ricardo Pereira|DR|31|POR|74
Victor Kristiansen|DL|22|DEN|72
Harry Winks|DM|29|ENG|74|playmaker
Oliver Skipp|DM|24|ENG|73
Hamza Choudhury|DM|27|ENG|71
Jordan James|MC|21|WAL|71/77
Stephy Mavididi|AML|27|ENG|76|dribbler
Abdul Fatawu|AMR|21|GHA|74/80|pace
Kasey McAteer|AMR|23|IRL|70
Bobby De Cordova-Reid|AMR|32|JAM|70
Jordan Ayew|ST/AMR|33|GHA|72
Patson Daka|ST|26|ZAM|72
`),
    club('Ipswich Town', 'IPS', 64, 'Portman Road', 30056, ['#0033A0', '#FFFFFF'], 25, `
Christian Walton|GK|29|ENG|70
Alex Palmer|GK|28|ENG|72
Cameron Burgess|DC|29|AUS|70
Dara O'Shea|DC|26|IRL|74
Jacob Greaves|DC|24|ENG|72
Leif Davis|DL|25|ENG|75|crosser
Ben Johnson|DR|25|ENG|71
Jens Cajuste|MC|25|SWE|74
Azor Matusiwa|DM|27|NED|73
Kalvin Phillips|DM|29|ENG|72
Marcelino Núñez|MC|25|CHI|72
Conor Chaplin|AMC|28|ENG|72
Sam Szmodics|AMC|29|IRL|71
Jack Clarke|AML|24|ENG|76|dribbler
Jaden Philogene|AML|23|ENG|74
Sindre Walle Egeli|AMR|19|NOR|70/80
Wes Burns|AMR|30|WAL|70
George Hirst|ST|26|SCO|71
Chuba Akpom|ST|29|ENG|71
Ivan Azón|ST|22|ESP|71/77
`),
    club('Southampton', 'SOU', 63, "St Mary's Stadium", 32384, ['#D71920', '#FFFFFF'], 25, `
Gavin Bazunu|GK|23|IRL|72
Alex McCarthy|GK|35|ENG|68
Taylor Harwood-Bellis|DC|23|ENG|75
Nathan Wood|DC|23|ENG|70
Jack Stephens|DC|31|ENG|70
Ryan Manning|DL|29|IRL|72|set
James Bree|DR|27|ENG|69
Flynn Downes|DM|26|ENG|73
Shea Charles|DM|21|NIR|72/77
Joe Aribo|MC|28|NGA|72
Will Smallbone|MC|25|IRL|71
Finn Azaz|AMC|24|IRL|73
Tom Fellows|AMR|21|ENG|72/78
Leo Scienza|AML|26|BRA|72
Samuel Edozie|AML|22|ENG|70
Adam Armstrong|ST|28|ENG|74
Cameron Archer|ST|23|ENG|73
Ross Stewart|ST|28|SCO|70
Damion Downs|ST|20|USA|71/78
`),
    club('Sheffield United', 'SHU', 60, 'Bramall Lane', 32050, ['#EE2737', '#FFFFFF'], 15, `
Michael Cooper|GK|25|ENG|71
Harrison Burrows|DL|23|ENG|72
Jack Robinson|DC|31|ENG|70
Japhet Tanganga|DC|26|ENG|71
Anel Ahmedhodžić|DC|26|BIH|73
Gustavo Hamer|MC|28|NED|75|sniper
Sydie Peck|MC|20|ENG|70/76
Tom Davies|MC|27|ENG|70
Callum O'Hare|AMC|27|ENG|72
Andre Brooks|AMR|22|ENG|70
Tyrese Campbell|ST|25|ENG|72
Rhian Brewster|ST|25|ENG|69
`),
    club('Middlesbrough', 'MID', 60, 'Riverside Stadium', 34742, ['#E11B22', '#FFFFFF'], 20, `
Sol Brynn|GK|24|ENG|70
Seny Dieng|GK|30|SEN|70
Dael Fry|DC|27|ENG|72
George Edmundson|DC|28|ENG|70
Luke Ayling|DR|33|ENG|70
Callum Brittain|DR|27|ENG|72
Matt Targett|DL|29|ENG|70
Hayden Hackney|MC|23|ENG|75/79|playmaker
Aidan Morris|DM|23|USA|72
Alan Browne|MC|30|IRL|69
Riley McGree|AMC|27|AUS|72
Delano Burgzorg|AML|26|NED|72
Morgan Whittaker|AMR|24|ENG|74
Micah Hamilton|AML|21|ENG|69/75
Tommy Conway|ST|22|SCO|71
`),
    club('Coventry City', 'COV', 60, 'Coventry Building Society Arena', 32609, ['#77B0E0', '#FFFFFF'], 20, `
Oliver Dovin|GK|22|SWE|70/75
Bobby Thomas|DC|24|ENG|71
Liam Kitching|DC|25|ENG|71
Joel Latibeaudiere|DC|25|JAM|70
Milan van Ewijk|DR|24|NED|73
Jay Dasilva|DL|27|ENG|71
Ben Sheaf|DM|27|ENG|71
Victor Torp|MC|25|DEN|71
Matt Grimes|MC|30|ENG|72
Jack Rudoni|AMC|24|ENG|74
Tatsuhiro Sakamoto|AMR|28|JPN|71
Ephron Mason-Clark|AML|26|ENG|71
Haji Wright|ST|27|USA|74
Ellis Simms|ST|24|ENG|72
Brandon Thomas-Asante|ST|26|GHA|71
`),
    club('Bristol City', 'BRC', 57, 'Ashton Gate', 27000, ['#E21B23', '#FFFFFF'], 15, `
Max O'Leary|GK|28|IRL|70
Radek Vítek|GK|21|CZE|70/77
Rob Dickie|DC|29|ENG|70
Zak Vyner|DC|28|ENG|71
Ross McCrorie|DR|27|SCO|71
Cameron Pring|DL|27|ENG|69
Jason Knight|MC|24|IRL|73
Joe Williams|MC|28|ENG|70
Scott Twine|AMC|26|ENG|73|set
Anis Mehmeti|AML|24|ALB|73
Mark Sykes|AMR|28|IRL|70
Yu Hirakawa|AMR|24|JPN|70
Sinclair Armstrong|ST|22|IRL|70
Emil Riis Jakobsen|ST|27|DEN|71
Nahki Wells|ST|35|BER|67
`),
    club('West Bromwich Albion', 'WBA', 60, 'The Hawthorns', 26688, ['#122F67', '#FFFFFF'], 18, `
Josh Griffiths|GK|23|ENG|70
Kyle Bartley|DC|34|ENG|69
Darnell Furlong|DR|29|ENG|71
Callum Styles|DL/MC|25|HUN|72
Alex Mowatt|MC|30|ENG|71
Jayson Molumby|MC|26|IRL|71
Ousmane Diakité|MC|25|MLI|70
Toby Collyer|DM|21|ENG|70/77
Isaac Price|AMC|21|NIR|71/77
Karlan Grant|AML|27|ENG|71
Mikey Johnston|AML|26|IRL|71
Josh Maja|ST|26|NGA|73
Aune Heggebø|ST|24|NOR|70
`),
    club('Norwich City', 'NOR', 58, 'Carrow Road', 27359, ['#FFF200', '#00A650'], 15, `
Vladan Kovačević|GK|27|BIH|71
Shane Duffy|DC|33|IRL|70|aerial
José Córdoba|DC|24|BUL|71
Jack Stacey|DR|29|ENG|70
Kellen Fisher|DR|21|ENG|70/76
Kenny McLean|MC|33|SCO|70
Liam Gibbs|MC|22|ENG|71
Jacob Wright|MC|20|ENG|69/76
Emiliano Marcondes|AMC|30|DEN|70
Oscar Schwartau|AMC|18|DEN|67/80
Borja Sainz|AML|24|ESP|74|dribbler
Ante Crnac|ST|21|CRO|72/78
Josh Sargent|ST|25|USA|74
Mathias Kvistgaarden|ST|23|DEN|72
`),
    club('Watford', 'WAT', 56, 'Vicarage Road', 22200, ['#FBEE23', '#ED2127'], 12, `
Egil Selvik|GK|27|NOR|68
Ryan Porteous|DC|26|SCO|70
Mattie Pollock|DC|23|ENG|70
James Abankwah|DC|21|IRL|68
Edo Kayembe|DM|27|COD|71
Imrân Louza|MC|26|MAR|72
Giorgi Chakvetadze|AMC|25|GEO|71
Kwadwo Baah|AML|22|GER|70
Rocco Vata|AMR|20|IRL|68/75
Vakoun Issouf Bayo|ST|28|CIV|70
Mamadou Doumbia|ST|19|MLI|68/76
Luca Kjerrumgaard|ST|22|DEN|70
`),
    club('Millwall', 'MLW', 54, 'The Den', 20146, ['#001D5E', '#FFFFFF'], 10, `
Lukas Jensen|GK|26|DEN|70
Jake Cooper|DC|30|ENG|70|aerial
Joe Bryan|DL|31|ENG|68
Wes Harding|DR|28|ENG|68
Billy Mitchell|DM|24|ENG|70
Casper De Norre|MC|27|BEL|70
George Honeyman|MC|30|ENG|68
Camiel Neghli|AMC|23|NED|70
Femi Azeez|AMR|24|ENG|71
Mihailo Ivanović|ST|20|SRB|70/76
Macaulay Langstaff|ST|28|ENG|70
`),
    club('Preston North End', 'PNE', 54, 'Deepdale', 23404, ['#FFFFFF', '#0A1F44'], 10, `
Daniel Iversen|GK|28|DEN|71
Jordan Storey|DC|28|ENG|70
Liam Lindsay|DC|29|SCO|69
Andrija Vukčević|DL|28|MNE|68
Thierry Small|DL|20|ENG|68/74
Ben Whiteman|MC|29|ENG|70
Ali McCann|MC|25|NIR|69
Robbie Brady|DL|33|IRL|69|set
Mads Frøkjær-Jensen|AMC|26|DEN|70
Lewis Dobbin|AML|22|ENG|69
Milutin Osmajić|ST|26|MNE|70
Daniel Jebbison|ST|21|CAN|69/75
Michael Smith|ST|33|ENG|67
`),
    club('Blackburn Rovers', 'BLB', 55, 'Ewood Park', 31367, ['#009EE0', '#FFFFFF'], 10, `
Aynsley Pears|GK|27|ENG|70
Balázs Tóth|GK|28|HUN|68
Scott Wharton|DC|27|ENG|69
Hayden Carter|DC|25|ENG|70
Ryan Alebiosu|DR|23|ENG|70
Harry Pickering|DL|26|ENG|69
Sondre Tronstad|MC|30|NOR|70
Lewis Travis|DM|27|ENG|69
Todd Cantwell|AMC|27|ENG|72
Ryoya Morishita|AML|28|JPN|70
Makhtar Gueye|ST|27|SEN|70
Yuki Ohashi|ST|28|JPN|70
`),
    club('Hull City', 'HUL', 54, 'MKM Stadium', 25586, ['#F5A12D', '#000000'], 12, `
Ivor Pandur|GK|25|CRO|70
Charlie Hughes|DC|21|ENG|70/76
Ryan Giles|DL|25|ENG|71|crosser
Lewie Coyle|DR|29|ENG|69
John Lundstram|DM|31|ENG|70
Regan Slater|MC|25|ENG|69
Matt Crooks|MC|31|ENG|69
Kieran Dowell|AMC|27|ENG|69
Mohamed Belloumi|AMR|23|ALG|70
Joe Gelhardt|ST|23|ENG|70
Oli McBurnie|ST|29|SCO|70
Kyle Joseph|ST|23|WAL|69
`),
    club('Derby County', 'DER', 56, 'Pride Park', 33597, ['#FFFFFF', '#000000'], 10, `
Jacob Widell Zetterström|GK|26|SWE|70
Nathaniel Phillips|DC|28|ENG|70
Sondre Langås|DC|24|NOR|69
Kane Wilson|DR|25|ENG|68
Callum Elder|DL|30|AUS|68
Ebou Adams|DM|29|GAM|68
David Ozoh|MC|20|ENG|69/76
Ben Brereton Díaz|AML|26|CHI|71
Carlton Morris|ST|29|ENG|72
Patrick Agyemang|ST|24|USA|70
Jerry Yates|ST|28|ENG|69
Lars-Jørgen Salvesen|ST|29|NOR|68
`),
    club('Portsmouth', 'POR', 54, 'Fratton Park', 20867, ['#001489', '#FFFFFF'], 10, `
Nicolas Schmid|GK|28|AUT|69
Regan Poole|DC|27|WAL|69
Conor Shaughnessy|DC|29|IRL|69
Hayden Matthews|DC|21|AUS|68/75
Jordan Williams|DR|25|WAL|68
Connor Ogilvie|DL|29|ENG|68
Marlon Pack|DM|34|ENG|68|leader
Andre Dozzell|MC|26|ENG|69
John Swift|AMC|30|ENG|70|set
Josh Murphy|AML|30|ENG|70
Callum Lang|AMR|26|ENG|70
Adrian Segečić|AMR|21|AUS|68/75
Colby Bishop|ST|28|ENG|70
Mark O'Mahony|ST|20|IRL|68/75
`),
    club('Oxford United', 'OXF', 50, 'Kassam Stadium', 12500, ['#FFDD00', '#0F1E4A'], 8, `
Jamie Cumming|GK|25|ENG|68
Elliott Moore|DC|28|ENG|68
Ciaron Brown|DC|27|NIR|68
Sam Long|DR|30|ENG|67
Greg Leigh|DL|31|JAM|67
Cameron Brannagan|MC|29|ENG|70
Will Vaulks|DM|31|WAL|68
Brian De Keersmaecker|MC|24|BEL|68
Tyler Goodrham|AMR|21|IRL|68/74
Przemysław Płacheta|AML|27|POL|69
Siriki Dembélé|AML|28|BFA|69
Mark Harris|ST|26|WAL|68
Will Lankshear|ST|20|ENG|68/76
`),
    club('Stoke City', 'STK', 55, 'bet365 Stadium', 30089, ['#E03A3E', '#FFFFFF'], 15, `
Viktor Johansson|GK|26|SWE|72
Ben Wilmot|DC|25|ENG|71
Michael Rose|DC|29|SCO|68
Ashley Phillips|DC|20|ENG|69/76
Junior Tchamadeu|DR|21|ENG|70/76
Eric Bocat|DL|25|FRA|68
Lewis Baker|MC|30|ENG|70|set
Tatsuki Seko|MC|27|JPN|69
Bae Jun-ho|AMC|21|KOR|70/77
Million Manhoef|AMR|23|NED|71
Sorba Thomas|AML|26|WAL|70|crosser
Robert Bozeník|ST|25|SVK|70
Sam Gallagher|ST|29|ENG|69
`),
    club('Queens Park Rangers', 'QPR', 53, 'Loftus Road', 18439, ['#005CAB', '#FFFFFF'], 8, `
Paul Nardi|GK|31|FRA|69
Jimmy Dunne|DC|27|IRL|69
Steve Cook|DC|34|ENG|68
Kenneth Paal|DL|27|SUR|70
Sam Field|DM|27|ENG|68
Jonathan Varane|DM|23|FRA|68
Nicolas Madsen|MC|24|DEN|69
Ilias Chair|AMC|27|MAR|73|dribbler
Paul Smyth|AML|27|NIR|69
Koki Saito|AML|24|JPN|70
Karamoko Dembélé|AMR|22|FRA|70
Rumarn Burrell|ST|24|ENG|68
Richard Kone|ST|22|CIV|69
Michael Frey|ST|31|SUI|68
`),
    club('Swansea City', 'SWA', 55, 'Swansea.com Stadium', 21088, ['#FFFFFF', '#000000'], 10, `
Lawrence Vigouroux|GK|31|CHI|69
Ben Cabango|DC|25|WAL|71
Harry Darling|DC|25|SCO|70
Josh Key|DR|25|ENG|69
Josh Tymon|DL|25|ENG|70
Jay Fulton|MC|31|SCO|68
Gonçalo Franco|MC|24|POR|70
Marko Stamenić|MC|23|NZL|68
Ronald|AMR|23|BRA|71
Zeidane Inoussa|AML|23|FRA|68
Liam Cullen|ST|26|WAL|69
Žan Vipotnik|ST|23|SVN|70
Adam Idah|ST|24|IRL|72
`),
    club('Sheffield Wednesday', 'SHW', 52, 'Hillsborough', 39732, ['#003A70', '#FFFFFF'], 2, `
Pierce Charles|GK|20|NIR|69/76
Di'Shon Bernard|DC|24|JAM|68
Dominic Iorfa|DC|30|ENG|68
Yan Valery|DR|26|TUN|68
Max Lowe|DL|28|ENG|67
Liam Palmer|DR|33|SCO|66
Barry Bannan|MC|35|SCO|69|playmaker,leader
Svante Ingelsson|MC|27|SWE|68
Nathaniel Chalobah|DM|30|ENG|68
Olaf Kobacki|AML|24|POL|67
Jamal Lowe|ST|30|JAM|67
Bailey Cadamarteri|ST|19|JAM|67/75
`),
    club('Charlton Athletic', 'CHA', 50, 'The Valley', 27111, ['#D4021D', '#FFFFFF'], 8, `
Thomas Kaminski|GK|32|BEL|69
Lloyd Jones|DC|29|ENG|67
Macaulay Gillesphey|DC|29|ENG|67
Kayne Ramsay|DR|24|ENG|66
Greg Docherty|MC|28|SCO|68
Conor Coventry|DM|25|IRL|67
Karoy Anderson|MC|20|ENG|66/73
Sonny Carey|AMC|24|ENG|66
Luke Berry|MC|33|ENG|65
Tyreece Campbell|AML|21|ENG|67/73
Miles Leaburn|ST|21|ENG|67/74
Isaac Olaofe|ST|25|NGA|67
Charlie Kelman|ST|23|ENG|67
Matty Godden|ST|33|ENG|66
`),
    club('Wrexham', 'WRE', 52, 'Racecourse Ground', 12600, ['#E4002B', '#FFFFFF'], 30, `
Arthur Okonkwo|GK|23|ENG|68
Danny Ward|GK|32|WAL|67
Max Cleworth|DC|23|WAL|67
Callum Doyle|DC|21|ENG|70/76
Dominic Hyam|DC|29|SCO|70
Conor Coady|DC|32|ENG|69|leader
Issa Kaboré|DR|24|BFA|69
Liberato Cacace|DL|24|NZL|69
George Dobson|DM|27|ENG|68
Lewis O'Brien|MC|26|ENG|70
Matty James|MC|34|ENG|67
Oliver Rathbone|MC|28|WAL|68
Josh Windass|AMC|31|ENG|69
Elliot Lee|AMC|30|ENG|67
Ryan Longman|AMR|24|ENG|68
Nathan Broadhead|AML|27|WAL|70
Kieffer Moore|ST|32|WAL|70|aerial
Sam Smith|ST|27|ENG|68
Jay Rodriguez|ST|36|ENG|66
`),
    club('Birmingham City', 'BIR', 58, "St Andrew's", 29409, ['#0000FF', '#FFFFFF'], 35, `
Ryan Allsop|GK|32|ENG|68
Christoph Klarer|DC|25|AUT|70
Phil Neumann|DC|28|GER|68
Bright Osayi-Samuel|DR|27|NGA|70
Ethan Laird|DR|23|ENG|69
Alex Cochrane|DL|25|SCO|68
Kai Wagner|DL|28|GER|68
Krystian Bielik|DM|27|POL|70
Tomoki Iwata|MC|28|JPN|70
Paik Seung-ho|MC|28|KOR|69
Tommy Doyle|MC|23|ENG|70
Willum Þór Willumsson|MC|26|ISL|69
Demarai Gray|AML|29|ENG|71
Carlos Vicente|AMR|26|ESP|69
Keshi Anderson|AML|30|ENG|67
Jay Stansfield|ST|22|ENG|72/78
Kyogo Furuhashi|ST|30|JPN|71
Marvin Ducksch|ST|31|GER|70
Lyndon Dykes|ST|29|SCO|68
`),
  ],
};
