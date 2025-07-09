window.onload = function () {
    const nameInput = document.getElementById("recipeName");
    const typeRadios = document.getElementsByName("type");
    const ingredientCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const submitBtn = document.getElementById("submitBtn");
    const output = document.getElementById("output");
    const radioImages = document.querySelectorAll(".radio-img");
    const checkboxImages = document.querySelectorAll(".checkbox-img");
    const fullRecipe = document.getElementById("fullRecipe");


    // אתחול כפתור שליחה ותמונות
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    radioImages.forEach(img => img.style.display = "none");
    checkboxImages.forEach(img => img.style.opacity = "0.5");

    // פונקציית בדיקה כללית
    function validateForm() {
        const nameFilled = nameInput.value.trim() !== "";
        const typeSelected = Array.from(typeRadios).some(r => r.checked);
        const featuresSelected = Array.from(ingredientCheckboxes).some(cb => cb.checked);
        const recipeTextFilled = fullRecipe.value.trim() !== "";

        if (nameFilled && typeSelected && featuresSelected && recipeTextFilled) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
        }
    }


    // מאזינים לכל שינוי רלוונטי
    nameInput.addEventListener("input", validateForm);

    typeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            radioImages.forEach(img => img.style.display = "none");
            const selected = document.querySelector(`.radio-img[data-type="${radio.value}"]`);
            if (selected) {
                selected.style.display = "block";
            }
            validateForm();
        });
    });

    ingredientCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const img = document.querySelector(`.checkbox-img[data-ingredient="${checkbox.value}"]`);
            if (img) {
                img.style.opacity = checkbox.checked ? "1" : "0.5";
            }
        });
    });

    // שליחת הטופס
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault(); // לא שולח באמת טופס
        const name = nameInput.value.trim();
        const type = Array.from(typeRadios).find(r => r.checked).value;
        const ingredients = Array.from(ingredientCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const fullRecipe = document.getElementById("fullRecipe").value.trim();

        output.innerHTML = `
            <p><strong>תודה על ההמלצה!</strong></p>
              <p>שם המתכון: ${name}</p>
            <p>סוג מתכון: ${type}</p>
            <p>מאפיינים: ${ingredients.length > 0 ? ingredients.join(", ") : "ללא מאפיינים מיוחדים"}</p>
            <p><strong>המתכון:</strong><br>${fullRecipe}</p>
        `;
        output.classList.remove("hidden");
    });

    // נוודא שהכפתור מתעדכן גם אם המשתמש מילא שם קודם
    validateForm();
};
