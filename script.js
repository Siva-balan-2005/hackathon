
// RecipeHub - simple frontend JavaScript
const $ = id => document.getElementById(id);
const imageList = [
 "photo-1540189549336-e6e99c3679fe","photo-1512621776951-a57141f2eefd",
 "photo-1512621776951-a57141f2eefd","photo-1473093295043-cdd812d0e601",
 "photo-1568901346375-23c9450c58cd","photo-1544025162-d76694265947",
 "photo-1490645935967-10de6ba17061","photo-1547592180-85f173990554",
 "photo-1603133872878-684f208fb84b","photo-1565299624946-b28f40a0ae38"
];
const makeItems = (names, category, cuisine, author, timeStart) => names.map((name,i)=>({
 id: category+"-"+i, name, category, diet: category, cuisine: cuisine[i%cuisine.length],
 time: timeStart+(i%4)*5, rating: 4+(i%10)/10, author: author[i%author.length],
 image:`https://images.unsplash.com/${imageList[(i+(category==="Vegan"?0:category==="Non-veg"?2:category==="Dessert"?5:7))%imageList.length]}?auto=format&fit=crop&w=900&q=85`,
 ingredients:[["🥗","Main ingredients","As needed"],["🧂","Salt and seasoning","To taste"],["🌿","Fresh herbs","A little"],["🫒","Oil or butter","1 tbsp"]],
 steps:["Prepare and wash all the ingredients.","Heat a pan or preheat the oven as needed.","Add the ingredients and cook, stirring gently until ready.","Season to taste, plate the dish and serve fresh."]
}));
const recipes = [
 ...makeItems(["Classic Greek Salad","Chickpea Avocado Bowl","Vegan Buddha Bowl","Lentil Vegetable Curry","Tofu Stir-Fry","Vegan Mushroom Pasta","Roasted Vegetable Wrap","Spinach Hummus Bowl","Coconut Chickpea Stew","Quinoa Power Salad","Vegan Paneer-Style Tofu","Sweet Potato Tacos","Peanut Noodle Bowl","Cauliflower Rice Bowl","Green Pea Pulao"],"Vegan",["Healthy","Indian","Asian"],["Mia Chen","Ava Green","James Lee"],10),
 ...makeItems(["Spicy Chicken Burger","Traditional Baked Spare Ribs","Grilled Chicken with Rice","Lamb Chops with Couscous","Chicken Biryani","Fish Tikka","Beef Stir-Fry","Chicken Alfredo Pasta","Grilled Salmon Bowl","Turkey Sandwich","Prawn Fried Rice","Mutton Curry","Chicken Shawarma","Egg Fried Rice","Pepperoni Pizza"],"Non-veg",["Indian","Asian","American","Italian"],["Chef John","Laura Wilson","Mark Kelvin"],15),
 ...makeItems(["Chocolate Lava Cake","Strawberry Cheesecake","Mango Mousse","Classic Tiramisu","Vanilla Cupcakes","Apple Crumble","Chocolate Brownies","Pistachio Kulfi","Lemon Tart","Caramel Pudding"],"Dessert",["Dessert","Italian"],["Sofia Baker","Mia Chen"],25),
 ...makeItems(["Crispy Potato Wedges","Vegetable Spring Rolls","Masala Corn Cups","Cheese Garlic Bread","Hummus with Pita","Paneer Tikka Bites","Sweet Potato Fries","Mini Samosas","Cucumber Sandwich Bites","Nachos with Salsa"],"Snack",["Indian","Asian","American"],["Ava Green","Chef John"],10)
];
let saved = JSON.parse(localStorage.getItem("recipehub-saved") || "[]");
let customRecipes = JSON.parse(localStorage.getItem("recipehub-custom") || "[]");
let currentUser = JSON.parse(localStorage.getItem("recipehub-user") || "null");
let selectedCategory = "All", selectedDiet = "All", maxTime = 999, currentRecipe = null;
const allRecipes = () => [...customRecipes, ...recipes];
const fallback = imageList[0];
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function saveData(){localStorage.setItem("recipehub-saved",JSON.stringify(saved));localStorage.setItem("recipehub-custom",JSON.stringify(customRecipes))}
function isSaved(id){return saved.includes(id)}
function img(url,name){return `<img src="${url}" alt="${name}" onerror="this.src='https://images.unsplash.com/${fallback}?auto=format&fit=crop&w=900&q=85'">`}
function filtered(query=""){
 const q=query.toLowerCase().trim();
 return allRecipes().filter(r=>(selectedCategory==="All"||r.category===selectedCategory)&&
 (selectedDiet==="All"||r.diet===selectedDiet)&&r.time<=maxTime&&
 (!q||(r.name+" "+r.cuisine+" "+r.category+" "+r.ingredients.map(x=>x[1]).join(" ")).toLowerCase().includes(q)));
}
function card(r){return `<article class="photo-card" data-open="${r.id}">${img(r.image,r.name)}<span class="rating">★ ${r.rating.toFixed(1)}</span><div class="photo-copy"><h3>${r.name}</h3><p>${r.category} · ${r.time} min · ${r.author}</p></div></article>`}
function popular(r){return `<article class="popular-card" data-open="${r.id}">${img(r.image,r.name)}<span class="rating">★ ${r.rating.toFixed(1)}</span><h3>${r.name}</h3><div class="card-bottom"><span>Time<br><b>${r.time} mins</b></span><button class="save-mini" data-save="${r.id}">${isSaved(r.id)?"♥":"♧"}</button></div></article>`}
function newCard(r){return `<article class="new-card" data-open="${r.id}">${img(r.image,r.name)}<div class="new-info"><h3>${r.name}</h3><div class="stars">★★★★★</div><p class="byline">${r.category} · By ${r.author}</p></div><span class="new-time">${r.time} min</span></article>`}
function renderHome(){
 const list=filtered();
 $("popularTitle").textContent=selectedCategory==="All"?"All recipes":selectedCategory+" recipes";
 $("popularRecipes").innerHTML=list.map(popular).join("")||"<p class='muted'>No recipes match these filters.</p>";
 $("newRecipes").innerHTML=list.slice().reverse().slice(0,9).map(newCard).join("");
}
function renderSearch(q=""){
 const list=filtered(q);
 $("searchResults").innerHTML=list.map(card).join("")||"<p class='muted'>No recipes found. Try another search.</p>";
 $("resultCount").textContent=`${list.length} recipes`;
}
function renderSaved(){
 const list=allRecipes().filter(r=>isSaved(r.id));
 $("savedRecipes").innerHTML=list.length?list.map(r=>`<article class="wide-photo" data-open="${r.id}">${img(r.image,r.name)}<span class="rating">★ ${r.rating.toFixed(1)}</span><div class="photo-copy"><h3>${r.name}</h3><p>${r.category} · ${r.time} min</p></div></article>`).join(""):`<div class="empty-state"><div class="empty-icon">♡</div><h2>Your cookbook is waiting</h2><p>Tap the bookmark on a recipe to save it here.</p></div>`;
 $("savedCount").textContent=saved.length;$("recipeCount").textContent=customRecipes.length;
}
function showPage(page){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 const target=$(page+"Screen");if(target)target.classList.add("active");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 if(page==="saved"||page==="profile")renderSaved();
 if(page==="search")renderSearch($("searchInput").value);
 window.scrollTo(0,0);
}
function detail(id){
 const r=allRecipes().find(x=>String(x.id)===String(id));if(!r)return;
 currentRecipe=r;
 $("detailContent").innerHTML=`<div class="detail-hero">${img(r.image,r.name)}<span class="rating">★ ${r.rating.toFixed(1)}</span><span class="detail-meta">◷ ${r.time} min　<button class="save-mini" data-save="${r.id}">${isSaved(r.id)?"♥":"♧"}</button></span></div>
 <div class="detail-title-row"><h2>${r.name}</h2><span class="reviews">${r.category}</span></div>
 <div class="chef-row"><div class="chef-avatar">👩🏻‍🍳</div><div class="chef-copy"><b>${r.author}</b><span>RecipeHub community</span></div></div>
 <div class="tabs"><button class="active" data-tab="ingredients">Ingredients</button><button data-tab="procedure">Procedure</button></div><div id="detailTab"></div>`;
 detailTab("ingredients");$("detailModal").classList.add("open");
}
function detailTab(tab){
 if(!currentRecipe)return;
 document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 if(tab==="ingredients")$("detailTab").innerHTML=`<div class="ingredient-list">${currentRecipe.ingredients.map(i=>`<div class="ingredient"><span class="ingredient-icon">${i[0]}</span><b>${i[1]}</b><span>${i[2]}</span></div>`).join("")}</div>`;
 else $("detailTab").innerHTML=`<div class="steps">${currentRecipe.steps.map((s,i)=>`<div class="step"><b>STEP ${i+1}</b>${s}</div>`).join("")}</div>`;
}
function setAuthTab(tab){document.querySelectorAll("[data-auth-tab]").forEach(b=>b.classList.toggle("active",b.dataset.authTab===tab));$("loginPanel").hidden=tab!=="login";$("signupPanel").hidden=tab!=="signup"}
function updateProfile(){
 if(!currentUser)return;
 document.querySelector(".greeting h1").innerHTML=`Hello, ${currentUser.name.split(" ")[0]} <span class="wave">✦</span>`;
 document.querySelector(".profile-card h2").textContent=currentUser.name+"'s Kitchen";
}
function enterApp(user){currentUser=user;localStorage.setItem("recipehub-user",JSON.stringify(user));$("authScreen").classList.remove("active");showPage("home");updateProfile();toast("Welcome to RecipeHub!")}
function logout(){currentUser=null;localStorage.removeItem("recipehub-user");document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$("authScreen").classList.add("active");setAuthTab("login")}
function openFilters(){$("filterModal").classList.add("open")}

document.addEventListener("click",e=>{
 const page=e.target.closest("[data-page]");if(page)showPage(page.dataset.page);
 const opened=e.target.closest("[data-open]");if(opened)detail(opened.dataset.open);
 const save=e.target.closest("[data-save]");
 if(save){e.stopPropagation();const id=save.dataset.save;saved=isSaved(id)?saved.filter(x=>String(x)!==String(id)):[...saved,id];saveData();save.textContent=isSaved(id)?"♥":"♧";renderSaved();toast(isSaved(id)?"Saved recipe":"Removed from saved")}
 const close=e.target.closest("[data-close]");if(close)$(close.dataset.close).classList.remove("open");
 const tab=e.target.closest("[data-tab]");if(tab)detailTab(tab.dataset.tab);
 const cat=e.target.closest("[data-category]");if(cat){selectedCategory=cat.dataset.category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("selected",b===cat));renderHome()}
 const diet=e.target.closest("[data-diet]");if(diet){selectedDiet=diet.dataset.diet;document.querySelectorAll("[data-diet]").forEach(b=>b.classList.toggle("selected",b===diet))}
});
$("homeSearch").addEventListener("focus",()=>showPage("search"));
$("homeSearch").addEventListener("input",e=>{showPage("search");$("searchInput").value=e.target.value;renderSearch(e.target.value)});
$("searchInput").addEventListener("input",e=>renderSearch(e.target.value));
$("openFilters").onclick=openFilters;$("openFilters2").onclick=openFilters;
$("clearCuisine").onclick=()=>{selectedCategory="All";document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("selected",b.dataset.category==="All"));renderHome()};
$("applyFilters").onclick=()=>{maxTime=Number($("timeFilter").value);$("filterModal").classList.remove("open");renderHome();renderSearch($("searchInput").value);toast("Filters applied")};
$("addRecipeBtn").onclick=()=>$("addModal").classList.add("open");$("profileAdd").onclick=()=>$("addModal").classList.add("open");
$("seeAllNew").onclick=()=>{showPage("search");$("searchInput").value="";renderSearch("")};
$("aboutBtn").onclick=()=>toast("RecipeHub — discover, cook and share.");
$("recipeForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.target);const category=f.get("category");
 const item={id:"custom-"+Date.now(),name:f.get("name").trim(),category,diet:category,cuisine:f.get("cuisine"),time:Number(f.get("time")),rating:5,author:currentUser?.name||"You",image:f.get("image")||`https://images.unsplash.com/${fallback}?auto=format&fit=crop&w=900&q=85`,
 ingredients:f.get("ingredients").split(",").map((x,i)=>[["🥗","🍅","🧄","🌿","🥣"][i%5],x.trim(),"to taste"]),
 steps:f.get("steps").split(/\n+/).filter(Boolean)};
 customRecipes.unshift(item);saveData();e.target.reset();$("addModal").classList.remove("open");renderHome();toast("Recipe published!");showPage("home");
});
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
document.querySelectorAll("[data-auth-tab]").forEach(b=>b.addEventListener("click",()=>setAuthTab(b.dataset.authTab)));
$("loginForm").addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target),email=d.get("email").trim();
 const accounts=JSON.parse(localStorage.getItem("recipehub-accounts")||"[]");
 const user=accounts.find(a=>a.email.toLowerCase()===email.toLowerCase()&&a.password===d.get("password"));
 if(!user){toast("Account not found. Please sign up first.");return}
 enterApp({name:user.name,email:user.email});
});
$("signupForm").addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target),accounts=JSON.parse(localStorage.getItem("recipehub-accounts")||"[]"),email=d.get("email").trim();
 if(accounts.some(a=>a.email.toLowerCase()===email.toLowerCase())){toast("Email already registered.");return}
 const user={name:d.get("name").trim(),email,password:d.get("password")};accounts.push(user);
 localStorage.setItem("recipehub-accounts",JSON.stringify(accounts));e.target.reset();enterApp({name:user.name,email:user.email});
});
$("logoutBtn").onclick=logout;
renderHome();renderSaved();
if(currentUser){$("authScreen").classList.remove("active");showPage("home");updateProfile()}else{$("authScreen").classList.add("active")}
