import React from "react";

const MealPlanner = ({variant, type}) => {

  return(
    <div class="meal-card">
      <div>
        <span>{variant.display_name}</span>
        <span><i class="fa-solid fa-location-check"></i></span>
      </div>
      {/* <span>7 Servings</span>
      <span>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 6V4H6v2h3.5c1.302 0 2.401.838 2.815 2H6v2h6.315A2.994 2.994 0 0 1 9.5 12H6v2.414L11.586 20h2.828l-6-6H9.5a5.007 5.007 0 0 0 4.898-4H17V8h-2.602a4.933 4.933 0 0 0-.924-2H17z"></path></svg>3285/-
      </span> */}
    </div>
  );
}

export default MealPlanner;