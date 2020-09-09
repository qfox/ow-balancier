import { Player, Role, PlayerRoles } from '../types';

const shorties = {
  [Role.unknown]: 'u',
  [Role.offtank]: 't',
  [Role.maintank]: 'o',
  [Role.heal]: 's',
  [Role.lightheal]: 'l',
  [Role.hitscan]: 'h',
  [Role.projectile]: 'p',
  [Role.flex]: 'f',
};

export class CPlayer implements Player {
  id: string;
  name: string;
  btag: string;
  // apitag: string;
  roles: PlayerRoles;

  constructor(id: string, name: string, btag: string, roles: PlayerRoles) {
    this.id = id;
    this.name = name;
    this.btag = btag;
    this.roles = roles;
  }

  get mainRank(): number {
    const rank = this.roles.get(this.main)!;
    return rank < 1000 ? 0 : rank;
  }

  get flexRank(): number {
    return this.roles.get(Role.flex)!;
  }

  get r(): string {
    return shorties[this.main] + Math.floor(this.rank / 100);
  }

  get rank(): number {
    return this.mainRank || this.flexRank;
  }

  get main(): Role {
    const role = this.roles.keys().next().value;
    if (!role) {
      throw new Error(`Player ${this.name} has no roles.`);
    }

    return role;
  }
}

export const people = parse(`
Aenyeweddien#21419	muramnesia	dd	support	0	0	2344
AGKorvin#2101	Anthony_Korvin	dd	support	0	0	3388
alicelynx#21445	alicelynx	support	tank	0	1978	0
alisaking#2732	alisaking	dd	flex	0	2960	2565
ALVAREZ#2349	alvarez_ska	tank	support	2255	0	0
AndreySh04#2723	AndreySh04	flex	flex	1677	1580	1290
AnnaDit#2617	Anna_dit	flex	flex	2300	2000	2150
Arawilds#2795	Arawilds	tank	support	2045	2030	0
Artail#21562	FairArtail	dd	tank	0	0	3887
Artign#2341	artign	tank	support	2370	2400	0
Askhay#21648	Askhay641	dd	dd	0	0	2600
ataringa#21441	ataringa	support	dd	0	2088	0
attaynez#21400	valerone2323	dd	flex	2944	3100	3081
AuntPetunia#2696	Dyadya_Piton	flex	flex	2817	0	0
Avgust#2477	avgustinn	tank	support	2620	0	0
avokaphs#2906	avokaphs	support	flex	0	2811	0
B1ackMamba#2430	Mr_B1ack_ttv	support	tank	0	2200	0
Babaika#21292	Babaikah	tank	support	3050	2970	0
BabaYaga#21533	Samura1Blade	dd	support	0	0	3377
Baida#21855	torusikano	tank	support	2450	0	0
Banzai#2270	Banzai6666	tank	flex	2680	0	0
bewreks#2521	bewreks	dd	support	0	0	2934
Black#2954	AgeroKun	support	dd	0	3000	0
Bloodghast#2754	BloodghastZK	dd	tank	0	0	3100
BobDoSmth#2971	t4gr1m	support	tank	0	2600	0
Brunsong#21698	pasternak111	tank	support	2850	2444	0
c00per#21976	c00pern1	dd	flex	0	0	4089
CallMeWizzy#2193	wizzyquizzy	support	tank	2790	2690	0
CandyCandy#21806	CandyCandyOW	support	tank	0	2550	0
ChB#21715	chbiii	dd	tank	0	0	2600
Cherry#22701	Klafuti_	support	flex	0	2450	0
ChopSuey#21917	Rud0lf_Br0tovski	tank	support	0	3576	0
Chuvachela#21342	Chuvachela_	tank	dd	2933	0	0
crash#23867	Crash_Yopta	dd	tank	2811	0	2715
Cre#2692	top6mcree	dd	support	0	0	2100
CrEatIVchIk#21531	Hungry_Den	tank	tank	3389	0	0
CuChulainn#21911	gae_bolg	dd	support	0	0	2384
dasha21cm#2738	dashabreeze	dd	tank	0	0	3048
Davin4#2286	Davin4i	dd	flex	0	0	3238
Delifas#2245	Avolber	dd	tank	0	0	3603
Demis#2138	dm_angel	support	tank	2115	2477	0
Dexterinio#2401	dexxxxt	dd	flex	2803	2800	2969
Dikerik#2659	Dikerik	tank	flex	2279	0	0
Discor#2933	Green_Valet	tank	support	2235	0	0
Djenteman#21217	Chebuhtarych	support	tank	1330	1780	0
dlurtys#2455	dlurtys	support	tank	2350	2420	0
DPSMoira#2236	Versailles55	support	tank	2060	1900	0
Ego2nd#2357	alexeynibo	dd	tank	2411	0	2700
Elimes#2595	arystan_elimes8	dd	support	0	0	2356
eug#2513	elfcheg	support	tank	2502	2050	0
eXEvi#2589	ex_evi	support	tank	0	1940	0
Extra#2857	Extra_Naya	support	dd	0	3746	0
FeeL#21329	FiL_GaD	support	tank	0	2644	0
FirstSin#21384	first_sin	dd	dd	0	0	3042
Fluffypaws#21393	fluffypaws89	support	dd	0	2600	2750
flynfall#21850	f1ynfall	dd	tank	0	0	3421
Freezzle#21837	freezzle	tank	tank	3560	0	0
Frieza666#2313	Frieza666	dd	tank	0	0	3950
Furimdar#21302	Furimdar	tank	support	2144	0	0
fyh#21892	fyh_tac	dd	support	0	1760	1890
Geksana#2637	Geksana	support	tank	0	2364	0
Getrush#2894	getrush_7	dd	dd	0	0	4112
Gigabidd#2788	gigabidq	tank	support	2750	0	0
goodimp#2660	GoodImp	tank	flex	1650	0	0
Hendo#21647	grim_moose	support	tank	1999	1860	0
HEYD#21717	heydthis	tank	dd	3150	3230	3050
hiegirsis#2198	Hiegirsiss	tank	dd	2350	0	1870
himukkee#2315	himukkee	dd	support	0	0	2650
Honoka#21889	honokawitch	support	flex	0	2600	2380
HugsyHog#2210	HugsyHog	tank	flex	3300	0	0
ilq#21883	ilqsk	tank	dd	3333	0	0
Inquisitor#2738	JensenRuno	tank	tank	3233	0	0
IsMyLovE#2724	kromus22	tank	dd	2222	0	0
jed1master#2662	Jed1Master	dd	support	0	0	3031
JonSnow#22990	jessard	dd	support	0	3011	2671
JUSTJ#21122	Tyopliy_Stan	support	dd	0	2421	0
Justy#21844	justy_xd	tank	dd	3399	3490	3501
Karin#21315	Karin_Pride	dd	flex	3211	2933	2634
Karnage#22778	admiralkarnage	support	dd	0	0	2420
Kars#21831	dvoretzkiysebas	tank	flex	4070	0	0
KerelStorm#2382	kiranakofeine	tank	flex	2300	0	2150
Koneko#22561	Kotenok1313	support	tank	0	2576	0
Ǩõŋđëŗǃ#2507	konderlip	tank	dd	2966	0	0
kranopodem#2598	kranopodem	tank	flex	2780	0	0
Kuckamyrka#2279	69JessicaRabbit	support	support	0	2800	0
L1na#21688	Enjoylika	support	tank	2298	0	0
lemonylight7#2785	lemonylight7	support	flex	2160	2350	0
Lik#2736	mrLIK	support	tank	3010	2910	0
lilamurasaki#2783	lilamurasaki_	support	tank	0	2021	0
Lizard#21839	lizzard_1337	tank	dd	2522	0	0
LnSky#21756	ulyxa117	support	flex	2580	2639	0
LoganSky#2154	LoganSky	tank	dd	2760	0	0
Lotti#21779	lotti1743	support	tank	0	2490	0
LucidMind#2773	PleaseDeleteGame	dd	tank	0	0	2475
Magistr#21158	Magistr248	dd	tank	0	0	3434
Mars#23130	marssteel	dd	tank	0	0	3377
Medic#21553	PsixozLife	dd	flex	2300	0	2250
meOwO#2736	nmie	dd	flex	0	0	3351
Mind#22534	universal_mind	flex	flex	2690	2700	2600
MiniMe#2864	minimej	support	dd	0	2471	0
Mishail#21762	Etherrrnet	flex	flex	2400	2444	2200
Montegro#2590	Montegra	dd	tank	0	0	3463
MoonBunny#21237	moon__bunny_	support	flex	0	2222	0
morSevit#2272	morSevit	dd	support	0	0	2846
MrLanzo#2963	MrLanzo	tank	support	2700	2379	0
MrSpase#21321	mrspase53	dd	flex	1950	2070	1970
msFiBi#2970	msFiBi	support	flex	0	2611	0
Naofumi#21626	NakonOW	support	tank	2100	2430	0
nbslab#2598	nbslab138	dd	tank	0	0	2440
Noellerox#2167	Noellerox_	tank	support	3140	3452	0
Onarh#2381	OnarhL	support	tank	2430	2833	2560
OnePunchMan#21895	OnePunchManOW	dd	dd	0	0	2890
Pazzle#21707	Pazzill	tank	flex	2487	0	2100
pear#2939	skryaga_	flex	flex	2626	2450	2360
PsyVers#2608	PsyVers	dd	flex	0	0	2950
PuPsik#21628	pupsik__ow	support	tank	0	2535	0
qwerty#2509	Qwertyomsk	dd	tank	2270	0	1920
Rapier#2748	Rapier_ShGV	tank	dd	2521	0	0
RAQNOO#2648	February19th	dd	flex	0	0	3476
ReCreator#21832	Unreal_Captain	tank	dd	2777	0	2734
redbox#21112	redbox1424	dd	dd	0	0	2867
RedSkull#2769	redskull242	dd	flex	2920	2540	2690
Reelmj#2444	reelmj	tank	support	3050	0	0
ReinLu#2607	reinlu	support	tank	0	2800	0
RevolLol#2663	RevolLol	tank	tank	3733	0	0
Ryry#21282	Ryryr0	dd	flex	0	0	3288
s1lver#2404	s1lv_	tank	dd	2747	0	0
såkallad#2105	금고양이(tatabi_)	support	tank	0	2860	0
Scene#21517	KateScene	tank	support	2400	0	0
Sensei44#2921	Sensei_g44	tank	dd	2	0	2970
ShadowBran#2488	mittzki	support	support	2380	2530	0
Shiyoku#2662	N_eeo	support	flex	2267	2534	0
Simona#21229	5imka	support	flex	0	2700	0
SindeiruNANI#2967	sindeiru	support	tank	2651	2970	0
Smitt#21163	SmittOW	dd	flex	2620	0	2935
sndrd#2465	lifr3y	dd	tank	3220	0	2950
Snofa#21982	snofa	support	flex	2400	2300	2420
Soter#22797	bokal_za_Sotera	dd	tank	2620	0	2420
Starche#2116	ArtStarche	support	tank	0	2250	0
Stargazer#21146	stargazer21146	support	tank	0	2980	0
Starosta#2154	starosta_games	support	tank	0	1567	0
SwitchOFF#21566	Switchoff	support	tank	2250	2160	0
TaiSaWFly#2144	Tai_SaWFly	support	tank	2740	2830	0
Talos#22431	AnyaAnyaa	support	support	0	3200	0
Ternovnik#21623	Ternovn1k	support	tank	2065	2377	0
tia#22266	tia_ti	support	tank	0	2350	0
ToR#22245	unroq_ToR	tank	dd	3310	0	0
tracker#2861	mtrackertf2	dd	dd	0	0	3150
uN1Xoid#2622	uN1Xoid	tank	support	2920	0	0
vader181#2765	vader181	support	flex	3069	3009	2786
Vanitas#21300	t_oikawa	support	support	0	3069	0
Veasun#2788	veasun	dd	tank	0	0	3745
VicExtreme#11520	VictorGorbachev2010	dd	tank	0	0	2880
vles#21994	vlles	support	flex	0	1600	0
Waizy#21480	Waizyz	tank	support	2700	3350	0
walkyrie#21825	walkyrie_warrior	support	tank	0	1800	0
Warrkan#1755	warrkan_7734	tank	tank	3340	0	0
WOOG007#2317	Woolf_geroj_007	dd	dd	0	0	3300
yourindigo#2700	yourindigo	tank	support	2260	0	0
Zafkiel#21174	The_DocToRo_	dd	flex	2555	0	3056
Zaziel#21179	nika_troksiiana	support	flex	0	2359	2065
ZL0YW0LK#2133	ZL0YW0LK	dd	flex	0	0	1711
zMize#2978	zMize	tank	dd	3577	0	0
zubermann#2460	megapupkin	support	tank	2520	2600	0
Епшик#2736	Epshik	tank	dd	2100	0	1750
Михаил#21833	Tolgrn	support	tank	2800	3331	0
Михан#21694	BL3656	dd	flex	2400	0	2700
Паныч#2776	Panblch	dd	support	0	0	2400
`);

function parseRoles([role1, role2, ...ranksStrings]: string[]): PlayerRoles {
  const result = new Map();
  const ranks = ranksStrings.map(Number);
  const [tank, sup, dd] = ranks.map(rank => rank || null);
  const flex = avg(...ranks.filter(Boolean));

  for (const role of [role1, role2, 'flex']) {
    if (role === 'flex') {
      result.set(Role.flex, flex);
    } else if (role === 'tank') {
      result.set(Role.offtank, tank);
      result.set(Role.maintank, tank);
    } else if (role === 'support') {
      result.set(Role.lightheal, sup);
      result.set(Role.heal, sup);
    } else if (role === 'dd') {
      result.set(Role.projectile, dd);
      result.set(Role.hitscan, dd);
    } else {
      throw new Error('wut? ' + role);
    }
  }

  return result;
}

function parse(str: string): Player[] {
  const rows = str.split(/\n/).map(s => s.trim()).filter(Boolean);
  return rows.map(row => parseRow(row));
}

function parseRow(line: string): Player {
  const [btag, name, ...roleStrings] = line.split(/\t/);
  const roles = parseRoles(roleStrings);
  const id = btag.replace('#', '-');
  // const apitag = `http://owapi.io/profile/pc/eu/${id}`;
  return new CPlayer(id, name, btag, roles);
}

function avg(...ranks: number[]) {
  return Math.floor(ranks.reduce((a, b) => a + b) / ranks.length) || 0;
}
