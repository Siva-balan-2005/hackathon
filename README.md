# RecipeHub – Online Recipe Management Website

## 1. Project Description

RecipeHub is an online recipe management and food discovery website. It helps users explore different food recipes, search for dishes, view ingredients and cooking procedures, save their favourite recipes, and share their own recipes.

The website is developed using **HTML, CSS, and JavaScript**. It uses browser LocalStorage to save user information, favourite recipes, and newly added recipes.

## 2. Main Features

- **User Login and Signup:** Users can create an account and log in.
- **Recipe Categories:** Explore 50 recipes in four categories:
  - 15 Vegan recipes
  - 15 Non-veg recipes
  - 10 Dessert recipes
  - 10 Snack recipes
- **Search Recipes:** Search recipes by name, category, cuisine, or ingredients.
- **Filter Recipes:** Filter recipes by dietary preference and cooking time.
- **Recipe Details:** View ingredients and step-by-step cooking procedures.
- **Save Favourite Recipes:** Save recipes and view them later.
- **Add New Recipes:** Users can add their own recipes with ingredients and cooking steps.
- **Profile Page:** View saved recipes and personal recipe information.
- **Responsive Design:** Supports mobile screens and desktop screens.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Creates the website structure |
| CSS3 | Designs the website layout and appearance |
| JavaScript | Handles website functionality |
| LocalStorage | Stores data in the browser |
| Unsplash | Provides food images |
| Google Fonts | Provides the DM Sans font |

## 4. Project Folder Structure

```text
RecipeHub/
│
├── app.html
├── style.css
├── script.js
└── README.md
```

**Note:** The HTML file refers to `style.css`. If your CSS file is currently named `style(1).css`, rename it to `style.css` or change the stylesheet link inside `app.html`.

## 5. How to Run the Project

1. Download or copy all project files into one folder.
2. Make sure the HTML file, CSS file, and JavaScript file are in the same folder.
3. Check that the CSS filename matches the link in `app.html`.
4. Open `app.html` in a web browser.
5. Create an account using the signup option.
6. Log in and start exploring recipes.

You can also open the project using the **Live Server** extension in Visual Studio Code.

## 6. How the Project Works

1. The user opens the RecipeHub website.
2. The user creates an account or logs in.
3. JavaScript displays the available recipes.
4. The user searches for recipes or selects a food category.
5. The user opens a recipe to view its ingredients and cooking steps.
6. The user can save favourite recipes.
7. The user can add new recipes using the Share a Recipe option.
8. LocalStorage saves supported information in the browser.

## 7. Data Storage

This project uses browser LocalStorage instead of a separate database.

The following LocalStorage keys are used:

| LocalStorage Key | Purpose |
|---|---|
| `recipehub-accounts` | Stores registered account details |
| `recipehub-user` | Stores the current user information |
| `recipehub-saved` | Stores saved recipe IDs |
| `recipehub-custom` | Stores recipes added by users |

**Important:** LocalStorage is browser storage, not a backend database. The login system is only for demonstration. It stores passwords in browser storage, so it should not be used for real user accounts.

## 8. Advantages

- Easy to use and understand.
- Provides different food categories.
- Helps users find recipes quickly.
- Shows ingredients and cooking instructions step by step.
- Allows users to save their favourite recipes.
- Allows users to add their own recipes.
- Works on mobile and desktop screens.

## 9. Limitations

- No separate backend server is connected.
- No external recipe API is used.
- Data is stored only in the browser.
- User accounts are not securely authenticated.
- Recipe guides are shared by food category rather than being unique to every recipe.
- Some website features, such as notifications, are currently static.

## 10. Future Enhancements

- Connect a backend using Node.js or another server technology.
- Use MySQL or MongoDB as a database.
- Add secure user authentication.
- Connect a real recipe API.
- Provide unique ingredients and procedures for every recipe.
- Add user ratings and reviews.
- Implement real-time notifications.
- Allow users to upload food images.

## 11. Conclusion

RecipeHub is a simple and user-friendly recipe management website. It demonstrates how HTML, CSS, and JavaScript can be used to build an interactive website. Users can explore recipes, search for food, view cooking instructions, save favourites, and add new recipes. In the future, the project can be improved by connecting a backend server and database.

---

**Project Name:** RecipeHub – Online Recipe Management Website  
**Frontend Technologies:** HTML, CSS, JavaScript  
**Storage:** Browser LocalStorage  
**Project Type:** Frontend Web Development Project
