import fetchDataAdApi from "../Services/fetchDataAd";

const annonceDataReadyTest = {
    "type": {
        "Echange": {
            "Categories": {
                "Animaux":[],
                "Bricolage": [],
                "Habits":[],
                "Maison":[],
                "Multimédia": [],
                "Loisir":[],
            }
        },
        "Don": {
            "Categories": {
                "Animaux":[],
                "Bricolage": [],
                "Habits":[],
                "Maison":[],
                "Multimédia": [],
                "Loisir":[],
            }
        },
        "Demande": {
            "Categories": {
                "Animaux":[],
                "Bricolage": [],
                "Habits":[],
                "Maison":[],
                "Multimédia": [],
                "Loisir":[],

            }
        }
    }
};
export async function generateData(){
    let annonceDataReady = annonceDataReadyTest;

    var donationData = await fetchDataAdApi.getDonationAds();
    var exchangeReqData = await fetchDataAdApi.getExchageAds();
    var donationReqData = await fetchDataAdApi.getDonationRequestAds();

    if(donationData && exchangeReqData && donationReqData) {
        console.log("geting data for first time");

        donationData.content.forEach((item, key) => {
            let currentcategory = item.category.title;
            annonceDataReady.type.Don.Categories[currentcategory].push(item);

        });

        exchangeReqData.content.forEach((item, key) => {
            let currentcategory = item.category.title;
            annonceDataReady.type.Echange.Categories[currentcategory].push(item);

        });
        donationReqData.content.forEach((item, key) => {
            let currentcategory = item.category.title;
            annonceDataReady.type.Demande.Categories[currentcategory].push(item);

        });

        return annonceDataReady;

    }
    else
        alert('We have no Ad for now :D ');

}