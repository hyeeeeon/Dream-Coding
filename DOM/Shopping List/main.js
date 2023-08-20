const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const button = document.querySelector('.all_delete');

function onAdd() {
    // 1.사용자가 입력한 택스트를 받아옴
const text = input.value;
if ( text === ''){
    input.focus();
    return;
}
    // 2. 새로운 아이템을 만듬 ( 텍스트 + 삭제 버튼 )
    const item = creatItem(text);
    // 3. items 컨테이너안에 새로 만든 아이템을 추가
    items.appendChild(item);
    // 4. 새로 추가된 아이템을 스크로링
    item.scrollIntoView({block: 'center'});
    // 5. 인풋을 초기화
    input.value = '';
    input.focus();
}

function creatItem(text){
    const itemRow = document.createElement('li');
    itemRow .setAttribute('class', 'item_row');

    const item = document.createElement('div');
    item.setAttribute('class','item');
    
    const name = document.createElement('span');
    name.setAttribute('class', 'item_name');
    name.innerText = text;
     
    
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item_delete');
    deleteBtn.innerHTML = '☑️';
    deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'divider');

    item.appendChild(name);
    item.appendChild(deleteBtn);
    
    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);
    return itemRow;
}
// 전체삭제
function removeALLItems(){
    while (items.firstChild){
        items.removeChild(items.firstChild);
    }
}
var all_delete = document.querySelector('.all_delete');
all_delete.onclick = () => {
    removeALLItems();

}

//Enter 눌렸을 떄 입력
input.addEventListener('keydown', event => {
     if (event.isComposing){
        return;
    }
    if (event.key === 'Enter') {
        onAdd();
    }
});
