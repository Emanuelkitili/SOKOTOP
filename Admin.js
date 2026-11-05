function checkPass(){if(document.getElementById('adminPass').value==='sokotop2026'){document.getElementById('loginBox').style.display='none';document.getElementById('adminPanel').style.display='block';loadList();}else alert('Wrong password');}
let tempUrl='', tempType='';
document.getElementById('adFile').addEventListener('change',function(){let f=this.files[0];let r=new FileReader();r.onload=e=>{tempUrl=e.target.result;tempType=f.type.startsWith('video')?'video':'image';document.getElementById('adPreview').innerHTML=tempType==='video'?`<video src="${tempUrl}" controls></video>`:`<img src="${tempUrl}">`;};r.readAsDataURL(f);});
function uploadAd(){
let title=document.getElementById('adTitle').value, wa=document.getElementById('adWa').value, sec=parseInt(document.getElementById('adSeconds').value)||10;
if(!title||!tempUrl){alert('Add title + gallery media');return;}
let ads=JSON.parse(localStorage.getItem('sokotop_ads')||'[]');
ads.push({title,wa,seconds:sec,url:tempUrl,type:tempType});
localStorage.setItem('sokotop_ads',JSON.stringify(ads));
alert('✅ Ad Posted! Now playing on all users TV!');
document.getElementById('adTitle').value='';document.getElementById('adPreview').innerHTML='';loadList();
}
function loadList(){let ads=JSON.parse(localStorage.getItem('sokotop_ads')||'[]');document.getElementById('currentAdsList').innerHTML=ads.map((a,i)=>`${i+1}. ${a.title} - ${a.seconds}s`).join('<br>')||'No ads yet';}
function clearAllAds(){if(confirm('Clear all?')){localStorage.removeItem('sokotop_ads');loadList();}}