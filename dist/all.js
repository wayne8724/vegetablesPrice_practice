const dataUrl = "https://hexschool.github.io/js-filter-data/data.json";

const showList = document.querySelector(".showList");
const filterDiv = document.querySelector(".main");
const searchBtn = document.querySelector(".search");
const searchInput = document.querySelector(".rounded-end");
const searchResult = document.querySelector(".show-result");
const sortSelect = document.querySelector(".sort-select");
const mobileSelect = document.querySelector(".mobile-select");
const fas = document.querySelectorAll(".fas");

// const element = document.querySelector(".search");
// if (element) {
// element.addEventListener('click', (() => {
//     console.log("hi");
// }));
// } else {
// console.error('Element not found');
// }
//DeBug用

let data = [];
let filterData = [];  //宣告一個存放篩選後的資料的變數，這樣原本的資料才不會在渲染的時候被篩選後的資料取代

// 取得資料
axios.get(dataUrl)
.then(function(response){
    data = response.data;
    // console.log(data);
    //renderdata();  //測試用
})
.catch(error => {
    console.log(error);
})

//篩選類別
filterDiv.addEventListener("click",filterBtn);
function filterBtn(e){
    switch(e.target.dataset.type){
        case "N04":
            filterData = data.filter((item) => {
            return item.種類代碼 == "N04";
        })
            renderdata();
            selectedIndexReset();
        break;
        case "N05":
            filterData = data.filter((item) => {
            return item.種類代碼 == "N05";
        })
            renderdata();
            selectedIndexReset();
        break;
        case "N06":
            filterData = data.filter((item) => {
                return item.種類代碼 == "N06";
            })
            renderdata();
            selectedIndexReset();
            break;    
    }
}

//點擊搜尋作物
searchBtn.addEventListener("click",clickSearch)
function clickSearch(e){
    if(e.target.classList.contains("search")){
        search();
    }
}
//按Enter搜尋作物
searchInput.addEventListener("keyup",function(e){
    if(e.key == "Enter"){
        search();
    }
})
//搜尋作物並顯示
function search(){
    if(searchInput.value == ""){
        alert("請輸入欲查詢之作物名稱");
        return;
    }else{
        filterData = data.filter((item) => {
            if(item.作物名稱 == null || item.作物名稱 == undefined){
                return false;
            }else{
                return item.作物名稱.match(searchInput.value);
            }
        })
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">資料載入中...</td></tr>`;
        renderdata();
    }
    if(filterData.length == 0){
        searchResult.textContent = "查無「"+searchInput.value+"」，請重新搜尋。";
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查無「${searchInput.value}」，請重新搜尋。Q_Q</td></tr>`;
    }else{
        searchResult.textContent = "「" + searchInput.value + "」的搜尋結果為:";
    }
    selectedIndexReset();
}

//點選排序選單排序
sortSelect.addEventListener("change",sort);
mobileSelect.addEventListener("change",sort);
function sort(e){
    if(!filterData.length){
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">請輸入並搜尋想比價的作物名稱^＿^</td></tr>`
    }else{
        filterData.sort((a,b) => b[e.target.value] - a[e.target.value]);
        renderdata();
    }
}

//點上下排序

fas.forEach((item) =>{
    item.addEventListener("click",function(e){
        if(!filterData.length){
            showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">請輸入並搜尋想比價的作物名稱^＿^</td></tr>`
        }else if(e.target.dataset.sort == "up"){
            filterData.sort((a,b) => b[e.target.dataset.price] - a[e.target.dataset.price]);
            renderdata();
        }else if(e.target.dataset.sort == "down"){
            filterData.sort((a,b) => a[e.target.dataset.price] - b[e.target.dataset.price]);
            renderdata();
        }
    })
})

// 渲染全部data到頁面上
function renderdata(){
    let str = "";
    filterData.forEach((item) => {
        str +=`
        <tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>
        ` 
    })
    showList.innerHTML = str ;
}

function selectedIndexReset(){
    sortSelect.selectedIndex = 0;
    searchInput.value = "";
}
