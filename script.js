// ---------- Constants ---------------------------------------------
const apiUrl = "https://tideapi.supersite.cloud/checkurl"; // Altere a URL da API para corresponder à sua implementação
const input_link = document.getElementById("ilink");
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].*$/;
const consult = document.getElementsByClassName("consult")[0]; //---> esse aqui era o response do outro codigo, tive que mudar pra nao ficar com o mesmo nome da parte nova
                                                                //por isso tive que renomear as partes onde ele aparecia
const response = document.getElementsByClassName("response")[0];
const secure =
    `                
    <div class="response column">
        <h2 class="secure">Este site é seguro!</h2>
        <img class="check" src="fig/check-ico.svg" alt="Icone de estado seguro.">
    </div>
`;

const loading =
    `
<div class="center">
    <div class="hourglass top">
        <div class="sand"></div>
    </div>
</div>
`;

const danger =
    `
<div class="response">
    <img class="danger2" src="fig/danger-ico.svg" alt="icone de perigo.">
    <h2 class="insecure">Phishing <br> avistado!</h2>
</div>
<div class="list-section">
    <ul class="list">
    </ul>
</div>
`;
// ------------------------------------------------------------------

// ---------- FUNCTIONS  ---------------------------------------------
function reset_css() {
    consult.classList.add("hidden");        // aqui era RESPONSE, tive que renomear tudo nas duas funcoes
    consult.classList.remove("notify");
    consult.classList.remove("danger");
    consult.classList.remove("warning");
}

function verificarLink() {
    const link = input_link.value;
    if (urlRegex.test(link)) {
        reset_css();
        verificarConfiabilidade(link);
    } else {
        console.log("URL inválida");
    }
}

function verificarConfiabilidade(link) {
    const requestData = {
        url: link,
        format: "json",
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
        .then((consult) => consult.json())
        .then((res) => {
            let icon = "";
            let info = "";
            if (res.results != undefined) {
                if (res.results.valid == true) {
                    icon = `<img class="material-symbols-outlined" src="fig/danger-ico.svg" alt="danger">`;
                    info = `${icon}<p>O link  não é seguro!</p>`;
                    consult.classList.add("danger");
                } else if (res.results.in_database == false) {
                    icon = `<img class="material-symbols-outlined" src="fig/report-ico.svg" alt="report">`;
                    info = `${icon}<p>O link não está na base de dados!</p>`;
                    consult.classList.add("warning");
                } else {
                    icon = `<img class="material-symbols-outlined" src="fig/check-ico.svg" alt="check">`;
                    info = `${icon}<p>O link  é seguro!</p>`;
                }
            } else {
                info = `Link Inválido ou não encontrado!`;
            }
            consult.innerHTML = info;
            consult.classList.add("notify");
            consult.classList.remove("hidden");
        })
        .catch((err) => {
            console.log("Erro na requisição:", err);
        });
}

//  ---------- EVENTS ---------------------------------------------

input_link.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        console.log("foiii");
        verificarLink();
    }
});

consult.addEventListener('click', function () {
    reset_css();
});
