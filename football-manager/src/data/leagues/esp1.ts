import { club, type RawLeague } from '../types';

export const esp1: RawLeague = {
  id: 'esp1',
  name: 'La Liga',
  short: 'LAL',
  country: 'ESP',
  tier: 1,
  tv: 45,
  europe: 5,
  clubs: [
    club('Real Madrid', 'RMA', 97, 'Santiago Bernabéu', 83186, ['#FFFFFF', '#FEBE10'], 250, `
Thibaut Courtois|GK|33|BEL|89|shotstopper
Andriy Lunin|GK|26|UKR|78
Dani Carvajal|DR|33|ESP|83|leader
Trent Alexander-Arnold|DR|26|ENG|86|playmaker,crosser,set
Éder Militão|DC|27|BRA|84|pace
Antonio Rüdiger|DC|32|GER|84|hardman,strong
Dean Huijsen|DC|20|ESP|82/90|playmaker
Raúl Asencio|DC|22|ESP|78/83
David Alaba|DC/DL|33|AUT|78
Álvaro Carreras|DL|22|ESP|82/86
Ferland Mendy|DL|30|FRA|80
Fran García|DL|25|ESP|77
Aurélien Tchouaméni|DM|25|FRA|85|tackler
Federico Valverde|MC/AMR|26|URU|88|engine,sniper
Eduardo Camavinga|MC|22|FRA|84/88
Jude Bellingham|AMC/MC|22|ENG|89/93|leader,engine
Arda Güler|AMC|20|TUR|83/90|playmaker,set
Dani Ceballos|MC|28|ESP|78
Franco Mastantuono|AMR|17|ARG|76/90|flair
Brahim Díaz|AMR/AMC|25|MAR|80|dribbler
Rodrygo|AMR/AML|24|BRA|84
Vinícius Júnior|AML|24|BRA|90|pace,dribbler,flair
Kylian Mbappé|ST/AML|26|FRA|91|pace,finisher
Endrick|ST|19|BRA|77/90|strong
Gonzalo García|ST|21|ESP|74/82
`),
    club('Barcelona', 'BAR', 96, 'Spotify Camp Nou', 62000, ['#A50044', '#004D98'], 60, `
Joan García|GK|24|ESP|82/86|shotstopper
Marc-André ter Stegen|GK|33|GER|85|sweeper
Wojciech Szczęsny|GK|35|POL|80
Jules Koundé|DR/DC|26|FRA|85|pace
Pau Cubarsí|DC|18|ESP|82/91|playmaker
Ronald Araújo|DC|26|URU|82|strong,pace
Andreas Christensen|DC|29|DEN|79
Eric García|DC/DM|24|ESP|79
Alejandro Balde|DL|21|ESP|82/86|pace
Gerard Martín|DL|23|ESP|75
Pedri|MC|22|ESP|89/91|playmaker,dribbler
Frenkie de Jong|MC/DM|28|NED|86|playmaker
Gavi|MC|20|ESP|82/88|engine,hardman
Marc Casadó|DM|21|ESP|78/83
Marc Bernal|DM|18|ESP|72/85
Fermín López|AMC|22|ESP|81/85
Dani Olmo|AMC|27|ESP|84|sniper
Lamine Yamal|AMR|17|ESP|90/96|dribbler,flair,playmaker
Raphinha|AML|28|BRA|88|sniper,set
Marcus Rashford|AML|27|ENG|80|pace
Roony Bardghji|AMR|19|SWE|72/82
Ferran Torres|ST/AML|25|ESP|79
Robert Lewandowski|ST|36|POL|85|finisher
`),
    club('Atlético Madrid', 'ATM', 90, 'Riyadh Air Metropolitano', 70460, ['#CB3524', '#FFFFFF'], 80, `
Jan Oblak|GK|32|SVN|86|shotstopper
Juan Musso|GK|31|ARG|76
José María Giménez|DC|30|URU|81|hardman
Robin Le Normand|DC|28|ESP|81
Clément Lenglet|DC|30|FRA|77
David Hancko|DC/DL|27|SVK|81
Marc Pubill|DR/DC|22|ESP|76/81
Nahuel Molina|DR|27|ARG|79
Matteo Ruggeri|DL|22|ITA|77/81
Javi Galán|DL|30|ESP|75
Marcos Llorente|DR/MC|30|ESP|81|engine,pace
Koke|MC|33|ESP|80|leader
Pablo Barrios|MC|22|ESP|81/86
Johnny Cardoso|DM|23|USA|78/82
Conor Gallagher|MC|25|ENG|81|engine
Àlex Baena|AML/AMC|23|ESP|83/86|playmaker,set
Thiago Almada|AMC|24|ARG|80
Giuliano Simeone|AMR|22|ARG|78/82
Nico González|AML/AMR|27|ARG|79
Antoine Griezmann|ST/AMC|34|FRA|84|playmaker
Julián Álvarez|ST|25|ARG|87|finisher,engine
Alexander Sørloth|ST|29|NOR|81|aerial
Giacomo Raspadori|ST|25|ITA|78
`),
    club('Athletic Club', 'ATH', 82, 'San Mamés', 53289, ['#EE2523', '#FFFFFF'], 50, `
Unai Simón|GK|28|ESP|84
Álex Padilla|GK|21|MEX|70/77
Dani Vivian|DC|25|ESP|81
Aitor Paredes|DC|25|ESP|78
Aymeric Laporte|DC|31|ESP|79
Yeray Álvarez|DC|30|ESP|76
Andoni Gorosabel|DR|28|ESP|76
Jesús Areso|DR|26|ESP|76
Óscar de Marcos|DR|36|ESP|73|leader
Yuri Berchiche|DL|35|ESP|75
Adama Boiro|DL|23|ESP|73
Mikel Jauregizar|MC|21|ESP|77/84
Beñat Prados|MC|24|ESP|76
Mikel Vesga|DM|32|ESP|74
Iñigo Ruiz de Galarreta|MC|31|ESP|77
Oihan Sancet|AMC|25|ESP|81|aerial
Unai Gómez|AMC|22|ESP|73
Álex Berenguer|AML/AMR|30|ESP|76
Robert Navarro|AMR|23|ESP|74
Nico Williams|AML|23|ESP|85|pace,dribbler
Iñaki Williams|AMR/ST|31|GHA|79|pace
Gorka Guruzeta|ST|28|ESP|77
Maroan Sannadi|ST|24|MAR|72
`),
    club('Villarreal', 'VIL', 81, 'Estadio de la Cerámica', 23500, ['#FFE667', '#005187'], 40, `
Luiz Júnior|GK|24|BRA|77
Diego Conde|GK|27|ESP|75
Arnau Tenas|GK|24|ESP|72
Juan Foyth|DC/DR|27|ARG|79
Logan Costa|DC|24|CPV|78
Renato Veiga|DC|21|POR|77/82
Rafa Marín|DC|23|ESP|77
Willy Kambwala|DC|20|FRA|72/79
Santiago Mouriño|DC/DR|23|URU|74
Sergi Cardona|DL|26|ESP|76
Alfonso Pedraza|DL|29|ESP|77
Kiko Femenía|DR|34|ESP|71
Dani Parejo|MC|36|ESP|77|playmaker,set
Santi Comesaña|MC|28|ESP|77
Pape Gueye|DM|26|SEN|76
Thomas Partey|DM|32|GHA|80
Alberto Moleiro|AML/AMC|21|ESP|79/85|dribbler
Tajon Buchanan|AMR|26|CAN|75
Nicolas Pépé|AMR|30|CIV|77
Ilias Akhomach|AMR|21|MAR|74/80
Ayoze Pérez|ST/AML|31|ESP|79
Gerard Moreno|ST|33|ESP|79|finisher
Georges Mikautadze|ST|24|GEO|78
Tani Oluwaseyi|ST|25|CAN|72
`),
    club('Real Betis', 'BET', 80, 'Estadio La Cartuja', 57619, ['#00954C', '#FFFFFF'], 35, `
Álvaro Vallés|GK|28|ESP|77
Pau López|GK|30|ESP|76
Adrián|GK|38|ESP|67
Héctor Bellerín|DR|30|ESP|76
Aitor Ruibal|DR/AMR|29|ESP|74
Diego Llorente|DC|31|ESP|77
Marc Bartra|DC|34|ESP|74
Natan|DC|24|BRA|77
Valentín Gómez|DC|21|ARG|74/80
Junior Firpo|DL|28|DOM|75
Ricardo Rodríguez|DL|32|SUI|75
Sofyan Amrabat|DM|28|MAR|78|tackler
Marc Roca|DM|28|ESP|77
Sergi Altimira|MC|24|ESP|74
Nelson Deossa|MC|25|COL|75
Pablo Fornals|AMC|29|ESP|79
Isco|AMC|33|ESP|80|playmaker,flair
Giovani Lo Celso|AMC|29|ARG|79
Antony|AMR|25|BRA|79|dribbler
Abde Ezzalzouli|AML|23|MAR|78|dribbler
Rodrigo Riquelme|AML|25|ESP|76
Cucho Hernández|ST|26|COL|78
Chimy Ávila|ST|31|ARG|74
Cédric Bakambu|ST|34|COD|73
`),
    club('Real Sociedad', 'RSO', 80, 'Reale Arena', 39500, ['#0067B1', '#FFFFFF'], 40, `
Álex Remiro|GK|30|ESP|83
Unai Marrero|GK|23|ESP|70
Igor Zubeldia|DC|28|ESP|79
Jon Martín|DC|19|ESP|72/82
Duje Ćaleta-Car|DC|28|CRO|75
Jon Pacheco|DC|24|ESP|74
Aritz Elustondo|DC/DR|31|ESP|73
Jon Aramburu|DR|22|VEN|75
Álvaro Odriozola|DR|29|ESP|73
Aihen Muñoz|DL|27|ESP|73
Sergio Gómez|DL|24|ESP|75
Jon Gorrotxategi|DM|21|ESP|73/79
Beñat Turrientes|MC|23|ESP|74
Pablo Marín|MC|21|ESP|73/79
Carlos Soler|MC|28|ESP|78
Luka Sučić|MC/AMC|22|CRO|77/82
Brais Méndez|MC/AMR|28|ESP|79
Arsen Zakharyan|AMC|22|RUS|75
Takefusa Kubo|AMR|24|JPN|82|dribbler
Ander Barrenetxea|AML|23|ESP|78
Gonçalo Guedes|AML|28|POR|75
Mikel Oyarzabal|ST/AML|28|ESP|83|finisher,leader
Orri Óskarsson|ST|21|ISL|74/80
`),
    club('Valencia', 'VAL', 76, 'Mestalla', 49430, ['#FFFFFF', '#000000'], 10, `
Julen Agirrezabala|GK|24|ESP|76
Stole Dimitrievski|GK|31|MKD|76
Mouctar Diakhaby|DC|28|FRA|76
César Tárrega|DC|23|ESP|75
José Copete|DC|26|ESP|73
Eray Cömert|DC|27|SUI|72
Dimitri Foulquier|DR|32|FRA|72
Thierry Correia|DR|26|POR|73
José Gayà|DL|30|ESP|78|leader
Jesús Vázquez|DL|22|ESP|73
Pepelu|DM|27|ESP|76
Javi Guerra|MC|22|ESP|77/82
Baptiste Santamaria|DM|30|FRA|74
Filip Ugrinić|MC|26|SUI|74
André Almeida|AMC|25|POR|76
Luis Rioja|AML|31|ESP|76
Diego López|AMR|23|ESP|76
Arnaut Danjuma|AML|28|NED|75
Largie Ramazani|AML|24|BEL|73
Hugo Duro|ST|25|ESP|76
Lucas Beltrán|ST|24|ARG|75
Dani Raba|ST|29|ESP|73
Umar Sadiq|ST|28|NGA|73
`),
    club('Celta Vigo', 'CEL', 74, 'Abanca-Balaídos', 24791, ['#8AC3EE', '#FFFFFF'], 20, `
Iván Villar|GK|28|ESP|74
Ionuț Radu|GK|28|ROU|75
Carl Starfelt|DC|30|SWE|76
Joseph Aidoo|DC|29|GHA|73
Carlos Domínguez|DC|24|ESP|73
Marcos Alonso|DC/DL|34|ESP|74
Óscar Mingueza|DR|26|ESP|77
Javi Rueda|DR|27|ESP|72
Sergio Carreira|DR|24|ESP|72
Manu Fernández|DL|24|ESP|70
Ilaix Moriba|MC|22|GUI|76
Fran Beltrán|MC|26|ESP|75
Hugo Sotelo|DM|21|ESP|72/78
Damián Rodríguez|MC|22|ESP|71
Miguel Román|MC|22|ESP|71
Williot Swedberg|AMC|21|SWE|73
Bryan Zaragoza|AML|24|ESP|76|dribbler
Hugo Álvarez|AML|22|ESP|74
Franco Cervi|AML|31|ARG|72
Iago Aspas|ST/AMC|37|ESP|79|finisher,set
Borja Iglesias|ST|32|ESP|77
Ferran Jutglà|ST|26|ESP|75
Pablo Durán|ST|24|ESP|73
`),
    club('Rayo Vallecano', 'RAY', 71, 'Estadio de Vallecas', 14708, ['#FFFFFF', '#E53027'], 15, `
Augusto Batalla|GK|29|ARG|77
Dani Cárdenas|GK|28|ESP|72
Florian Lejeune|DC|34|FRA|76|aerial
Luiz Felipe|DC|28|ITA|75
Nobel Mendy|DC|20|FRA|72/78
Pep Chavarría|DL|27|ESP|75
Andrei Rațiu|DR|27|ROU|77
Iván Balliu|DR|33|ALB|72
Óscar Valentín|DM|31|ESP|76|tackler
Unai López|MC|29|ESP|76
Pathé Ciss|DM|31|SEN|75
Pedro Díaz|MC|26|ESP|73
Gerard Gumbau|MC|30|ESP|72
Óscar Trejo|AMC|37|ARG|72
Isi Palazón|AMR|30|ESP|77|dribbler
Jorge de Frutos|AML|28|ESP|77|pace
Álvaro García|AML|32|ESP|74
Randy Nteka|ST|27|FRA|73
Sergio Camello|ST|24|ESP|74
Alemão|ST|26|BRA|73
`),
    club('Osasuna', 'OSA', 70, 'El Sadar', 23576, ['#D91A21', '#0A346F'], 15, `
Sergio Herrera|GK|31|ESP|77
Aitor Fernández|GK|34|ESP|72
Alejandro Catena|DC|30|ESP|77
Enzo Boyomo|DC|23|CMR|75
Jorge Herrando|DC|24|ESP|72
Juan Cruz|DL/DC|32|ESP|72
Abel Bretones|DL|24|ESP|73
Valentin Rosier|DR|29|FRA|72
Íñigo Argibide|DR|19|ESP|68/76
Lucas Torró|DM|31|ESP|76
Jon Moncayola|MC|27|ESP|75
Iker Muñoz|MC|22|ESP|73
Aimar Oroz|AMC|23|ESP|76
Moi Gómez|AML|31|ESP|75
Rubén García|AML|31|ESP|75
Kike Barja|AMR|28|ESP|72
Víctor Muñoz|AML|21|ESP|73/79
Ante Budimir|ST|33|CRO|78|aerial,finisher
Raúl García|ST|24|ESP|73
`),
    club('Mallorca', 'MLL', 70, 'Estadi Mallorca Son Moix', 23142, ['#E20613', '#000000'], 15, `
Leo Román|GK|25|ESP|75
Lucas Bergström|GK|22|FIN|70
Martin Valjent|DC|29|SVK|77
Antonio Raíllo|DC|33|ESP|76|leader
Marash Kumbulla|DC|25|ALB|73
Johan Mojica|DL|32|COL|74
Toni Lato|DL|28|ESP|72
Pablo Maffeo|DR|27|ARG|76|hardman
Mateu Morey|DR|25|ESP|71
Omar Mascarell|DM|32|ESP|74
Samú Costa|DM/MC|24|POR|76
Sergi Darder|MC|31|ESP|77|playmaker
Manu Morlanes|MC|26|ESP|74
Antonio Sánchez|MC|28|ESP|73
Pablo Torre|AMC|22|ESP|74
Dani Rodríguez|AMR|37|ESP|72
Jan Virgili|AML|19|ESP|70/79
Takuma Asano|AMR|30|JPN|73
Vedat Muriqi|ST|31|KVX|77|aerial
Abdón Prats|ST|32|ESP|71
Mateo Joseph|ST|21|ESP|72/78
`),
    club('Getafe', 'GET', 68, 'Coliseum', 16500, ['#005999', '#FFFFFF'], 10, `
David Soria|GK|32|ESP|78
Jiří Letáček|GK|25|CZE|70
Djené|DC|33|TOG|77|hardman
Domingos Duarte|DC|30|POR|75
Abdel Abqar|DC|26|MAR|74
Juan Iglesias|DR|26|ESP|73
Allan Nyom|DR|37|CMR|69
Diego Rico|DL|32|ESP|73
Mauro Arambarri|MC|29|URU|78|engine
Luis Milla|MC|30|ESP|77|set
Mario Martín|MC|21|ESP|73/79
Carles Aleñá|MC|27|ESP|74
Javi Muñoz|MC|30|ESP|72
Adrián Liso|AMR|20|ESP|72/79
Álex Sancris|AML|22|ESP|70
Abu Kamara|AMR|22|ENG|70
Juanmi|AML|32|ESP|73
Borja Mayoral|ST|28|ESP|76
Juanmi Latasa|ST|24|ESP|72
`),
    club('Espanyol', 'ESP', 70, 'RCDE Stadium', 40000, ['#007FC8', '#FFFFFF'], 10, `
Marko Dmitrović|GK|33|SRB|77
Ángel Fortuño|GK|24|ESP|66
Leandro Cabrera|DC|34|URU|75
Fernando Calero|DC|30|ESP|73
Clemens Riedel|DC|21|GER|71/78
Omar El Hilali|DR|21|MAR|74/80
Rubén Sánchez|DR|24|ESP|70
Carlos Romero|DL|23|ESP|75
Pol Lozano|DM|25|ESP|74
Urko González|DM|24|ESP|73
Charles Pickel|DM|28|SUI|72
Edu Expósito|MC|29|ESP|77|set
Ramón Terrats|MC|24|ESP|73
Tyrhys Dolan|AMR|23|ENG|73
Jofre Carreras|AMR|24|ESP|73
Antoniu Roca|AML|23|ESP|70
Pere Milla|AML/ST|32|ESP|74
Javi Puado|ST/AML|27|ESP|77
Roberto Fernández|ST|23|ESP|73
Kike García|ST|35|ESP|72
`),
    club('Alavés', 'ALA', 67, 'Mendizorrotza', 19840, ['#0761AF', '#FFFFFF'], 10, `
Antonio Sivera|GK|28|ESP|77
Raúl Fernández|GK|37|ESP|68
Facundo Garcés|DC|25|ARG|72
Nahuel Tenaglia|DC/DR|29|ARG|73
Moussa Diarra|DC|24|MLI|71
Víctor Parada|DC|23|ESP|70
Jonny Otto|DR|31|ESP|72
Manu Sánchez|DL|24|ESP|72
Youssef Enríquez|DL|19|ESP|68/75
Antonio Blanco|DM|24|ESP|76
Carlos Protesoni|DM|27|URU|72
Carlos Benavídez|MC|27|URU|74
Jon Guridi|MC|30|ESP|74
Ander Guevara|MC|27|ESP|73
Pablo Ibáñez|MC|26|ESP|72
Denis Suárez|AMC|31|ESP|74
Calebe|AMC|25|BRA|71
Abde Rebbach|AML|27|ALG|72
Lucas Boyé|ST|29|ARG|75
Toni Martínez|ST|27|ESP|74
Mariano Díaz|ST|31|DOM|71
`),
    club('Girona', 'GIR', 74, 'Estadi Montilivi', 14624, ['#CD2534', '#FFFFFF'], 20, `
Paulo Gazzaniga|GK|33|ARG|77
Dominik Livaković|GK|30|CRO|79
Daley Blind|DC/DL|35|NED|76|playmaker
David López|DC|35|ESP|74
Alejandro Francés|DC|23|ESP|73
Vitor Reis|DC|19|BRA|72/84
Arnau Martínez|DR/DC|22|ESP|77/81
Hugo Rincón|DR|22|ESP|71
Álex Moreno|DL|32|ESP|74
Axel Witsel|DM/DC|36|BEL|74
Jhon Solís|DM|21|COL|72/78
Yangel Herrera|MC|27|VEN|77
Iván Martín|MC|26|ESP|77|playmaker
Azzedine Ounahi|MC|25|MAR|76
Donny van de Beek|MC|28|NED|74
Thomas Lemar|AMC|29|FRA|75
Viktor Tsygankov|AMR|27|UKR|78|sniper
Bryan Gil|AML|24|ESP|74
Joel Roca|AML|20|ESP|71/78
Cristhian Stuani|ST|38|URU|72
Abel Ruiz|ST|25|ESP|74
Vladyslav Vanat|ST|23|UKR|76
`),
    club('Sevilla', 'SEV', 75, 'Ramón Sánchez-Pizjuán', 43883, ['#FFFFFF', '#D40E1A'], 5, `
Ørjan Nyland|GK|34|NOR|75
Odysseas Vlachodimos|GK|31|GRE|75
Tanguy Nianzou|DC|23|FRA|74
Kike Salas|DC|23|ESP|74
Marcão|DC|29|BRA|74
Andrés Castrín|DC|20|ESP|69/76
José Ángel Carmona|DR|23|ESP|75
Juanlu Sánchez|DR|22|ESP|76
Gabriel Suazo|DL|27|CHI|74
Nemanja Gudelj|DM/DC|33|SRB|75
Lucien Agoumé|DM|23|FRA|76
Batista Mendy|DM|25|FRA|74
Djibril Sow|MC|28|SUI|76
Joan Jordán|MC|31|ESP|74
Peque Fernández|AMC|23|ESP|72
Rubén Vargas|AML|26|SUI|77
Chidera Ejuke|AML|27|NGA|76|dribbler
Adnan Januzaj|AMR|30|BEL|72
Alfon González|AML|26|ESP|73
Alexis Sánchez|ST/AMC|36|CHI|74
Isaac Romero|ST|25|ESP|73
Akor Adams|ST|25|NGA|74
`),
    club('Levante', 'LEV', 64, 'Ciutat de València', 26354, ['#004F9F', '#B4053F'], 5, `
Mathew Ryan|GK|33|AUS|74
Pablo Cuñat|GK|23|ESP|68
Unai Elgezabal|DC|32|ESP|71
Adrián de la Fuente|DC|26|ESP|71
Matías Moreno|DC|22|ARG|72
Jeremy Toljan|DR|30|GER|72
Diego Pampín|DL|25|ESP|70
Oriol Rey|DM|27|ESP|72
Kervin Arriaga|DM|27|HON|72
Unai Vencedor|MC|24|ESP|72
Pablo Martínez|MC|27|ESP|72
Jon Olasagasti|MC|25|ESP|70
Carlos Álvarez|AMC|22|ESP|74/80
Roger Brugué|AMR|28|ESP|71
Víctor García|AML|28|ESP|70
Karl Etta Eyong|ST|21|CMR|73/80
Iván Romero|ST|24|ESP|72
Goduine Koyalipou|ST|25|CTA|71
José Luis Morales|ST|38|ESP|69
`),
    club('Elche', 'ELC', 63, 'Martínez Valero', 31388, ['#FFFFFF', '#05642C'], 5, `
Matías Dituro|GK|38|ARG|72
Iñaki Peña|GK|26|ESP|74
David Affengruber|DC|24|AUT|72
Pedro Bigas|DC|35|ESP|70
Víctor Chust|DC|25|ESP|72
John Donald|DC|24|ESP|70
Álvaro Núñez|DR|24|ESP|71
Héctor Fort|DR|18|ESP|71/81
Adrià Pedrosa|DL|27|ESP|72
Aleix Febas|MC|29|ESP|74
Marc Aguado|DM|25|ESP|72
Martim Neto|MC|22|POR|71
Rodrigo Mendoza|MC|20|ESP|71/78
Germán Valera|AMR|23|ESP|73
Yago Santiago|AML|21|ESP|70
Grady Diangana|AML|27|ENG|72
Tete Morente|AMR|29|ESP|72
André Silva|ST|29|POR|75
Rafa Mir|ST|28|ESP|73
Álvaro Rodríguez|ST|21|URU|72/78
`),
    club('Real Oviedo', 'OVI', 62, 'Carlos Tartiere', 30500, ['#0047AB', '#FFFFFF'], 5, `
Aarón Escandell|GK|29|ESP|72
Horațiu Moldovan|GK|27|ROU|72
David Carmo|DC|26|POR|73
Dani Calvo|DC|31|ESP|70
Eric Bailly|DC|31|CIV|71
David Costas|DC|30|ESP|70
Nacho Vidal|DR|30|ESP|71
Rahim Alhassane|DL|22|NIG|70
Santiago Colombatto|DM|28|ARG|74
Leander Dendoncker|DM|30|BEL|73
Kwasi Sibo|DM|27|GHA|71
Alberto Reina|MC|27|ESP|72
Ovie Ejaria|MC|27|ENG|71
Luka Ilić|AMC|25|SRB|72
Santi Cazorla|AMC|40|ESP|72|playmaker,set
Ilyas Chaira|AML|23|MAR|72
Haissem Hassan|AMR|23|FRA|72
Salomón Rondón|ST|35|VEN|73|strong
Federico Viñas|ST|26|URU|72
Álex Forés|ST|24|ESP|70
`),
  ],
};
