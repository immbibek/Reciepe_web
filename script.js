
const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipeCloseBtn=document.querySelector('.recipe-close-btn')

// function to get recipe through api
const fetchRecipes=async(searchInput)=>{
    recipeContainer.innerHTML="<h2>Fetching Recieps...</h2>";
    try{


    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const responce=await data.json();
   
    recipeContainer.innerHTML="";
    responce.meals.forEach(meal=>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');  // it giving class name to the div.

        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>


            
        `
        const button=document.createElement('button');    /// creating button
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        // Adding Eventlistner to reciepe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);

        });
        recipeContainer.appendChild(recipeDiv);


    })
} catch(error){
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>";
}
    

    // console.log(responce.meals[0]);
}

// Function to fetching ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList +=`<li>${measure}${ingredient}</li>`

        }
        else{
            break;
        }

    }
    return ingredientList;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3>Ingredients:</h3>
     <ul class="ingredientList">${fetchIngredients(meal)}</ul>

     <div class="recipeInstructions">
          <h3>Instruction:</h3>
          <p>${meal.strInstructions}</p>
     </div>
     

    `
   
    recipeDetailsContent.parentElement.style.display="block";
}




// close button
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";

});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});