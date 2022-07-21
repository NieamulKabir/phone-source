const searchPhone = () => {
    const searchField = document.getElementById('input_search');
    const searchText = searchField.value;

    //reset search value
    searchField.value = ''
    if (searchText === '') {
        document.getElementById('error_messsage').innerText = 'Please Enter Valid phone name';
        document.getElementById('phone-searching-results').textContent = '';
        document.getElementById('show-details').innerText = '';
        return;
    }
    document.getElementById('error_messsage').innerText = '';
    document.getElementById('phone-searching-results').textContent = '';
    document.getElementById('show-details').innerText = '';
    toggleSpinner('block');
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
//spinner
const toggleSpinner = displayStyle => {
    document.getElementById('toggle_spinner').style.display = displayStyle;
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('phone-searching-results');

    //error handle
    if (phones.length === 0) {
        document.getElementById('error_messsage').innerText = 'Not Found';
        toggleSpinner('none');
    }
    searchResult.textContent = '';

    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = ` 
            <div class="bg-red-100 border-double shadow-2xl shadow-transparent border-4  pt-5 rounded" style="height:450px">
                <img class="mx-auto mb-5" src="${phone.image}" >
                <h2>Brand Name: <span class="font-bold">${phone.brand}</span></h2>
                <h3>Phone Name: <span class="font-bold">${phone.phone_name}</span></h3>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="px-5 mt-5 py-3 bg-red-600 rounded text-white">Details</button>      
            </div>
        `
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
}

const loadPhoneDetails = id => {

    //load data
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.data))
}
const setDetails = phoneInfo => {
    const pheDetails = document.getElementById('show-details');
    pheDetails.textContent = ''
    const div = document.createElement('div');
    div.innerHTML = `
        <div class=" mx-auto flex text-center items-center pt-5 border-red-800 border-4 m-7 rounded"  style="height: 450px">
            <div>
                <img class="mx-auto px-5 w-full mb-5"style="height: 400px" src="${phoneInfo.image}">
             </div>
            <div class="text-left">
                <h2 class="text-lg"><span class="text-red-600">Brand Name: </span> <span class="font-bold">${phoneInfo.brand}</span></h2>
                <h3 class="text-lg">Phone Name: <span class="font-bold">${phoneInfo.name}</span></h3>
                <h3 class="text-lg">Phone Name: <span class="font-bold">${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'ReleaseDate Not Found'}</span></h3>
                <h3 class="text-lg">Main Features:
                <ul class="ml-10">
                    <li class="list-disc">Disply:
                        <span class="font-bold">
                            ${phoneInfo.mainFeatures.storage ? phoneInfo.mainFeatures.storage : 'Not Found'}
                        </span>
                    </li>
                    <li class="list-disc">DisplaySize:
                        <span class="font-bold">
                            ${phoneInfo.mainFeatures.displaySize ? phoneInfo.mainFeatures.displaySize : 'Not Found'}
                        </span>
                    </li>
                    <li class="list-disc">Chipset:
                        <span class="font-bold">
                            ${phoneInfo.mainFeatures.chipSet ? phoneInfo.mainFeatures.chipSet : 'Not Found'}
                        </span>
                    </li>
                    <li class="list-disc">Sensor:
                        <span class="font-bold">
                            ${phoneInfo.mainFeatures.sensors ? phoneInfo.mainFeatures.sensors : 'Not Found'}
                        </span>
                    </li>
                </ul>
            </h3>
            </div>
        </div>
    `
    pheDetails.appendChild(div);
}