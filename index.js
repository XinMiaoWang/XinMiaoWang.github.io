const form = document.querySelector('form'); // 選取<form>元素
const displayArea = document.querySelector('ul'); // 選取<ul>元素

// 每次讀取頁面時，會使用getItem()方法從localStorage取出資料
// 透過JSON.parse()方法將資料轉換成原本格式
// 第一次提取資料會取不到資料，因此需要建立一個新的空陣列
var wishList = JSON.parse(localStorage.getItem('wishList')) || [];


window.onload = function(){
    displayWishList();
}

// 在網頁中顯示所有的Wish
function displayWishList(){
    wishList.forEach( wish => displayWish(wish) );
}

// 在網頁中顯示使用者輸入的Wish
function displayWish(input){
    displayArea.innerHTML += `<li>${input}<span>x</span></li>`;
}

// 更新localStorage
function updateLocalStorage(){
    // 將資料轉換成 JOSN 格式的字串再儲存到 localStorage
    localStorage.setItem('wishList', JSON.stringify(wishList));
}


form.addEventListener('submit', event => {
    event.preventDefault(); // 停止執行submit按鈕的事件的默認動作
    const input = document.querySelector('input[type="text"]');

    // 顯示輸入的Wish
    displayWish(input.value);
    // 更新wishList
    wishList.push(input.value);

    // 更新localStorage
    updateLocalStorage();
    input.value = '';
});

// 刪除指定項目
displayArea.addEventListener('click', event => {
    if (event.target.tagName !== 'SPAN') { return };    // 檢查觸發事件元素的名稱是否為<span>
    const li = event.target.parentElement;  // 取得觸發事件<span>的父元素<li>
    li.remove();    // 刪除網頁中指定<li>元素

    // textContent可以取得標籤中的文字內容，如果標籤中有HTML標籤，這些標籤會被過濾掉，只留下文字的部分
    // 只使用li.textContent會連<span>裡的'x'都取得，為了避免這樣的情況，所以使用了slice()

    // slice()可以取出任意範圍的array，語法: slice(begin, end)
    // begin: 開始的index位置(預設是0)
    // end: 結束的index位置(不包含end index)，如果end是負數，表示陣列最後一個元素的位置
    // console.log(li.textContent.slice(0,-1));

    // indexOf()返回「指定字串」在字串中首次出現的位置，若沒找到則返回-1

    // splice()可用來修改array的內容，語法: ( Index , 數量 , 插入的新元素一 , 插入的新元素二 ... )
    // Index: 開始修改的陣列起始位置
    // 數量: 代表要刪除或插入新元素的數量(必填)，可以為0，代表不刪除任何元素
    wishList.splice(wishList.indexOf(li.textContent.slice(0,-1)), 1)    // 刪除wishList裡的資料

    // 更新localStorage
    updateLocalStorage();
});



