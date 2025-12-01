document.addEventListener("DOMContentLoaded", () => {
    // Select all element

    const btn = document.querySelector(".btn");

    async function searchCountry() {
        const searchInput = document.querySelector("input").value;
        const resultDiv = document.querySelector(".result");
        if (!searchInput) {
            alert("Please enter a country name");
            return
        }
        try {
            // using API of https://restcountries.com/
            let response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
            let data = await response.json();
            if (data.status === 404) {
                // throw new Error("Country not found");
                resultDiv.innerHTML = '<p style="color:red; font-weight:bold;">Country Not Found</p>';
                 resultDiv.classList.remove("hidden");
            }
            const country = data[0];
            console.log(country);

            let currencies = Object.values(country.currencies || {}).map((currency) => {
                return `${currency.name} ${currency.symbol}`;
            }).join(",");

            let languages = Object.values(country.languages || {}).join(",");

            resultDiv.innerHTML = `<img src="${country.flags.png}">
         <div class="country-info">
             <div class="info">
             <h3>Country Name<h3>
             <p>${country.name.common}</p>
             </div>

             <div class="info">
             <h3>Country Capital<h3>
             <p>${country.capital}</p>
             </div>

             <div class="info">
             <h3>Population<h3>
             <p>${country.population}</p>
             </div>

             <div class="info">
             <h3>Region<h3>
             <p>${country.region}</p>
             </div>

             <div class="info">
             <h3>Currencies<h3>
             <p>${currencies}</p>
             </div>
              
             <div class="info">
             <h3>Languages<h3>
             <p>${languages}</p>
             </div>

         </div>`
         resultDiv.classList.remove("hidden");
        }
        catch (error) {
                console.log(error);
                
        }

    }
    btn.addEventListener("click", searchCountry);
})
