const products = [
    { id: 1, name: "Gruzanska Nit Dunja", price: 1200, img: "images/dunja.jpg", description: "Proizvedena strogim odabirom plodova dunja sa sopstvenih zasada, odležava u tankovima od inoksa najmanje 6 meseci cime se dobija pitka rakija specifične i dugotrajne punoće ukusa.Puni se u ekskluzivne boce od 0.75l, i pakuje u kutiju sa zlatotiskom." },
    { id: 2, name: "Gruzanska Nit Šljiva", price: 1000, img: "images/sljiva.jpg", description: "Voćna rakija od šljiva ( prepečenica), izuzetno dopadljivog ukusa koja stari u hrastovim buradima i u toku starenja primarni miris prepečenice se transformise u prefinjeni buke, što je čini izuzetno dopadljivom." },
    { id: 3, name: "Gruzanska Nit Kruška", price: 1400, img: "images/kruska.jpg", description: "Proizvedena brižljivom selekcijom plodova kruške vilijamovke sa sopstvenih zasada, plemenite arome, ukusa i pitkosti, koji su rezultat pažljivo vođenog proizvodnog procesa. Puni se u ekskluzivne boce od 0.75l, i pakuje u kutiju sa zlatotiskom." },
    { id: 4, name: "Gruzanska Nit Medovina", price: 2000, img: "images/medovina.jpg", description: "Proizvedena brižljivom selekcijom plodova kruške Viljamovke redestilacijom i naknadnim dodavanjem livadskog meda.Preporučujemo da se služi rashlađena, kao aperitiv.Puni se u ekskluzivne boce od 0.75l, i pakuje u kutiju sa zlatotiskom." },
    { id: 5, name: "Dostojna Dunja ", price: 1500, img: "images/dunja1.jpg", description: "Dunjevača je voćna rakija dobijena destilacijom prevrelih plodova dunje, stare autohtone sorte leskovačka. Kombinacijom tradicionalne srpske tehnologije i primenom savremenih tehnoloških postupaka u flašu je pretočena aroma DOSTOJNA sećanja na mirise detinjstva, iz soba naših baka, gde je „dunja na ormaru“ oduvek imala svoje mesto. Dunjevača je bezbojna i bistra, intenzivnog prefinjenog mirisa, punog i zaokruženog ukusa. Konzumira se rashlađena na temperaturu od 15⁰C." },
    { id: 6, name: "Dostojna Sljiva", price: 2000, img: "images/sljiva1.jpg", description: "Šljivovica je rakija dobijena destilacijom fermentisanih plodova šljive. U proizvodnji se koriste odabrani i ručno brani plodovi starih rakijskih sorti: požegača, crvena ranka, trnovača, kao i novih sorti Instituta za voćarstvo u Čačku, čačanska lepotica i čačanska rodna. Kupažom destilata starih autohtonih, i novih sorti šljive, kroz spoj vekovne tradicije porodice Čolić i moderne tehnologije dobijamo rakiju DOSTOJNU predaka, koja u sebi sadrži mirise padina Rudnika na kojima se šljiva oduvek gajila." },
    { id: 7, name: "Dostojna Medovina ", price: 2000, img: "images/medovina1.jpg", description: "Medovača je specijalna rakija dobijena odležavanjem najkvalitetnijeg destilata jabuke u hrastovim burićima, sa dodatkom tri vrste meda proizvedenog na padinama Rudnika. Odležavanje u periodu od tri godine dovelo je do harmonije mirisa bagrema, procvetalih rudničkih livada i šuma. Voćna svežina jabuke skladno je ukomponovana sa ovim aromama i slašću meda. U kombinaciji sa prefinjenim notama hrastovine ova rakija ima ukus DOSTOJAN da zadovolji sve one koji od uživanja uz čašicu traže više." },
    { id: 8, name: "Dostojna Jabuka ", price: 2000, img: "images/jabuka.jpg", description: "Jabukovača je voćna rakija dobijena destilacijom prevrelih plodova jabuke. Odabirom najkvalitetnijih plodova i njihovom pažljivom preradom tokom procesa fermentacije i destilacije dobijen je destilat koji je u sebi sačuvao sve najbolje iz ovog voća. Odležavanjem destilata u hrastovim burićima u periodu od tri godine dobijena je rakija oplemenjena bojom i aromom nagorelog hrasta, u kojoj je pored voćne svežine zastupljena i nota tanina koja joj daje zavodljivu eleganciju i zaokružen ukus."},
    { id: 9, name: "Dostojna Kruska ", price: 2000, img: "images/kruska1.jpg", description: "Viljamovka je voćna rakija dobijena destilacijom prevrelih plodova stare engleske sorte kruške koja je još davne 1796 godine pronadjena u prirodi kao spontani sejanac. Ni preko dva veka kasnije radom selekcionara iz celog sveta nije dobijena ni jedna sorta koja bi po kvalitetu i aromi ploda mogla da joj konkuriše. Sve ono što joj je priroda podarila sačuvano je u našoj rakiji."}
];

let cart = [];

function showProducts() {
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <div class="product-img-container">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-description">${product.description}</div>
            </div>
            <h3>${product.name}</h3>
            <p>Cena: ${product.price} RSD</p>
            <label for="quantity-${product.id}">Količina:</label>
            <input type="number" id="quantity-${product.id}" min="1" value="1" style="width: 60px;">
            <button onclick="addToCart(${product.id})">Dodaj u korpu</button>
        `;
        main.appendChild(div);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity < 1 || isNaN(quantity)) {
        alert("Unesite validnu količinu (najmanje 1).");
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const cartItem = { ...product, quantity };
        cart.push(cartItem);
    }

    alert(`${quantity} x ${product.name} je dodato u korpu!`);
}

function showCart() {
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    if (cart.length === 0) {
        main.innerHTML = "<h2>Vaša korpa je prazna!</h2>";
        return;
    }

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Proizvod</th>
                <th>Slika</th>
                <th>Količina</th>
                <th>Cena (RSD)</th>
                <th>Ukupno (RSD)</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement("tbody");
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td><img src="${item.img}" class="cart-item-img" alt="${item.name}"></td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${itemTotal}</td>
            </tr>
        `;
    });
    table.appendChild(tbody);

    const totalRow = document.createElement("tfoot");
    totalRow.innerHTML = `
        <tr>
            <td colspan="4">Ukupno:</td>
            <td>${total} RSD</td>
        </tr>
    `;
    table.appendChild(totalRow);

    const paymentButton = document.createElement("button");
    paymentButton.textContent = "Plati";
    paymentButton.className = "payment-button";

    main.appendChild(table);
    main.appendChild(paymentButton);
}

document.getElementById("productsBtn").addEventListener("click", showProducts);
document.getElementById("cartBtn").addEventListener("click", showCart);

function showAgeModal() {
    const modal = document.getElementById("ageModal");
    modal.style.display = "flex";

    document.getElementById("yesBtn").addEventListener("click", () => {
        modal.style.display = "none";
        showProducts();
    });

    document.getElementById("noBtn").addEventListener("click", () => {
        alert("Nažalost, morate biti stariji od 18 godina da biste koristili ovaj sajt.");
        window.location.href = "https://www.google.com";
    });
}

// Prikazuje modal pri učitavanju stranice
window.onload = showAgeModal;
