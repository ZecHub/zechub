import { Campaign } from "./types";

function avatarFor(name: string) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&backgroundType=gradientLinear`;
}

function txHash(i: number) {
  return `0x${(Math.random().toString(16).slice(2) + Date.now().toString(16)).slice(0, 32)}${i}`;
}

let memory: Campaign[] = [
  { id: "1", title: "Education for All", description: "Scholarships for under‑served students", goalZec: 25, receivedZec: 8.3, category: "Proposal", address: "zs1exampleaddress...", createdAt: Date.now()-1_800_000, creator: { name: "Zara Ali", handle: "@zara", avatar: avatarFor("Zara") }, transactions: Array.from({length:4}, (_,i)=>({ id:`t1-${i}`, amount: +(Math.random()*1.5+0.2).toFixed(2), memo: "Keep learning!", timestamp: Date.now()- (i+1)*60_000, txHash: txHash(i) })) },
  { id: "2", title: "Clean Water Initiative", description: "Build community wells", goalZec: 30, receivedZec: 15.7, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-1_500_000, creator: { name: "River DAO", handle: "@riverdao", avatar: avatarFor("RiverDAO") }, transactions: Array.from({length:5}, (_,i)=>({ id:`t2-${i}`, amount: +(Math.random()*2+0.3).toFixed(2), memo: "For clean water", timestamp: Date.now()- (i+2)*70_000, txHash: txHash(i) })) },
  { id: "3", title: "Wildlife Protection", description: "Anti‑poaching patrols", goalZec: 28, receivedZec: 9.2, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-1_200_000, creator: { name: "Wild Guardians", handle: "@wildguard", avatar: avatarFor("WildGuard") }, transactions: Array.from({length:3}, (_,i)=>({ id:`t3-${i}`, amount: +(Math.random()*1.2+0.1).toFixed(2), memo: "Protect wildlife", timestamp: Date.now()- (i+3)*65_000, txHash: txHash(i) })) },
  { id: "4", title: "Community Garden", description: "Urban food resilience", goalZec: 18, receivedZec: 6.8, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-1_000_000, creator: { name: "Urban Roots", handle: "@urbanroots", avatar: avatarFor("UrbanRoots") }, transactions: Array.from({length:3}, (_,i)=>({ id:`t4-${i}`, amount: +(Math.random()*0.9+0.1).toFixed(2), memo: "Seeds & tools", timestamp: Date.now()- (i+1)*80_000, txHash: txHash(i) })) },
  { id: "5", title: "Tech for Good", description: "Open‑source civic tools", goalZec: 35, receivedZec: 18.4, category: "Proposal", address: "zs1exampleaddress...", createdAt: Date.now()-900_000, creator: { name: "Civic Lab", handle: "@civiclabs", avatar: avatarFor("CivicLab") }, transactions: Array.from({length:6}, (_,i)=>({ id:`t5-${i}`, amount: +(Math.random()*2.5+0.4).toFixed(2), memo: "Build OSS", timestamp: Date.now()- (i+2)*55_000, txHash: txHash(i) })) },
  { id: "6", title: "Save the Ocean", description: "Coastal cleanup grants", goalZec: 32, receivedZec: 12.5, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-800_000, creator: { name: "Ocean Friends", handle: "@oceanfri", avatar: avatarFor("OceanFriends") }, transactions: Array.from({length:4}, (_,i)=>({ id:`t6-${i}`, amount: +(Math.random()*1.8+0.3).toFixed(2), memo: "For the ocean", timestamp: Date.now()- (i+1)*50_000, txHash: txHash(i) })) },
  { id: "7", title: "Emergency Relief Fund", description: "Rapid response for disasters", goalZec: 40, receivedZec: 10.1, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-700_000, creator: { name: "Relief Now", handle: "@relief", avatar: avatarFor("ReliefNow") }, transactions: Array.from({length:5}, (_,i)=>({ id:`t7-${i}`, amount: +(Math.random()*3+0.5).toFixed(2), memo: "Stay safe", timestamp: Date.now()- (i+2)*45_000, txHash: txHash(i) })) },
  { id: "8", title: "Privacy Advocacy", description: "Support digital rights", goalZec: 22, receivedZec: 7.6, category: "Proposal", address: "zs1exampleaddress...", createdAt: Date.now()-600_000, creator: { name: "Privacy Guild", handle: "@privacy", avatar: avatarFor("PrivacyGuild") }, transactions: Array.from({length:3}, (_,i)=>({ id:`t8-${i}`, amount: +(Math.random()*1.1+0.2).toFixed(2), memo: "Defend privacy", timestamp: Date.now()- (i+3)*60_000, txHash: txHash(i) })) },
  { id: "9", title: "Open‑Source Grants", description: "Fund maintainers", goalZec: 26, receivedZec: 11.9, category: "Proposal", address: "zs1exampleaddress...", createdAt: Date.now()-500_000, creator: { name: "FOSS Fund", handle: "@fossfund", avatar: avatarFor("FOSSFund") }, transactions: Array.from({length:4}, (_,i)=>({ id:`t9-${i}`, amount: +(Math.random()*1.7+0.2).toFixed(2), memo: "Thanks devs", timestamp: Date.now()- (i+1)*75_000, txHash: txHash(i) })) },
  { id: "10", title: "Medical Aid for Kids", description: "Pediatric care access", goalZec: 24, receivedZec: 13.2, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-400_000, creator: { name: "Care4Kids", handle: "@care4kids", avatar: avatarFor("Care4Kids") }, transactions: Array.from({length:5}, (_,i)=>({ id:`t10-${i}`, amount: +(Math.random()*2+0.3).toFixed(2), memo: "For kids", timestamp: Date.now()- (i+2)*40_000, txHash: txHash(i) })) },
  { id: "11", title: "Artists Collective", description: "Microgrants for creators", goalZec: 16, receivedZec: 5.4, category: "Birthday", address: "zs1exampleaddress...", createdAt: Date.now()-300_000, creator: { name: "Art DAO", handle: "@artdao", avatar: avatarFor("ArtDAO") }, transactions: Array.from({length:3}, (_,i)=>({ id:`t11-${i}`, amount: +(Math.random()*0.8+0.1).toFixed(2), memo: "Create more!", timestamp: Date.now()- (i+1)*35_000, txHash: txHash(i) })) },
  { id: "12", title: "Refugee Support", description: "Shelter and guidance", goalZec: 34, receivedZec: 19.3, category: "General", address: "zs1exampleaddress...", createdAt: Date.now()-200_000, creator: { name: "Transit Help", handle: "@transit", avatar: avatarFor("TransitHelp") }, transactions: Array.from({length:4}, (_,i)=>({ id:`t12-${i}`, amount: +(Math.random()*2.1+0.3).toFixed(2), memo: "Welcome", timestamp: Date.now()- (i+2)*30_000, txHash: txHash(i) })) },
];

export const db = {
  list(): Campaign[] { return memory; },
  get(id: string): Campaign | undefined { return memory.find(c => c.id === id); },
  add(c: Campaign) { memory = [c, ...memory]; return c; },
};


