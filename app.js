(function () {
"use strict";
const modes={
solo:"Start with Bountiful Delves and Nightmare Prey for dependable solo-friendly Vault progression. The Labyrinth is another exciting route.",
keys:"Build up from Mythic 0 to comfortable keystone levels, then aim for +10 as a longer-term goal. Fill Dungeon Vault slots while farming weapon and trinket upgrades.",
raid:"Prioritize the Hunter 4-piece and strong weapon and trinkets, especially Ula'tek and Kith'ix drops. Fill Raid Vault slots with bosses you can clear consistently."};
const buttons=[...document.querySelectorAll(".mode-btn")];
function selectMode(mode){if(!modes[mode])return;buttons.forEach(b=>{const a=b.dataset.mode===mode;b.classList.toggle("active",a);b.setAttribute("aria-pressed",String(a));});document.querySelectorAll(".route-card").forEach(c=>c.classList.toggle("selected",c.dataset.route===mode));document.getElementById("mode-advice").textContent=modes[mode];try{localStorage.setItem("midnight-mode",mode)}catch(e){}}
buttons.forEach(b=>b.addEventListener("click",()=>selectMode(b.dataset.mode)));
let initial="solo";try{initial=localStorage.getItem("midnight-mode")||initial}catch(e){}selectMode(initial);
const tasks=[...document.querySelectorAll("input[data-task]")];const storage="midnight-tasks-v1";let saved={};try{saved=JSON.parse(localStorage.getItem(storage)||"{}")||{}}catch(e){}
tasks.forEach(t=>t.checked=!!saved[t.dataset.task]);
function render(){const n=tasks.length,done=tasks.filter(t=>t.checked).length,pct=n?Math.round(done/n*100):0;document.getElementById("rail-count").textContent=done;document.getElementById("rail-total").textContent=n;document.getElementById("rail-progress").setAttribute("aria-valuenow",String(pct));document.getElementById("rail-progress-fill").style.width=pct+"%";document.getElementById("checklist-progress").textContent=done+" of "+n+" completed";document.getElementById("checklist-status").textContent=done===n?"Hunt complete!":done?"Keep going, hunter!":"Adventure awaits";let s={};tasks.forEach(t=>s[t.dataset.task]=t.checked);try{localStorage.setItem(storage,JSON.stringify(s))}catch(e){}}
tasks.forEach(t=>t.addEventListener("change",render));render();
const toast=document.getElementById("toast");let toastTimeout;function notify(s){toast.textContent=s;toast.classList.add("show");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove("show"),2700)}
document.getElementById("reset-checklist").addEventListener("click",()=>{if(tasks.every(t=>!t.checked))return;if(!confirm("Clear all checkmarks from this browser?"))return;tasks.forEach(t=>t.checked=false);render();notify("Checklist reset")});
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",async()=>{const code=b.dataset.copy;let ok=false;try{await navigator.clipboard.writeText(code);ok=true}catch(e){const t=document.createElement("textarea");t.value=code;t.style.position="fixed";t.style.left="-9999px";document.body.appendChild(t);t.select();try{ok=document.execCommand("copy")}catch(err){}t.remove()}const result=ok?b.querySelector("b").textContent+" talent code copied":"Copy failed — use the linked talent guide";document.getElementById("copy-status").textContent=result;notify(result)}));
})();