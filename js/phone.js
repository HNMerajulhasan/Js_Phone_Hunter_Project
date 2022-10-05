const loadPhones=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch(url);//Fetch usually Asynchronus vabe kaj kre
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones=(phones,dataLimit)=>{
    const phonesContainer=document.getElementById('phone-container');//parent Div
    phonesContainer.textContent='';
    //if number of phones is greater than 10 then display show all button..
    const showAll=document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones=phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    //Input field a search value er sathe API er data te thaka jodi kono phone er name er sathe matching na kre thle warning ba No phone found message show krbe.
    const noPhone=document.getElementById('no-found-message');
    if(phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    //Input field er search vlaue er sathe API er data te thaka phone gulo matching krle ta ekhane display krbe.
    phones.forEach(phone => {
        const phoneDiv=document.createElement('div');//child Div
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" >Show Details</button>
     
    </div>
    </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //stop spinner or loader
    toggleSpinner(false);
}

const processSearch=(dataLimit)=>{
    toggleSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText= searchField.value;
    loadPhones(searchText,dataLimit);
}

//Adding event handler in button for searching phone.For Khata note commented.
// document.getElementById('btn-search').addEventListener('click',function(){
//     const searchField=document.getElementById('search-field');
//     const searchText= searchField.value;
//     loadPhones(searchText);
// })

//Adding event handler in button for searching phone
//Also handle search button click.
document.getElementById('btn-search').addEventListener('click',function(){
    //start loader
    processSearch(10);
})

//seaech input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        processSearch(10); 
    }
});

const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');//mane spinner hide ace setake reomove kre show krbe..
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

//Below one is not the best way to show all remaining product..But under the current circumstance we are bound to do this
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails=phone=>{
    console.log(phone);
    const modalTitle=document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Dy Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Butooth Information'}
    <p>Sensor: ${phone.mainFeatures.sensors[0]}</p>
    `;
    const phoneImage=document.getElementById('show-phn-img');
    phoneImage.innerHTML=`
     <img src="${phone.image ? phone.image :'No Phone Image Found'}">;
    `;
}
// loadPhones();

//Ternary operator:-(?,:)
//1. ? er mane holo jodi existing thake mane eita kichuta if er moto
//2. : er mane holo jodi existing na thake..kicu ta else er moto.