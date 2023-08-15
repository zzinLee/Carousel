const imgs = Array.from(document.querySelectorAll('img'));
const n = imgs.length-1;//last image index

const leftarrow = document.querySelector('.left');
const rightarrow = document.querySelector('.right');
const dotlist = document.querySelector('.dot-list');

leftarrow.addEventListener('click', goLeft);
rightarrow.addEventListener('click', goRight);
dotlist.addEventListener('click', clickDot);

//current position
let cur = 0;

/*
📌 우측 화살표 클릭했을 때에는 다음 이미지를 보여주세요.
📌 마지막 이미지에서 우측 화살표를 누를 경우, 첫번째 이미지를 보여주세요.
*/
function goRight(){

  //current position
  for(const img of imgs){
    if(!img.hidden){
    //숫자만 추출해오기
      cur = Number(img.id.replace(/[^0-9]/g,''));
      
    //마지막 이미지이면 다시 첫번째로 위치 옮기고 종료
      if(cur === n){
      //상태 초기화
        imgs.forEach((img)=>{
          img.hidden = false;
        })
        cur = 0;
        return;//함수종료
      }

    //마지막 이미지가 아니라면
    //현위치 이미지 숨기고 위치 다음으로 옮기기
      img.hidden = true;
      cur += 1;
      
      //반복문 종료
      break;
    }
  }//순회종료
}//함수종료



/*
📌 좌측 화살표 클릭했을 때 이전 이미지를 보여주세요.
📌 첫번째 이미지에서 좌측 화살표를 누를 경우, 마지막 이미지를 보여주세요.
*/

function goLeft(){
  //첫번째 이미지라면 맨 마지막으로 위치
  if(cur === 0){
    //imgs array
    imgs.forEach((img,idx)=>{
      //마지막 아니면 다 숨기고
      if(idx !== n){ img.hidden = true; }
      //마지막 이미지만 보여줌 
      else{ img.hidden = false; }
    })
    //마지막 이미지로 위치 이동
    cur = n;
    return;
  }

//나머지 경우,
//왼쪽 이미지 보여주고 현 위치 이동
  cur -= 1;
  imgs[cur].hidden = false;
}

function clickDot(event){
  let elem = event.target;
  if(elem.tagName !== 'LI') return;

  //현재 클릭한 dot 위치 파악
  cur = Number(elem.id.replace(/[^0-9]/g,''));

  //cur보다 이전은 true(보여주지 않기)
  //cur보다 이후는 false(보여주기)
  for(let i=0; i<cur; i++){
    imgs[i].hidden = true;
  }

  for(let i=cur; i<=n ; i++){
    imgs[i].hidden = false;
  }
}