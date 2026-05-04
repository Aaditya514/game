import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;



// 🎩 RICH PATH (11 questions)
const RICH_SCENARIOS = [
  {
    id: 1,
    title: "Birth & Early Life (1975, Age 0–5)",
    image: "/images/arjun1.jpeg",
    bg: "from-amber-900 to-orange-950",
    text: "You are born into the Malhotra family in a large flat in Pedder Road, Bombay. Your father, Ramesh Malhotra, owns a textile mill in Parel employing over 600 workers. The Bonded Labour System (Abolition) Act has just been passed this year — but in your household, this is irrelevant news. Your mother is arranging your naamkaran ceremony, inviting the Deputy Collector and three MLAs.The Indian Constitution promised equality to all citizens in 1950. Twenty-five years later, some citizens are still more equal than others",
    choices: [
      { text: "Your father registers you at Cathedral & John Connon School at birth, paying the voluntary donation of ₹25,000 — three years before you will even attend", popup: "Early doors open for those who can knock with money." },
      { text: "Your mother, a doctor, begins hiring private tutors from age three. You learn English before Hindi.", popup: "The head start is invisible — but it compounds over time." },
      { text: "Your grandfather gifts your father a plot of land in Juhu as a birth gift. You grow up between two homes.", popup: "Wealth begets wealth — the first principle of capital." }
    ]
  },

  {
    id: 2,
    title: "Schooling & The First Lesson (1985, Age 10)",
    image: "/images/arjun2.jpeg",
    bg: "from-blue-950 to-slate-900",
    text: `You are now at school. History class discusses the Emergency of 1975–77. Your father once told you: "Indira knew how to handle people." Last month, 600 workers at your father's mill went on strike demanding minimum wages. Under the Industrial Disputes Act, the government can refer the dispute to adjudication — but only if it chooses to. Your father made a phone call. The reference has been pending for eleven months.
      ◆ Jurisprudence Note: The power to refer a dispute under the Industrial Disputes Act is plenary — the government is the sole arbiter of whether a dispute even "exists." There is no time limit. Cases have been referred after 20 years.`,
    choices: [
      { text: `You ask your father about the strike at dinner. He says: "Beta, we pay them enough. The law will sort it out. It always does`, popup: "When the law is your ally, waiting costs you nothing." },
      { text: `You overhear your father on the phone: "Just delay the reference, Sahab. By then half of them will have gone back to their villages.`, popup: "The law's delay is not a flaw — for some, it is the feature." },
      { text: `Your father takes you to meet his lawyer, Mr. Vaidya, who explains the company can reclassify strikers as "absconding" — a misconduct under the Act.`, popup: `Legal categories can be weaponised. "Misconduct" is flexible.` }
    ]
  },

  {
    id: 3,
    title: "Higher Education (1993, Age 18)",
    image: "/images/arjun3.jpg",
    bg: "from-indigo-950 to-violet-950",
    text: `You are applying to college. Your 12th board results were decent — not exceptional. But a large "donation" to the management quota ensures your admission to Sydenham College of Commerce. Meanwhile, your father's factory has just received an exemption from new environmental regulations under the Water Act — the District Collector, a family friend, signed the exemption on a Saturday.
  Baxi called this "negotiated deregulation" — the appearance of regulation, the reality of accommodation.`,
    choices: [
      { text: "You study Commerce, knowing the degree is more about the network than the knowledge. Your batchmates are other mill owners' sons.", popup: " Social capital is reproduced in classrooms too." },
      { text: `You study Law at GLC — not to become a lawyer, but to understand, as your father says, "how to read a contract and how to break one legally."`, popup: "Law as instrument. The powerful study it to use it." },
      { text: "You study Economics because your father says understanding macro-policy will help you navigate government licensing better.", popup: "Even education is shaped by the needs of capital." }
    ]
  },

  {
    id: 4,
    title: "Running the Business (2000, Age 25)",
    image: "/images/arjun4.jpg",
    bg: "from-stone-900 to-zinc-900",
    text: `You are now managing operations at Malhotra Textiles. You have 400 workers. You are paying ₹60 below the statutory minimum wage — a violation of the Minimum Wages Act, 1948. Three workers have filed a complaint with the labour inspector. He visited once, accepted hospitality, and filed a report noting "wages are under review."
  A Supreme Court judgment recently held that paying below minimum wage amounts to "forced labour" under Article 23 of the Constitution. But Article 23 has been on the books since 1950. The Bonded Labour Act came 25 years later. Implementation is another story.`,
    choices: [
      { text: `You reclassify your permanent workers as "contract workers" through a third-party contractor — they lose all statutory protections overnight.`, popup: "The law creates categories. Capital exploits the gaps between them." },
      { text: "You pay a small fine to the labour department and continue underpaying — the fine is cheaper than compliance.", popup: "When penalties are lower than profits, law becomes a business expense." },
      { text: "You hire a top labour lawyer to delay all three complaints in adjudication — the cases will take 7–10 years to be heard.", popup: "The slowness of justice is not neutral — it favours those who can wait." }
    ]
  },

  {
    id: 5,
    title: "Crisis & Consequence (2008, Age 33)",
    image: "/images/arjun5.jpg",
    bg: "from-red-950 to-rose-950",
    text: `A worker named Suresh Kamble died last Tuesday when a machine without a safety guard severed his right arm. He bled on the factory floor for 40 minutes. The safety guard had been removed three months ago to increase output speed — a violation of the Factories Act. Management offered his widow ₹40,000 in an out-of-court settlement — she signed, not knowing she could claim far more.
  Baxi noted that factory inspections in India had broken down as early as 1905.`,
    choices: [
      { text: `Your PR firm issues a press release about your new "Worker Welfare Initiative" — a water cooler and a first aid kit on every floor.`, popup: "The appearance of responsibility is cheaper than responsibility." },
      { text: "You use political connections to ensure the factory inspector is transferred before he can file a proper report.", popup: "The privatisation of state resources — Baxi's fifth theme — operates quietly." },
      { text: "You donate ₹5 lakh to the ruling party's election fund. The following year, your factory passes all inspections.", popup: "Corruption is not a deviation from the system. Baxi argues it IS the system." }
    ]
  },

  {
    id: 6,
    title: "The Emergency Years (1976, Age 1 — Father's Story)",
    image: "/images/arjun6.jpg",
    bg: "from-green-950 to-emerald-950",
    text: `You are too young to remember, but your father tells you this story every Diwali like a legend. During the Emergency of 1975–77, all trade union activity was suspended. Strikes were illegal. The workers at Malhotra Textiles who had been agitating for a wage revision since 1973 were suddenly, legally, silent. Production at the mill rose 34% in eighteen months. Your father bought the Juhu plot during this period. He donated generously to the Congress party.The Supreme Court, in the infamous habeas corpus case of 1976, held that during a validly imposed Emergency, the state may extinguish the right to life itself.
         ◆ Baxi: "The Emergency regime is notable only for the elevation of the norms of the unwritten constitution in the realm of the written Constitution."`,
    choices: [
      { text: `Your father never speaks badly of the Emergency in public. "It was tough, but it was efficient," he says. His lawyer agrees.`, popup: "Those who benefited from authoritarianism rarely called it authoritarianism." },
      { text: `One of your father's mill managers was detained under MISA for "anti-national activities." He had spoken to a journalist. Your father did not intervene`, popup: "The same law that protects capital crushes inconvenient voices — and capital stays silent." },
      { text: "Your father quietly acquires a competitor's mill whose owner was jailed during the Emergency. He pays half the market price. The transaction is legally clean.", popup: `"Primitive accumulation" does not always look like violence. Sometimes it looks like a sale deed.` }
    ]
  },

  {
    id: 7,
    title: "The Bombay Mill Strike (1982, Age 7)",
    image: "/images/arjun7.jpg",
    bg: "from-yellow-950 to-amber-950",
    text: `The Great Bombay Textile Mill Strike has begun. 250,000 workers across 56 mills have walked out under Datta Samant. It will become the longest industrial strike in history — lasting nearly two years. The Maharashtra government has not made a reference. Your father meets the Industries Minister at the Willingdon Club.
  Baxi: "The plenitude of reference power is such that a political regime may often initiate reorganization of effective trade union power and leaderships by withholding or declining a reference."`,
    choices: [
      { text: ` Your father keeps the mill technically "running" with replacement workers brought from Uttar Pradesh — housed in the mill compound, paid cash, no records.`, popup: "Migrant contract labour was the mill owners' silent weapon. The Migrant Labour Act existed. It was not enforced." },
      { text: `Your father joins the Mill Owners' Association in lobbying the state government to never make the reference — the Association argues the strike is "not an industrial dispute but a political conspiracy."`, popup: `The definition of what constitutes a "dispute" is itself a site of power.` },
      { text: `After 18 months, your father converts half the mill into a commercial real estate project — the "mill lands" of Central Bombay. Workers lose livelihoods. Your family's net worth doubles.`, popup: "When workers lose a strike that lasts two years, they do not just lose wages. They lose the ground beneath the factory." }
    ]
  },

  {
    id: 8,
    title: "Caste, Merit & The IIT Reservation Debate (1990, Age 15)",
    image: "/images/arjun8.jpg",
    bg: "from-purple-950 to-fuchsia-950",
    text: `The Mandal Commission Report is being implemented. 27% reservation for OBCs in central government jobs and educational institutions has been announced. At your school, the debate is fierce. Your classmates — all upper caste — say reservations are "unconstitutional, anti-merit, vote-bank politics." There are violent anti-Mandal protests in Delhi.
  The Constitution's framers — particularly Ambedkar — understood that formal legal equality applied to those already structurally unequal produces not justice but the perpetuation of hierarchy.`,
    choices: [
      { text: "You write a school essay arguing reservations undermine merit. Your teacher gives you top marks. You do not know that Raju Prasad's son in Bihar has never had a functioning school.", popup: ` "Merit" is the name we give to the advantages we were born with.` },
      { text: "You attend a protest against Mandal with your friends. It feels like civic participation. It feels righteous.", popup: `The children of privilege rarely recognize their protest as a defence of privilege.` },
      { text: "You say nothing — you are already confirmed at Sydenham via management quota. Mandal is, for you, an abstraction.", popup: "Privilege is most powerful when it is invisible — even to those who hold it." }
    ]
  },

  {
    id: 9,
    title: "The Bhopal Moment (1984, Age 9 — Father's Story Again)",
    image: "/images/arjun9.jpg",
    bg: "from-cyan-950 to-blue-950",
    text: `On December 3rd, 1984, methyl isocyanate gas leaked from the Union Carbide plant in Bhopal. At least 15,000 people died. Half a million were exposed. You hear your parents talking about it at breakfast. Your father says: "Terrible tragedy. But you can't stop industrial progress because of accidents."
            The Indian government accepted $470 million from Union Carbide in settlement in 1989. Survivors received an average of ₹25,000 each — less than the cost of a business class flight from Bombay to New York.
            Baxi: "State patronage of hazardous chemicalization of agriculture — witness the noxious continuity between the Green Revolution and the Bhopal catastrophe."`,
    choices: [
      { text: "Your father's company quietly drops plans to build a chemical storage unit near a workers' colony after Bhopal — not out of conscience, but because insurance premiums tripled.", popup: "Capital responds to economic signals. Human life is priced accordingly." },
      { text: `Your father uses Bhopal to argue against "excessive environmental regulation" at a CII meeting — "See what happens when you invite foreign capital with too many restrictions? They cut corners."`, popup: "The lesson drawn from catastrophe reveals whose interests shape the narrative." },
      { text: "Your father donates ₹1 lakh to the Prime Minister's Relief Fund for Bhopal victims. The donation is publicised. The pesticide supplier contract continues unchanged.", popup: "Corporate philanthropy and corporate harm can coexist — law makes this possible." }
    ]
  },

  {
    id: 10,
    title: "The PIL Era & Judicial Activism (1995, Age 20)",
    image: "/images/arjun10.jpg",
    bg: "from-teal-950 to-slate-900",
    text: `You are at GLC, studying law. Your Constitutional Law professor speaks reverently about Public Interest Litigation — how the Supreme Court under Justice Bhagwati opened the court's doors to the poor, the bonded labourer, the undertrial prisoner.
              But a visiting lecturer — a labour lawyer from Nagpur — says something different: "PIL gave rights atomistically. It vindicated individual workers while the collective trade union movement was being dismantled. Each victory for one worker was a loss for the class."
              Baxi: "Slow-motion adjudication vindicates a right here and there but in the process strengthens the tendencies towards 'labour aristocracy', weakens the autonomous working class movements."`,
    choices: [
      { text: "You graduate and join your father's company's legal team — using your PIL knowledge to craft legal delays rather than advance them.", popup: "Legal education is socially neutral. Its deployment is not." },
      { text: "You join a top corporate law firm in Nariman Point. Your first client is a textile conglomerate fighting a workers' compensation claim.", popup: "The best legal minds are distributed across the class divide — unequally." },
      { text: "You briefly consider a career in labour law. Your father takes you to dinner at the Taj and explains the economics of your future carefully. You reconsider.", popup: "Class does not always compel through force. Sometimes it works through love and reason." }
    ]
  },

  {
    id: 11,
    title: "Tax, Evasion & The Parallel Economy (2005, Age 30)",
    image: "/images/arjun11.jpg",
    bg: "from-violet-950 to-indigo-950",
    text: `Malhotra Textiles has a second set of accounts. This is not unusual — it is, in Baxi's words, part of the "parallel economy." Your accountant estimates ₹2.3 crore in undisclosed income routed through a shell company in Mauritius.
            Your lawyer explains: "Tax planning and tax evasion are separated only by the thickness of a good opinion letter."
            Baxi: "Nor have the practices of accounting and tax planning and evasion which contribute extensively to the creation of a parallel economy been significantly combated by acts of planning."`,
    choices: [
      { text: `You fly to Mauritius to meet your Chartered Accountant. The "investment" is structured as a foreign direct investment returning to India — perfectly legal on paper.`, popup: "The law's categories can be arranged to make exploitation disappear into compliance." },
      { text: "You donate to an electoral trust — a legal mechanism allowing corporate political donations without disclosure. Three months later, a government contract comes through.", popup: "Corruption in high places has developed its own legal vocabulary." },
      { text: `Your father warns you: "Son, never be greedy enough to get caught. The law does not punish greed. It punishes visibility."`, popup: "The immunity of corruption in high places is not accidental. It is structural." }
    ]
  }
];
// 🧢 POOR PATH (12 questions)
const POOR_SCENARIOS = [
  {
    id: 1,
    title: "Birth & Early Life (1975, Age 0–5)",
    image: "/images/raju1.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `You are born in a village in Gaya district, Bihar. Your father, Ramkhelawan Prasad, works on the zamindar's land. He was born into it. His father was born into it.

This year, Parliament passed the Bonded Labour System (Abolition) Act, 1976 — a law that should have freed your father immediately. No one in your village has heard of it. There is no government officer here to enforce it.

Article 23 of the Constitution had prohibited bonded labour since 1950. The law took 25 years to arrive. It would take another generation to mean anything.`,
    choices: [
      {
        text: "Your father continues working the zamindar's fields, unaware the law has changed. The harvest this year is good.",
        popup: "A law unenforced is a law that does not exist."
      },
      {
        text: "A visiting schoolteacher tells your father about the new Act. He listens carefully. He goes back to the fields the next morning — the zamindar's men are watching.",
        popup: "Knowledge of rights and the ability to exercise them are different things entirely."
      },
      {
        text: "Your father tries to take his family to another village for work. The zamindar's brother, a local constable, stops him on the road.",
        popup: "When private legislation is backed by the uniform of the state, there is no separation."
      }
    ]
  },
  {
    id: 2,
    title: "Schooling & The Absent Promise (1983, Age 8)",
    image: "/images/raju2.jpg",
    bg: "from-blue-950 to-slate-900",
    text: `The Constitution's Directive Principles (Article 45) promised free and compulsory education for all children under 14. You are 8. The village school has had no teacher for four months. The teacher posted here lives in the district headquarters — he signs the attendance register on the 1st of each month.

  Baxi noted: Forty-three years after Independence, 44 to 155 million children continued to be exploitatively employed. The Act regulating child workers came in 1986. In four years, not a single conviction.`,
    choices: [
      {
        text: "You start working at a nearby brick kiln with your father — ₹15 for a full day of carrying. Your hands blister in the first week.",
        popup: "Child labour is not a choice. It is what non-enforcement of law looks like on a child's hands."
      },
      {
        text: "An NGO runs a night school three evenings a week. You attend when you are not too tired from the fields.",
        popup: "Partial education is still more than many received — but it is never enough to change your trajectory."
      },
      {
        text: "The zamindar's wife asks your mother to send you to work in their house in exchange for two meals a day.",
        popup: "Informal bonded servitude does not need a formal contract. It needs only hunger."
      }
    ]
  },
  {
    id: 3,
    title: "Resistance & Its Cost (1992, Age 17)",
    image: "/images/raju3.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `There is a new Kisan Sabha organising in neighbouring villages. They are telling labourers about minimum wage rights, the Migrant Labour Act, and the right to form unions. Your father attended one meeting. The next morning, the local police sub-inspector visited your home and told your father to stay away from "Naxal elements."
  Three villages away, a Kisan Sabha leader was arrested under the National Security Act — detained without trial for nine months.
  Baxi called this "surplus repression" — the use of excessive force to discipline not just crime but the very organisation of resistance.`,
    choices: [
      { text: "Your family stays away from the Sabha out of fear. You focus on saving enough to go to the city.", popup: " Survival sometimes looks like surrender. The system counts on this" },
      { text: "You attend two more meetings secretly. You learn your family is owed three years of back wages under the Minimum Wages Act", popup: "Knowing your rights is the beginning — but the beginning is not the end." },
      { text: ` You help the Sabha file a complaint with the district labour office. The complaint is marked "under inquiry" and never proceeds.`, popup: "The law provides the form of remedy. Not always the substance." }
    ]
  },
  {
    id: 4,
    title: "Migration & The City (2000, Age 25)",
    image: "/images/raju4.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `You are now in Mumbai. You work at a textile mill in Parel — you do not know it is the Malhotra family's mill. You are classified as a "contract worker" through a labour contractor — this means the Factories Act, ESI, PF, and the Industrial Disputes Act do not fully apply to you. You earn ₹60 below the statutory minimum wage. You share a 10×12 room in Dharavi with five others. You send ₹800 home every month.
  The Supreme Court in the 1980s held that payment below minimum wage is constitutionally prohibited "forced labour." The mill's compliance report, filed last year, says all workers are paid above minimum wage. Both of these things are simultaneously true in India's legal landscape.`,
    choices: [
      { text: `You and four colleagues file a complaint under the Minimum Wages Act. The labour inspector visits, accepts tea, and tells you to "wait for the process." You wait.`, popup: " Filing a complaint is not the same as receiving justice. The distance between them can be years." },
      { text: `You join a trade union. The contractor immediately marks you as a "troublemaker" — your shift is changed to nights and your work allocation drops.`, popup: "The Industrial Disputes Act protects workers on paper. Management prerogatives run deeper." },
      { text: "You say nothing and work. You calculate that the cost of losing this job — your family, your rent, your village debt — is higher than the cost of the wage theft.", popup: "Desperation forecloses legal options more effectively than any law." }
    ]
  },
  {
    id: 5,
    title: "The Accident & The Settlement (2010, Age 35)",
    image: "/images/raju5.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `Your colleague and bunkmate, Mohan, died last Tuesday. A machine without a safety guard. He was a "contract worker" — so the management's legal liability is routed through the contractor, who has disappeared. Mohan's wife was offered ₹35,000 in full and final settlement. She signed without reading it — she cannot read.
  The Workmen's Compensation Act would have entitled her to far more. A legal aid lawyer you found at an NGO says the case is strong. The case will take, he estimates, 6 to 8 years to be heard in the Labour Court.
  Baxi: "Slow-motion adjudication vindicates a right here and there but in the process strengthens the tendencies towards 'labour aristocracy' and weakens the autonomous working class movements."`,
    choices: [
      { text: "You support Mohan's wife in pursuing the case. You give her ₹500 from your savings for the first lawyer's fee. The case is registered.", popup: "Moral solidarity is real. But the system is not designed to reward it quickly." },
      { text: `You try to organise workers around the accident, raising safety demands. Three of the five organisers are let go within a week — "contract not renewed."`, popup: " Contract labour is the legal architecture of worker disposability." },
      { text: " You decide to go back to Bihar. You've saved ₹40,000 over 10 years. You want to buy a small plot of land.", popup: " Land reform promised redistribution. What did four decades of agrarian law actually " }
    ]
  },

  {
    id: 6,
    title: "Caste Violence & The Law's Silence (1988, Age 13)",
    image: "/images/raju6.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `Three villages from yours, a Dalit family's hut was burned down. Their son had married a girl from an upper-caste family — consensually. Four men were arrested. All four were released within 48 hours. The SHO said: "It is a family matter. A civil dispute." The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act has just been passed this year — 1989. A law passed is not a law enforced.
  Baxi: "Private legislation ordains standardless use of physical force, collective atrocities, sexual exploitation — almost invariably immunised from prosecution."`,
    choices: [
      {
        text: "Your father files a complaint under the new Atrocities Act. The Sub-Divisional Magistrate schedules a hearing in four months. Before it arrives, your family's water supply to the fields is mysteriously \"redirected.\"",
        popup: "Seeking legal remedy does not happen in a vacuum — it happens in a community with power structures."
      },
      {
        text: "An Ambedkarite organisation from the district comes to document the incident. They take testimonies. They publish a pamphlet. Nothing is prosecuted. The pamphlet is read in distant universities.",
        popup: "The documentation of injustice and its legal remedy are vastly different things."
      },
      {
        text: `Your family says nothing. Your mother tells you: "Beta, the law is written for them. We are written into it differently."`,
        popup: "When generations of people distrust the law, it is not irrationality. It is empirical knowledge."
      }
    ]
  },
  {
    id: 7,
    title: "The Land That Was Promised (1991, Age 16)",
    image: "/images/raju7.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `The district collector announced that under the Bihar Land Reforms Act, surplus land will be redistributed to landless labourers. Your family's name appears on a list. You are allocated 0.4 acres. Your father goes to collect the papers from the block office. The papers are there. But the land has a boundary dispute — the revenue records are unclear. The Patwari says he can fix the records for ₹3,000. Your family earns ₹800 a month.
  Baxi: "Inadequate record of land rights; secret orders subverting implementation; prevention of leading party cadres' involvement in the implementation of land reform legislation."`,
    choices: [
      {
        text: "Your father pays ₹1,500 — half the demanded bribe — and receives a partial record. The boundary remains disputed. You farm the undisputed portion.",
        popup: "Corruption is not an elite disease. It extracts from the poor proportionally more than from the rich."
      },
      {
        text: "You approach the district legal services authority. They send a letter to the block office. The block office acknowledges receipt. Nothing moves for three years.",
        popup: "The legal system can generate correspondence indefinitely. It does not necessarily generate resolution."
      },
      {
        text: "The upper-caste neighbour files a civil suit claiming the land was always his — pre-reform benami ownership. The case is filed in the district civil court. You cannot afford a lawyer.",
        popup: "Access to courts requires money. The constitutional right of access and the practical ability to access are different rights entirely."
      }
    ]
  },
  {
    id: 8,
    title: "Gender, Labour & Your Sister (1994, Age 19)",
    image: "/images/raju8.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `Your sister Savitri, 17, has started working at a handloom cooperative in the next town — ₹45 per day. The male workers doing the same work earn ₹75. The Equal Remuneration Act, 1976 prohibits gender-based wage discrimination for "same or similar work." The relevant committees to determine equal remuneration have not yet been set up in your district — eighteen years after the Act was passed.
  Baxi: "Gender-based wage discrimination, illegitimate under the Constitution, found its legislative 'saviour' at last in the Equal Remuneration Act, 1976. But the character of this saviour is deeply patriarchal."`,
    choices: [
      {
        text: "Savitri complains to the cooperative supervisor. He tells her she is paid less because \"women leave for maternity.\" He tells her she should be grateful for the work.",
        popup: "Ideology does the enforcement work that law will not do."
      },
      {
        text: "An NGO lawyer tells Savitri she has a valid claim under the Equal Remuneration Act. Filing the case would cost ₹800 in fees and require 12 days off work — 12 days of lost wages.",
        popup: "The cost of seeking justice is calibrated against the cost of injustice. For the poor, both are unaffordable."
      },
      {
        text: "Savitri says nothing and continues working. She saves enough to send you to Mumbai. Her sacrifice does not appear in any legal record or economic statistic.",
        popup: "The invisible labour of women is the hidden subsidy on which the movement of men depends."
      }
    ]
  },
  {
    id: 9,
    title: "Arriving in Mumbai — Dharavi (1996, Age 21)",
    image: "/images/raju9.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `You arrive at CST station with ₹400, a phone number, and a cousin's address in Dharavi. Within two weeks you have a job at a garment factory in Kurla — subcontracted by a larger firm. You are paid per piece, not per hour — this technically removes you from the coverage of the Minimum Wages Act under the contractor's interpretation. Your room in Dharavi is in a structure built on what the BMC records show as "encroached municipal land." Your home is, legally, not a home.
  You cannot open a bank account without an address. You cannot access the Public Distribution System without a ration card. You cannot get a ration card without a residence proof.
  Baxi's primitive accumulation — the dispossession of the peasant from the soil — does not end in the village. It continues in the city, restructured through municipal and housing law.`,
    choices: [
      {
        text: "You pay a local \"agent\" ₹500 for a forged address certificate. Now you have a ration card, a bank account, an existence in the state's eyes.",
        popup: "When the state makes legal existence inaccessible, illegality becomes the only path to formal life."
      },
      {
        text: "You borrow an address from your cousin, who is also in an illegal structure — two invisible people making each other technically visible to the state.",
        popup: "Community solidarity is not romantic — it is the survival mechanism law's exclusions make necessary."
      },
      {
        text: "You live without documents for two years — working, eating, existing but not recognised. Every day is a negotiation between your reality and the state's fiction.",
        popup: "Informality is not chosen. It is assigned — by the gap between law on paper and infrastructure on ground."
      }
    ]
  },
  {
    id: 10,
    title: "The Police Station (2002, Age 27)",
    image: "/images/raju10.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `There is a dispute in your lane in Dharavi. The police arrive. You are standing nearby, watching. You are taken to the station along with three others — the officer says you are a "known troublemaker" (you attended a union meeting last month). At the station, you are kept in a lock-up for 36 hours without being produced before a magistrate — a violation of Article 22 of the Constitution, which requires production within 24 hours.
  Baxi on torture: "The practice of police torture in India is widespread. Not merely is torture widespread, but the state has done very little to reform the legal system to detect, prosecute and punish it."`,
    choices: [
      {
        text: "You say nothing, cooperate entirely, and are released after 36 hours with a warning. You miss two days of piece-rate work — ₹190 lost. There is no compensation for wrongful detention.",
        popup: "The economic cost of police harassment falls entirely on the harassed."
      },
      {
        text: "You tell a legal aid volunteer at a nearby NGO. She drafts a complaint to the SHO. The SHO calls her office and suggests the complaint would be \"unwise.\" The complaint is not filed.",
        popup: "The right to complain about police exists in the same institution as the police."
      },
      {
        text: "Your factory contractor hears you were \"picked up.\" He tells you: \"We can't have trouble with police. Contract renewal is next month.\" Your hours are cut.",
        popup: "The carceral power of the state and the disciplinary power of capital communicate with each other fluently."
      }
    ]
  },
  {
    id: 11,
    title: "Your Son's Education (2012, Age 37)",
    image: "/images/raju11.jpg",
    bg: "from-amber-900 to-orange-950",
    text: `Your son Dev is 8. The Right to Education Act, 2009 guarantees free and compulsory education for all children 6–14. Dev's school in Dharavi has one teacher for 67 students. The classroom has no fans. The school has no toilet for girls — Dev's classmate Priya stopped coming in June, when summer began. The textbooks arrived in October.
  The Constitution's Directive Principles promised free and compulsory education in 1950. The right became enforceable by law in 2009. The infrastructure required to make it real remains a future promise.`,
    choices: [
      {
        text: "Dev is bright. He passes his 5th standard exams with distinction. His teacher says he has \"potential.\" There are no resources at the school to develop it.",
        popup: "Potential is evenly distributed across class. Opportunity is not. The law cannot bridge what infrastructure has not built."
      },
      {
        text: "Dev's school is shut for 40 days in one year — election duty, maintenance, flood, teacher training. His education is not continuous. It is fragmented.",
        popup: "The right to education requires a school that is open, staffed, and equipped. The law guarantees the right. It does not guarantee the school."
      },
      {
        text: "You consider pulling Dev from school to supplement income. You resist — your mother's voice in your head: \"Education is the one thing they cannot take from you.\" She was wrong. She was also right.",
        popup: "The aspiration for education as liberation is real. Its collision with material necessity is also real. Both truths must be held."
      }
    ]
  },

  {
    id: 12,
    title: "The Demolition (2018, Age 43)",
    image: "/images/raju12.jpg",
    bg: "from-violet-950 to-indigo-950",
    text: `The BMC has issued a demolition notice to your lane in Dharavi. The land is needed for a Smart City infrastructure project. Your structure is "illegal" — as it has always been. You have lived here for 22 years. You have no legal title. The Slum Rehabilitation Authority scheme promises alternate housing — but only to those who can produce proof of residence before January 1, 2000. Your forged certificate from 2000 is from March. You fall outside the cut-off by three months.
Article 21 of the Constitution protects the right to life and personal liberty. The Supreme Court has, in some cases, held that the right to shelter is part of the right to life. In other cases, it has approved large-scale demolitions. The doctrine is unsettled — which means the powerful settle it case by case.`,
    choices: [
      {
        text: "You and 40 neighbours approach a legal aid lawyer. She files a writ petition in the Bombay High Court — stay granted. Six months later, the stay is vacated. Demolition proceeds.",
        popup: "Legal process can delay dispossession. Rarely can it prevent it when capital and state align."
      },
      {
        text: "A local politician promises to intervene — in exchange for your community's votes in the upcoming election. He intervenes. The cut-off date for your lane is revised. Three other lanes are demolished instead.",
        popup: "Political patronage redistributes harm. It does not eliminate it."
      },
      {
        text: "You are offered alternate accommodation in Virar — 60 kilometres from your workplace. The commute would cost ₹180 per day. Your daily wage is ₹450.",
        popup: "Rehabilitation schemes are designed with the appearance of remedy and the geometry of impossibility."
      }
    ]
  }
];




// ─── STYLES ───────────────────────────────────────────────────────────────────

const css = `
  ${FONT}
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  min-height: 100vh;
  width: 100%;
}

body {
  overflow-x: hidden;
}

/* app should NOT lock height */
.app {
  min-height: 100vh;
  width: 100%;
}

  body, #root { 
    font-family: 'DM Sans', sans-serif; 
    background: #0a0a0f;
    color: #f0ede8;
    min-height: 100vh;
  }


  /* ── LANDING ── */
 .landing {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .landing-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 60% 40% at 20% 50%, rgba(180,120,40,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 50%, rgba(40,80,180,0.12) 0%, transparent 60%);
  }

  .landing-content {
    position: relative; z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
  }

  .landing-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 1.5rem;
  }

  .landing-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #d4a843 0%, #f0ede8 50%, #4a7fd4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .landing-subtitle {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-style: italic;
    color: rgba(240,237,232,0.5);
    margin-bottom: 3rem;
  }

  /* Characters */
  .characters-row {
    display: flex;
    gap: 3rem;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 3rem;
  }

  .character-card {
    position: relative;
    cursor: pointer;
    text-align: center;
    transition: transform 0.4s ease;
  }
  .character-card:hover { transform: translateY(-8px); }

  .character-visual {
    width: 160px;
    height: 220px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .char-rich .character-visual {
    background: linear-gradient(160deg, #1a1408 0%, #2d1f05 100%);
    box-shadow: 0 20px 60px rgba(180,120,40,0.2), inset 0 1px 0 rgba(212,168,67,0.3);
  }

  .char-poor .character-visual {
    background: linear-gradient(160deg, #080d18 0%, #0d1428 100%);
    box-shadow: 0 20px 60px rgba(40,80,160,0.15), inset 0 1px 0 rgba(74,127,212,0.2);
  }

  .character-emoji { font-size: 4rem; line-height: 1; }
  
  .character-badge {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
  }

  .char-rich .character-badge { 
    background: rgba(212,168,67,0.15); 
    color: #d4a843; 
    border: 1px solid rgba(212,168,67,0.3);
  }
  .char-poor .character-badge { 
    background: rgba(74,127,212,0.15); 
    color: #7aacf0; 
    border: 1px solid rgba(74,127,212,0.3);
  }

  .character-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    margin-top: 0.75rem;
    text-align: center;
  }
  .character-image {
  width: 250px;           /* fixed size */
  height: 250px;
  object-fit: cover;
  border-radius: 5%;     /* makes it circular */
  display: block;
  margin: 0 auto 12px;    /* center it */
}
  .character-desc {
    font-size: 0.72rem;
    color: rgba(240,237,232,0.45);
    text-align: center;
    max-width: 140px;
    line-height: 1.4;
    margin-top: 0.25rem;
    margin: 0.25rem auto 0; 
  }

  .char-vs {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: rgba(255,255,255,0.15);
    font-style: italic;
    align-self: center;
    padding-bottom: 3rem;
  }
.mobile-choices {
  display: none;
}
   @media (max-width: 768px) {

  /* hide big cards */
  .characters-row {
    display: none;
  }

  /* new mobile list */
  .mobile-choices {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .mobile-choice {
    width: 100%;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    transition: all 0.2s ease;
    text-align: left;
  }

  .mobile-choice:hover {
    background: rgba(255,255,255,0.07);
  }

  .mobile-choice-title {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .mobile-rich {
    border-left: 3px solid #d4a843;
  }

  .mobile-poor {
    border-left: 3px solid #4a7fd4;
  }

  .mobile-name {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  .mobile-desc {
    font-size: 0.8rem;
    color: rgba(240,237,232,0.6);
  }
}
  /* Select prompt */
  .select-prompt {
    font-size: 0.8rem;
    color: rgba(240,237,232,0.4);
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
  }

  /* ── SCENARIO PAGE ── */
  .scenario-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

  .scenario-header {
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }

  .progress-bar-wrap {
    flex: 1;
    max-width: 300px;
    height: 3px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    margin: 0 1.5rem;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  .scenario-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    min-height: calc(100vh - 70px);
  }

  @media (max-width: 768px) {
    .scenario-body { grid-template-columns: 1fr; }
  }

  .scenario-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;   /* ✅ start from top */
  padding: 3rem 2rem;
  position: relative;
  overflow-y: auto;              /* ✅ allow scroll */
}

  .scenario-bg-blur {
    position: absolute; inset: 0;
    opacity: 0.4;
    filter: blur(40px);
    z-index: 0;
  }

  .scenario-image {
  width: 100%;
  max-width: 620px;   /* controls max size */
  height: auto;       /* ✅ keeps aspect ratio */
  max-height: 600px;  /* optional safety */
  object-fit: cover;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
}

  // @keyframes float {
  //   0%, 100% { transform: translateY(0); }
  //   50% { transform: translateY(-12px); }
  // }

  .scenario-number {
    position: relative; z-index: 1;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .scenario-title {
    position: relative; z-index: 1;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .scenario-text {
    position: relative; z-index: 1;
    font-size: 1rem;
    line-height: 1.7;
    text-align: center;
    color: rgba(240,237,232,0.7);
    max-width: 100%;
    font-style: italic;
    white-space: pre-line;
  }

  .scenario-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 2.5rem;
    border-left: 1px solid rgba(255,255,255,0.05);
    overflow-y: auto;
  }

  .player-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
  }

  .tag-rich { 
    background: rgba(212,168,67,0.1); 
    color: #d4a843; 
    border: 1px solid rgba(212,168,67,0.25);
  }
  .tag-poor { 
    background: rgba(74,127,212,0.1); 
    color: #7aacf0; 
    border: 1px solid rgba(74,127,212,0.25);
  }

  .choices-label {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1rem;
  }

  .choice-btn {
    width: 100%;
    text-align: left;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    margin-bottom: 0.75rem;
    transition: all 0.25s ease;
    color: #f0ede8;
    position: relative;
    overflow: hidden;
  }

  .choice-btn::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    border-radius: 10px 0 0 10px;
    opacity: 0;
    transition: opacity 0.25s;
  }

  .choice-btn:hover { 
    background: rgba(255,255,255,0.07); 
    border-color: rgba(255,255,255,0.15);
    transform: translateX(4px);
  }

  .choice-btn:hover::before { opacity: 1; }

  .choice-rich .choice-btn::before { background: #d4a843; }
  .choice-poor .choice-btn::before { background: #7aacf0; }

  .choice-btn.selected { 
    background: rgba(255,255,255,0.08);
    transform: translateX(4px);
  }
  .choice-btn.selected::before { opacity: 1 !important; }

  .choice-text { 
    font-size: 0.9rem; 
    line-height: 1.5; 
    margin-bottom: 0.35rem;
  }

  .choice-impact {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    font-weight: 500;
  }

  .locked-zone {
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .locked-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .locked-item {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.2);
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    line-height: 1.4;
  }
  .locked-item:last-child { border-bottom: none; }

  .next-btn {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.9rem;
    border-radius: 10px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
  }

  .next-btn.visible { 
    opacity: 1; 
    pointer-events: all;
    transform: translateY(0);
  }

  .next-rich { background: #d4a843; color: #1a1408; }
  .next-rich:hover { background: #e0b855; }
  .next-poor { background: #4a7fd4; color: #05080f; }
  .next-poor:hover { background: #5a8fe4; }

 /* ── RESULTS ── */
.results-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: #05050a;
  overflow-y: auto;
}

.results-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 40%,
    rgba(120, 60, 160, 0.08) 0%,
    transparent 60%
  );
}

.results-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1150px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
}

.results-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.results-image {
  width: 100%;
  max-width: 420px;
  height: 520px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
}

.results-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.results-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 3vw, 3.2rem);
  margin-bottom: 1.2rem;
}

.results-message {
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(240, 237, 232, 0.72);
  max-width: 600px;
  text-align: left;
}

.results-message p {
  margin: 0 0 0.7rem 0;
}

.restart-btn {
  margin-top: 2rem;
  padding: 0.9rem 2.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #f0ede8;
  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.restart-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .results-page {
    padding: 1rem;
  }

  .results-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .results-image {
    max-width: 100%;
    height: 280px;
  }

  .results-right {
    align-items: center;
    text-align: center;
  }

  .results-message {
    text-align: center;
  }

  .restart-btn {
    margin-top: 1.5rem;
  }
}

/* mobile fallback */
@media (max-width: 768px) {
  .insight-container {
    grid-template-columns: 1fr;
  }
}
    /* ── POPUP MODAL ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(10px);
  background: rgba(5,5,10,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-card {
  width: 90%;
  max-width: 520px;
  background: rgba(20,20,30,0.95);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  animation: popupIn 0.35s ease;
}

@keyframes popupIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}

.modal-choice {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #f0ede8;
}

.modal-divider {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 1rem 0;
}

.modal-story {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(240,237,232,0.75);
  min-height: 80px;
  text-align: left;
}

/* typing cursor */
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

.modal-btn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  border-radius: 10px;
  border: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-btn-rich {
  background: #d4a843;
  color: #1a1408;
}
.modal-btn-rich:hover { background: #e0b855; }

.modal-btn-poor {
  background: #4a7fd4;
  color: #05080f;
}
.modal-btn-poor:hover { background: #5a8fe4; }
/* ── FINAL PAGE ── */
.final-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: #05050a;
}

/* 🔥 Landing-style gradient */
.final-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(212,168,67,0.15), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(74,127,212,0.15), transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 60%);
  z-index: 0;
}

.final-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
}

/* 🎯 BIG TITLE */
.final-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 1;
  margin-bottom: 2rem;

  background: linear-gradient(90deg, #d4a843, #ffffff, #4a7fd4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* TEXT BLOCK */
.final-text-block p {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(240,237,232,0.75);
  margin-bottom: 1rem;
}

/* 🔥 EMPHASIS LINE */
.final-text-block .highlight {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

/* QUOTE */
.final-quote {
  margin: 2rem 0;
  font-style: italic;
  font-size: 0.95rem;
  color: rgba(240,237,232,0.6);
}

.final-quote span {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.7;
}

/* END LINE */
.final-ending {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: rgba(240,237,232,0.85);
}

/* BUTTON */
.final-btn {
  margin-top: 2.5rem;
  padding: 1rem 2.8rem;
  border-radius: 12px;

  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.03);

  font-size: 0.9rem;
  letter-spacing: 0.08em;

  transition: all 0.3s ease;
}

.final-btn:hover {
  background: rgba(255,255,255,0.08);
  transform: translateY(-2px);
}

/* 📱 MOBILE */
@media (max-width: 768px) {
  .final-title {
    font-size: 2.5rem;
  }

  .final-text-block p {
    font-size: 0.9rem;
  }
}
  /* ── CREDITS ── */
.final-credits {
  margin-top: 2.5rem;
  text-align: center;
  opacity: 0.7;
}

.credits-title {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
}

.credits-names {
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: rgba(240,237,232,0.85);
}

.credits-class {
  font-size: 0.75rem;
  color: rgba(240,237,232,0.5);
  margin-top: 0.3rem;
}
  .screen-wipe {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background:
    radial-gradient(circle at center, rgba(212,168,67,0.18), transparent 35%),
    radial-gradient(circle at center, rgba(74,127,212,0.18), transparent 55%),
    #05050a;
  animation: screenWipe 2s ease forwards;
}

@keyframes screenWipe {
  0% {
    clip-path: circle(0% at 50% 50%);
    opacity: 1;
  }

  50% {
    clip-path: circle(150% at 50% 50%);
    opacity: 1;
  }

  100% {
    clip-path: circle(150% at 50% 50%);
    opacity: 0;
    pointer-events: none;
  }
}
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Landing({ onSelect }) {
  return (
    <div className="landing page-enter">
      <div className="landing-bg" />
      {/* <div className="divider-line" /> */}
      <div className="landing-content">
        <p className="landing-eyebrow">A Jurisprudence Game on Law, Capitalism & Social Determinism in India</p>
        <h1 className="landing-title">THE SAME DESTINATION</h1>
        <p className="landing-subtitle">Walk a mile in different shoes.</p>

        <div className="characters-row">
          <div className="character-card char-rich" onClick={() => onSelect("rich")}>
            <img
              src="/images/arjunlanding.jpeg"   // 👉 your image path
              alt="Arjun Malhotra"
              className="character-image"
            />
            <p className="character-name">Arjun Malhotra</p>
            <p className="character-desc">Upper caste | Son of a textile mill owner</p>
          </div>

          <div className="char-vs">vs</div>

          <div className="character-card char-poor" onClick={() => onSelect("poor")}>
            <img
              src="/images/rajulanding.jpeg"   // 👉 your image path
              alt="Raju Prasad"
              className="character-image"
            />
            <p className="character-name">Raju Prasad</p>
            <p className="character-desc">Lower caste | Son of a bonded labourer</p>
          </div>
        </div>
        <div className="mobile-choices">
          <div
            className="mobile-choice mobile-rich"
            onClick={() => onSelect("rich")}
          >
            <div className="mobile-choice-title">THE RICH</div>
            <div className="mobile-name">Arjun Malhotra</div>
            <div className="mobile-desc">
              Upper caste | Son of a textile mill owner | Mumbai, 1975
            </div>
          </div>

          <div
            className="mobile-choice mobile-poor"
            onClick={() => onSelect("poor")}
          >
            <div className="mobile-choice-title">THE POOR</div>
            <div className="mobile-name">Raju Prasad</div>
            <div className="mobile-desc">
              Dalit | Son of a bonded agricultural labourer | Rural Bihar, 1975
            </div>
          </div>
        </div>
        <p className="select-prompt">↑ Choose a character to begin your journey ↑</p>
      </div>
    </div>

  );
}
function ChoicePopup({ choice, character, isLast, onContinue }) {
  const isRich = character === "rich";

  const fullText = choice.popup;
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
    setDone(false);
  }, [choice]);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 20); // speed (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index, fullText]);

  return (
    <div className="modal-backdrop">
      <div className="modal-card"
      // onClick={() => {
      //   if (!done) {
      //     setDisplayText(fullText);
      //     setDone(true);
      //   }
      // }}
      >
        <p className="modal-eyebrow">You chose</p>
        <p className="modal-choice">"{choice.text}"</p>

        <div className="modal-divider" />

        {/* ✨ Typing text */}
        <p
          className="modal-story"
        // onClick={() => {
        //   if (!done) {
        //     setDisplayText(fullText); // instantly show full text
        //     setDone(true);            // unlock button immediately
        //   }
        // }}
        >
          {displayText}
          {!done && <span className="cursor">|</span>}
        </p>

        {done && (
          <button
            className={`modal-btn ${isRich ? "modal-btn-rich" : "modal-btn-poor"}`}
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
          >
            {isLast ? "See Results →" : "Continue →"}
          </button>
        )}
      </div>
    </div>
  );
}

function ScenarioPage({ scenario, character, onNext, current, total }) {
  const [selected, setSelected] = useState(null);

  const isRich = character === "rich";
  const richColor = "#d4a843";
  const poorColor = "#4a7fd4";
  const color = isRich ? richColor : poorColor;

  const progress = (current / total) * 100;

  // ✅ NOW each scenario has only ONE choices array
  const myChoices = scenario.choices;

  // ✅ Locked choices = opposite scenario (optional)
  const lockedChoices = scenario.lockedChoices || [];

  return (
    <div className="scenario-page page-enter" style={{ background: "#07070f" }}>

      <div className="scenario-header">
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          {isRich ? "🎩 Arjun" : "🧢 Raju"}
        </div>

        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, background: color }}
          />
        </div>

        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
          {current} / {total}
        </div>
      </div>

      <div className="scenario-body">

        {/* LEFT */}
        <div className="scenario-left">
          <div
            className="scenario-bg-blur"
            style={{
              background: `radial-gradient(ellipse at center, ${color}33 0%, transparent 70%)`,
            }}
          />

          <img src={scenario.image} alt="scenario" className="scenario-image" />

          <p className="scenario-number">
            Scenario {String(scenario.id).padStart(2, "0")}
          </p>

          <h2 className="scenario-title">{scenario.title}</h2>

          <p className="scenario-text">{scenario.text}</p>
        </div>

        {/* RIGHT */}
        <div className="scenario-right">

          <span className={`player-tag ${isRich ? "tag-rich" : "tag-poor"}`}>
            <span>{isRich ? "🎩" : "🧢"}</span>
            {isRich ? "Arjun's Choices" : "Raju's Choices"}
          </span>

          <p className="choices-label">Your available options</p>

          {/* ✅ MAIN CHOICES */}
          <div className={isRich ? "choice-rich" : "choice-poor"}>
            {myChoices.map((c, i) => (
              <button
                key={i}
                className={`choice-btn ${selected === i ? "selected" : ""}`}
                onClick={() => setSelected(i)}
              >
                <div className="choice-text">{c.text}</div>
                <div className="choice-impact">{c.impact}</div>
              </button>
            ))}
          </div>

          {/* ✅ LOCKED CHOICES */}
          {!isRich && lockedChoices.length > 0 && (
            <div className="locked-zone">
              <div className="locked-label">
                <span>🔒</span>
                <span>Locked — requires wealth</span>
              </div>

              {lockedChoices.map((c, i) => (
                <div key={i} className="locked-item">{c.text}</div>
              ))}
            </div>
          )}

          <button
            className={`next-btn ${selected !== null ? "visible" : ""} ${isRich ? "next-rich" : "next-poor"}`}
            onClick={() => selected !== null && onNext(selected)}
          >
            {current < total ? "Continue →" : "See Your Results →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Results({ character, onContinue }) {
  const isRich = character === "rich";
  const color = isRich ? "#d4a843" : "#4a7fd4";

  const richText = `Arjun Malhotra is 49. His company, now called Malhotra Group, is worth ₹800 crore. He sits on the board of the Confederation of Indian Industry. He was recently invited to a NITI Aayog consultation on labour law reform.

His workers still earn below minimum wage. Three labour complaints filed against his company remain pending in adjudication — the oldest is from 2001. Suresh Kamble's widow remarried and moved away. The case was closed.

Arjun has never been prosecuted. He has never been investigated. He has never missed a meal, a school fee payment, or a business-class flight.

"The law has not failed Arjun Malhotra. The law was never designed for his story to fail."
— Upendra Baxi, Law and State Regulated Capitalism in India`;

  const poorText = `Raju Prasad is 49. He returned to Bihar. The land he tried to buy was held in disputed title — the land records had never been updated after the land reform legislations of the 1970s. He is landless.

He now works irregular construction jobs in Patna. His son, 19, works at a garment factory. His daughter dropped out of school at 14 to help at home. The minimum wage complaint he filed in 2000 is still "under process."

Mohan's wife received ₹22,000 from the Labour Court in 2019. By then, inflation had made it worth far less than ₹35,000 in 2010.

Raju has never been prosecuted. He has also never been protected.

"The inability to grasp this fact signifies a paralysis of praxis directed to fructify the promises of the Indian Constitution to the masses who paid a bloody cost to achieve, and are paying an equally gory cost to maintain, Indian independence."
— Upendra Baxi, Law and State Regulated Capitalism in India`;

  const text = isRich ? richText : poorText;

  return (
    <div className="results-page page-enter">
      <div className="results-bg" />

      <div className="results-content results-split">

        {/* LEFT IMAGE */}
        <div className="results-left">
          <img
            src={isRich ? "/images/arjunres.jpg" : "/images/rajures.jpg"}
            alt="character"
            className="results-image"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="results-right">
          <h2 className="results-title" style={{ color }}>
            {isRich ? "Arjun Malhotra, Age 49" : "Raju Prasad, Age 49"}
          </h2>

          <div className="results-message">
            {text.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <button className="restart-btn" onClick={onContinue}>
            Continue →
          </button>
        </div>

      </div>
    </div>
  );
}

function FinalPage({ onRestart }) {
  return (
    <div className="final-page page-enter">
      <div className="final-bg" />

      <div className="final-content">
        <h1 className="final-title">THE SAME DESTINATION</h1>

        <div className="final-text-block">
          <p>1975. Two boys are born in India.</p>

          <p>
            They live under the same Constitution. The same Fundamental Rights.
            The same Directive Principles. The same Supreme Court. The same law.
          </p>

          <p className="highlight">
            One of them is fine.<br />
            One of them is not.
          </p>

          <p>
            The game did not determine this.
            <br />
            The choices did not determine this.
          </p>

          <p>
            The law — in its presence, its absence, its silences, its delays,
            its categories, its enforcement, and its imagination — determined this.
          </p>
        </div>

        <div className="final-quote">
          "The Indian legal order has been deployed as a monumental resource
          for the accomplishment of state-regulated capitalism."
          <span>— Upendra Baxi, 1990</span>
        </div>

        <p className="final-ending">
          This is not a game about bad people.
          <br />
          It is a game about a structure.
        </p>
        <div className="final-credits">
          <p className="credits-title">Credits</p>
          <p className="credits-names">
            RANVEER · TIANNA · DRONA
          </p>
          <p className="credits-class">
            BBALLB SEC A ‘23
          </p>
        </div>
        <button className="restart-btn final-btn" onClick={onRestart}>
          ↩ Play as the Other Character
        </button>
      </div>
    </div>
  );
}

/* ================== YOUR DATA ================== */
// IMPORTANT: you must already have these defined above
// const RICH_SCENARIOS = [...]
// const POOR_SCENARIOS = [...]


export default function App() {
  const [page, setPage] = useState("landing"); // landing | scenario | results | final
  const [character, setCharacter] = useState(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const audioRef = useRef(null);
  const resultAudioRef = useRef(null);

  // ✅ SELECT CORRECT SCENARIO ARRAY
  const scenarios =
    character === "rich" ? RICH_SCENARIOS : POOR_SCENARIOS;

  /* ================== START GAME ================== */
  const handleSelect = (char) => {
    setCharacter(char);
    setScenarioIndex(0);
    setChoices([]);
    setPage("scenario");
  };

  /* ================== AUDIO ================== */
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => { });
      }
    };

    document.addEventListener("click", playAudio, { once: true });
    return () => document.removeEventListener("click", playAudio);
  }, []);

  useEffect(() => {
    if (page === "results") {
      // stop bg music
      if (audioRef.current) audioRef.current.pause();

      // play result sound
      if (resultAudioRef.current) {
        resultAudioRef.current.currentTime = 0;
        resultAudioRef.current.play().catch(() => { });
      }
    }
  }, [page]);

  /* ================== NEXT ================== */
  const handleNext = (choiceIdx) => {
    const scenario = scenarios[scenarioIndex];
    const choice = scenario.choices[choiceIdx];

    setSelectedChoice(choice);
    setShowPopup(true);
  };

  /* ================== CONTINUE ================== */
  const handleContinue = () => {
    setChoices([...choices, selectedChoice]);
    setShowPopup(false);

    if (scenarioIndex + 1 < scenarios.length) {
      setScenarioIndex(scenarioIndex + 1);
    } else {
      setPage("results"); // ✅ first go to results
    }
  };

  /* ================== GO TO FINAL ================== */
  const handleToFinal = () => {
    setPage("final");
  };

  /* ================== RESTART ================== */
  
  const handleRestart = () => {
    setTransitioning(true);

    setTimeout(() => {
      setPage("landing");
      setCharacter(null);
      setChoices([]);
      setScenarioIndex(0);
      setShowPopup(false);
      setSelectedChoice(null);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => { });
      }

      if (resultAudioRef.current) {
        resultAudioRef.current.pause();
      }
    }, 1100);

    setTimeout(() => {
      setTransitioning(false);
    }, 2000);
  };
  /* ================== UI ================== */
  return (
    <>
      <style>{css}</style>

      <div className="app">
        {page === "landing" && (
          <Landing onSelect={handleSelect} />
        )}

        {page === "scenario" && scenarios && (
          <ScenarioPage
            key={scenarioIndex}
            scenario={scenarios[scenarioIndex]}
            character={character}
            onNext={handleNext}
            current={scenarioIndex + 1}
            total={scenarios.length}
          />
        )}

        {page === "results" && (
          <Results
            character={character}
            choices={choices}
            onContinue={handleToFinal}   // ✅ NEW
          />
        )}

        {page === "final" && (
          <FinalPage onRestart={handleRestart} />
        )}

        {/* POPUP */}
        {showPopup && selectedChoice && (
          <ChoicePopup
            choice={selectedChoice}
            character={character}
            isLast={scenarioIndex === scenarios.length - 1}
            onContinue={handleContinue}
          />
        )}

        {/* AUDIO */}
        <audio ref={audioRef} loop>
          <source src="/music/bg.mp3" type="audio/mpeg" />
        </audio>

        <audio ref={resultAudioRef}>
          <source src="/music/end.mp3" type="audio/mpeg" />
        </audio>
        {transitioning && <div className="screen-wipe" />}
      </div>
    </>
  );
}
