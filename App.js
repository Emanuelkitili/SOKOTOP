let ads = JSON.parse(localStorage.getItem('sokotop_ads') || '[]');
let current = 0, timeLeft = 10, interval;

function showTV(i){
if(ads.length===0) return;
current=i; let ad=ads[i];
let media = ad.type==='video' ? `<video src="${ad.url}" autoplay muted loop playsinline></video>` : `<img src="${ad.url}">`;
document.getElementById('tvScreen').innerHTML = `${media}<div class="tv-info"><h3>${ad.title}</h3><button onclick="window.open('https://wa.me/${ad.wa}')">💬 WhatsApp Order</button></div>`;
let dots=''; ads.forEach((_,idx)=>dots+=`<span class="dot ${idx===i?'active':''}"></span>`); document.getElementById('tvDots').innerHTML=dots;
timeLeft=ad.seconds;
}
function startTV(){
if(ads.length===0) return;
showTV(0);
clearInterval(interval);
interval=setInterval(()=>{timeLeft--; if(timeLeft<=0){current=(current+1)%ads.length; showTV(current);}},1000);
}
startTV();
window.addEventListener('storage',()=>{ads=JSON.parse(localStorage.getItem('sokotop_ads')||'[]'); startTV();});

// USER POSTS
document.getElementById('postFile').addEventListener('change', function(){
let file=this.files[0]; if(!file) return;
let reader=new FileReader();
reader.onload=e=>{document.getElementById('postPreview').innerHTML=file.type.startsWith('video')?`<video src="${e.target.result}" controls></video>`:`<img src="${e.target.result}">`; document.getElementById('postPreview').dataset.url=e.target.result;};
reader.readAsDataURL(file);
});
document.getElementById('btnCreatePost').onclick=()=>{
let text=document.getElementById('postText').value;
let url=document.getElementById('postPreview').dataset.url;
if(!text && !url){alert('Add something');return;}
let media=url?(url.startsWith('data:video')?`<video src="${url}" controls></video>`:`<img src="${url}">`):'';
let html=`<div class="post-card"><p>${text}</p>${media}<small style="color:#888">Just now • Kitui</small></div>`;
document.getElementById('feedPosts').insertAdjacentHTML('afterbegin',html);
document.getElementById('postText').value=''; document.getElementById('postPreview').innerHTML='';
};